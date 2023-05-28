import { useState } from 'react'
import Button from '../../../components/ui/components/buttons/Button'
import { getAvatar } from '../../../helpers/uiAvatars'
import {
    acceptAthleteService,
    rejectAthleteService,
} from '../libs/services/athlete.service'
import { toast } from 'sonner'

const AthletesRequestCard = ({ athlete, resetFilters }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { name, surname, username } = athlete

    const avatarImg = getAvatar(name, surname)

    const onHandleAccept = async () =>
        handleAccept(athlete.id, setIsSubmitting, resetFilters)

    const onHandleReject = async () =>
        handleReject(athlete.id, setIsSubmitting, resetFilters)

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
                <h5 className='mb-4 text-md text-gray-900 dark:text-white'>
                    @{username}
                </h5>
                <div className='flex gap-4'>
                    <Button
                        kind='danger'
                        loading={isSubmitting}
                        onClick={onHandleReject}
                    >
                        Rechazar
                    </Button>
                    <Button
                        kind='success'
                        loading={isSubmitting}
                        onClick={onHandleAccept}
                    >
                        Aceptar
                    </Button>
                </div>
            </div>
        </div>
    )
}

const handleAccept = async (idAthlete, setIsSubmitting, resetFilters) => {
    setIsSubmitting(true)

    const { status } = await acceptAthleteService(idAthlete)
    console.log('handleAccept', { status })

    if (status === 201) {
        resetFilters()
        toast.success('Atleta aceptado exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al aceptar el atleta. Por favor, inténtalo de nuevo.'
        )
    }

    setIsSubmitting(false)
}

const handleReject = async (idAthlete, setIsSubmitting, resetFilters) => {
    setIsSubmitting(true)

    const { status } = await rejectAthleteService(idAthlete)
    console.log('handleReject', { status })

    if (status === 204) {
        resetFilters()
        toast.success('Atleta rechazado exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al rechazar el atleta. Por favor, inténtalo de nuevo.'
        )
    }

    setIsSubmitting(false)
}

export default AthletesRequestCard
