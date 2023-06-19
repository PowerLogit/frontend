import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { user, dispatchAuth } = useAuthContext()
    const { data, isLoading, error } = useCoachProfile()

    const [showModal, setShowModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, setIsSubmitting, dispatchAuth, navigate, t)

    const openChat = () => {
        navigate(`/coach-chat/${user.coach}`)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return (
        <div className='mx-auto flex flex-col justify-center items-center gap-6 mt-4'>
            <h2 className='text-4xl text-center font-bold mb-3'>
                {t('myCoach.title')}
            </h2>
            <CardCoach coach={data} />
            <div className='w-full max-w-sm flex gap-4'>
                <Button
                    className='w-full'
                    kind='outline'
                    onClick={() => setShowModal(true)}
                >
                    {t('myCoach.modal.title')}
                </Button>
                <Button className='w-full' onClick={openChat}>
                    {t('myCoach.openChat')}
                </Button>
            </div>

            {showModal && (
                <Modal
                    title={t('myCoach.modal.title')}
                    closeModal={() => setShowModal(false)}
                >
                    <form className='p-5' onSubmit={onHandleSubmit}>
                        <p className='mb-6 text-gray-500 dark:text-gray-300'>
                            {t('myCoach.modal.content')}
                        </p>
                        <div className='flex justify-center items-center gap-4'>
                            <Button
                                kind='outline'
                                loading={isSubmitting}
                                onClick={() => setShowModal(false)}
                            >
                                {t('myCoach.modal.buttons.cancel')}
                            </Button>
                            <Button
                                kind='danger'
                                type='submit'
                                loading={isSubmitting}
                            >
                                {t('myCoach.modal.buttons.leave')}
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    )
}

const handleSubmit = async (ev, setIsSubmitting, dispatchAuth, navigate, t) => {
    ev.preventDefault()

    setIsSubmitting(true)

    const { data, status } = await leaveCoachService()
    if (status === 200) {
        dispatchAuth(setNewAuth(data.access_token))
        toast.success(t('myCoach.modal.toast.success'))
        navigate('/coaches')
    } else {
        toast.error(t('myCoach.modal.toast.error'))
    }

    setIsSubmitting(false)
}

export default MyCoach
