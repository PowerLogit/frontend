import { useAuthContext } from '@auth/libs/context/auth.context'
import { useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import { setNewAuth } from '../../../auth/libs/actions/auth.action'
import { removeAthleteRoleService } from '../../libs/services/athlete.service'

const RemoveAthleteRole = ({ closeModal }) => {
    const { dispatchAuth } = useAuthContext()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, setIsSubmitting, closeModal, dispatchAuth)

    return (
        <form className='p-5' onSubmit={onHandleSubmit}>
            <p className='mb-2 text-gray-500 dark:text-gray-300'>
                Al hacer clic en el botón &quot;Dejar de ser Atleta&quot;,
                confirmas que comprendes las consecuencias de esta acción y que
                estás dispuesto a renunciar a tus funciones y privilegios como
                atleta en PowerLog.
            </p>
            <p className='mb-2 text-gray-500 dark:text-gray-300'>
                Recuerda que siempre serás bienvenido como atleta en nuestra
                plataforma y podrás disfrutar de los beneficios de tener un
                entrenador dedicado para tu entrenamiento si así lo deseas.
            </p>
            <p className='mb-2 text-gray-500 dark:text-gray-300'>
                Agradecemos tu contribución como atleta en PowerLog y esperamos
                que hayas tenido una experiencia gratificante durante tu tiempo
                en este rol.
            </p>
            <p className='mb-6 text-gray-500 dark:text-gray-300'>
                Si en el futuro decides retomar tu papel como atleta, estaremos
                encantados de recibirte nuevamente en nuestra comunidad.
            </p>
            <div className='flex justify-center items-center gap-4'>
                <Button
                    kind='outline'
                    loading={isSubmitting}
                    onClick={closeModal}
                >
                    No, cancelar
                </Button>
                <Button type='submit' kind='danger' loading={isSubmitting}>
                    Si, deajar de serlo
                </Button>
            </div>
        </form>
    )
}

const handleSubmit = async (ev, setIsSubmitting, closeModal, dispatchAuth) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const { data, status } = await removeAthleteRoleService()

    if (status === 200) {
        dispatchAuth(setNewAuth(data.access_token))
        closeModal()
        toast.success(
            '¡Gracias por tu comprensión y por formar parte de PowerLog!'
        )
    } else {
        toast.error(
            'Ha ocurrido un error al dejar de ser atleta. Por favor, inténtalo de nuevo'
        )
    }

    setIsSubmitting(false)
}

export default RemoveAthleteRole
