import { useAuthContext } from '@auth/libs/context/auth.context'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import { setNewAuth } from '../../../auth/libs/actions/auth.action'
import { addCoachRoleService } from '../../libs/services/coach.service'

const AddCoachRole = ({ closeModal }) => {
    const { t } = useTranslation()

    const { dispatchAuth } = useAuthContext()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, setIsSubmitting, closeModal, dispatchAuth, t)

    return (
        <form className='p-5' onSubmit={onHandleSubmit}>
            <p className='mb-2 text-gray-500 dark:text-gray-300'>
                {t('settings.beingCoach.add.modal.paragraph1')}
            </p>
            <p className='mb-6 text-gray-500 dark:text-gray-300'>
                {t('settings.beingCoach.add.modal.paragraph2')}
            </p>
            <div className='flex justify-center items-center gap-4'>
                <Button
                    kind='outline'
                    loading={isSubmitting}
                    onClick={closeModal}
                >
                    {t('settings.beingCoach.add.modal.cancel')}
                </Button>
                <Button type='submit' loading={isSubmitting}>
                    {t('settings.beingCoach.add.modal.add')}
                </Button>
            </div>
        </form>
    )
}

const handleSubmit = async (
    ev,
    setIsSubmitting,
    closeModal,
    dispatchAuth,
    t
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const { data, status } = await addCoachRoleService()

    if (status === 200) {
        dispatchAuth(setNewAuth(data.access_token))
        closeModal()
        toast.success(t('settings.beingCoach.add.modal.toast.success'))
    } else {
        toast.error(t('settings.beingCoach.add.modal.toast.error'))
    }

    setIsSubmitting(false)
}

export default AddCoachRole
