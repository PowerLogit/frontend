import { useAuthContext } from '@auth/libs/context/auth.context'
import { useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import { setNewAuth } from '../../../auth/libs/actions/auth.action'
import { addCoachRoleService } from '../../libs/services/coach.service'

const AddCoachRole = ({ closeModal }) => {
    const { dispatchAuth } = useAuthContext()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, setIsSubmitting, closeModal, dispatchAuth)

    return (
        <form className='p-5' onSubmit={onHandleSubmit}>
            <p className='mb-2 text-gray-500 dark:text-gray-300'>
                Al hacer clic en el botón &quot;Convertirse en Entrenador&quot;,
                aceptas asumir las responsabilidades y compromisos asociados con
                ser un entrenador en nuestra plataforma. Además, confirmas que
                cuentas con los conocimientos y la experiencia necesarios para
                guiar y apoyar a los atletas en su viaje de entrenamiento de
                powerlifting.
            </p>
            <p className='mb-6 text-gray-500 dark:text-gray-300'>
                Estamos emocionados de tener nuevos entrenadores como tú en
                nuestra comunidad y esperamos que aproveches al máximo esta
                oportunidad de compartir tu pasión por el powerlifting con otros
                atletas.
            </p>
            <div className='flex justify-center items-center gap-4'>
                <Button
                    kind='outline'
                    loading={isSubmitting}
                    onClick={closeModal}
                >
                    No, cancelar
                </Button>
                <Button type='submit' loading={isSubmitting}>
                    Si, convertirse
                </Button>
            </div>
        </form>
    )
}

const handleSubmit = async (ev, setIsSubmitting, closeModal, dispatchAuth) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const { data, status } = await addCoachRoleService()

    if (status === 200) {
        dispatchAuth(setNewAuth(data.access_token))
        closeModal()
        toast.success(
            '¡Adelante y comienza tu carrera como entrenador en PowerLog!'
        )
    } else {
        toast.error(
            'Ha ocurrido un error al convertirse en entrenador. Por favor, inténtalo de nuevo'
        )
    }

    setIsSubmitting(false)
}

export default AddCoachRole
