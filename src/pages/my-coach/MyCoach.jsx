import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import Modal from '../../components/Modal'
import Button from '../../components/ui/components/buttons/Button'
import { setNewAuth } from '../auth/libs/actions/auth.action'
import { useAuthContext } from '../auth/libs/context/auth.context'
import CardCoach from './components/CardCoach'
import useCoachProfile from './libs/hooks/useCoachProfile'
import { leaveCoachService } from './libs/services/athlete.service'

const MyCoach = () => {
    const { user, dispatchAuth } = useAuthContext()
    const { data, isLoading, error } = useCoachProfile()
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, setIsSubmitting, dispatchAuth, navigate)

    const openChat = () => {
        navigate(`/coach-chat/${user.coach}`)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return (
        <div className='mx-auto flex flex-col justify-center items-center gap-6 pb-1'>
            <h2 className='text-4xl font-bold'>Mi entrenador</h2>
            <CardCoach coach={data} />
            <div className='w-full max-w-sm flex gap-4'>
                <Button
                    className='w-full'
                    kind='outline'
                    onClick={() => setShowModal(true)}
                >
                    Dejar el entrenador
                </Button>
                <Button className='w-full' onClick={openChat}>
                    Abrir chat
                </Button>
            </div>

            {showModal && (
                <Modal
                    title='Dejar el entrenador'
                    closeModal={() => setShowModal(false)}
                >
                    <form className='p-5' onSubmit={onHandleSubmit}>
                        <p className='mb-6 text-gray-500 dark:text-gray-300'>
                            Al hacer clic en el botón &quot;Dejar de tener
                            Entrenador&quot;, confirmas que comprendes las
                            consecuencias de esta acción y que estás dispuesto a
                            renunciar a tus funciones y privilegios de tener un
                            entrenador en PowerLog.
                        </p>
                        <div className='flex justify-center items-center gap-4'>
                            <Button
                                kind='outline'
                                loading={isSubmitting}
                                onClick={() => setShowModal(false)}
                            >
                                No, cancelar
                            </Button>
                            <Button
                                kind='danger'
                                type='submit'
                                loading={isSubmitting}
                            >
                                Si, dejarlo
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    )
}
const handleSubmit = async (ev, setIsSubmitting, dispatchAuth, navigate) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const { data, status } = await leaveCoachService()
    if (status === 200) {
        dispatchAuth(setNewAuth(data.access_token))
        toast.success('¡Solicitud enviada exitosamente!')
        navigate('/coaches')
    } else {
        toast.error(
            'Ha ocurrido un error al enviar la solicitud. Por favor, inténtalo de nuevo.'
        )
    }

    setIsSubmitting(false)
}
export default MyCoach
