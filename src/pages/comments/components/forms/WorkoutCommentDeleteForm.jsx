import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import TrashIcon from '../../../../components/ui/svg/TrashIcon'
import { deleteWorkoutCommentService } from '../../libs/services/comment.service'

const WorkoutCommentDeleteForm = ({
    currentComment,
    closeModal,
    removeComment,
}) => {
    const { t } = useTranslation()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const { id, text } = currentComment

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, id, setIsSubmitting, closeModal, removeComment, t)

    return (
        <form className='p-5 text-center' onSubmit={onHandleSubmit}>
            <TrashIcon
                className={
                    'text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
                }
            />
            <p className='mb-1 text-gray-500 dark:text-gray-300'>
                {t('workouts.comments.modal.delete.description')}
            </p>
            <p className='mb-6 text-gray-500 dark:text-gray-300'>{text}</p>
            <div className='flex justify-center items-center gap-4'>
                <Button
                    kind='outline'
                    loading={isSubmitting}
                    onClick={closeModal}
                >
                    {t('workouts.comments.modal.delete.buttons.cancel')}
                </Button>
                <Button
                    type='submit'
                    kind='danger'
                    icon={TrashIcon}
                    loading={isSubmitting}
                >
                    {t('workouts.comments.modal.delete.buttons.delete')}
                </Button>
            </div>
        </form>
    )
}

const handleSubmit = async (
    ev,
    commentId,
    setIsSubmitting,
    closeModal,
    removeComment,
    t
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const res = await deleteWorkoutCommentService(commentId)

    if (res.status === 204) {
        removeComment(commentId)
        closeModal()
        toast.success(t('workouts.comments.modal.delete.toast.success'))
    } else {
        toast.error(t('workouts.comments.modal.delete.toast.error'))
    }

    setIsSubmitting(false)
}

export default WorkoutCommentDeleteForm
