import { toast } from 'sonner'

import Button from '../../../components/ui/components/buttons/Button'
import useAvatar from '../../../hooks/useAvatar'
import {
    cancelRequestToCoach,
    sendRequestToCoach,
} from '../libs/services/athlete.service'

const CardCoach = ({ coach, toogleData }) => {
    const { name, surname, username, role, hasRequest } = coach

    const { avatar, avatarAlt } = useAvatar(coach)

    const roles = role.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    const roleFormat = new Intl.ListFormat('es-ES').format(roles)

    const onHandleSendRequest = async () =>
        handleSendRequest(coach.id, toogleData)
    const onHandleCancelRequest = async () =>
        handleCancelRequest(coach.id, toogleData)

    return (
        <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center p-10'>
                <img
                    className='w-24 h-24 mb-3 rounded-full shadow-lg'
                    src={avatar}
                    alt={avatarAlt}
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                    {name} {surname}
                </h5>
                <h5 className='mb-1 text-md text-gray-900 dark:text-white'>
                    @{username}
                </h5>
                <span className='mb-4 text-sm text-center text-gray-500 dark:text-gray-400'>
                    {roleFormat}
                </span>
                {hasRequest ? (
                    <Button kind='outline' onClick={onHandleCancelRequest}>
                        Cancelar solucitud
                    </Button>
                ) : (
                    <Button onClick={onHandleSendRequest}>
                        Mandar solucitud
                    </Button>
                )}
            </div>
        </div>
    )
}

const handleSendRequest = async (idCoach, toogleData) => {
    const { status } = await sendRequestToCoach(idCoach)

    if (status === 201) {
        toast.success('¡Solicitud enviada exitosamente!')
        toogleData(idCoach)
    } else {
        toast.error(
            'Ha ocurrido un error al enviar la solicitud. Por favor, inténtalo de nuevo.'
        )
    }
}

const handleCancelRequest = async (idCoach, toogleData) => {
    const { status } = await cancelRequestToCoach(idCoach)

    if (status === 204) {
        toast.success('¡Solicitud cancelada exitosamente!')
        toogleData(idCoach)
    } else {
        toast.error(
            'Ha ocurrido un error al cancelar la solicitud. Por favor, inténtalo de nuevo.'
        )
    }
}

export default CardCoach
