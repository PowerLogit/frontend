import { toast } from 'sonner'

import Button from '../../../components/ui/components/buttons/Button'
import { getAvatar } from '../../../helpers/uiAvatars'
import { sendRequestToCoach } from '../libs/services/coach.service'

const CardCoach = ({ coach }) => {
    const { name, surname, username, role } = coach

    const avatarImg = getAvatar(name, surname)

    const roles = role.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    const roleFormat = new Intl.ListFormat('es-ES').format(roles)

    const onHandleSubmit = async () => handleSubmit(coach.id)

    return (
        <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center p-10'>
                <img
                    className='w-24 h-24 mb-3 rounded-full shadow-lg'
                    src={avatarImg}
                    alt={name + ' image'}
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
                <Button onClick={onHandleSubmit}>Mandar solucitud</Button>
            </div>
        </div>
    )
}

const handleSubmit = async (idCoach) => {
    const { status } = await sendRequestToCoach(idCoach)

    if (status === 201) {
        toast.success('¡Solicitud enviada exitosamente!')
    } else if (status === 409) {
        toast.error('Ya has enviado una solicitud previamente')
    } else {
        toast.error(
            'Ha ocurrido un error al enviar la solicitud. Por favor, inténtalo de nuevo.'
        )
    }
}

export default CardCoach
