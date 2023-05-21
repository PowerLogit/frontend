import { useState } from 'react'

import Button from '../../../../components/ui/components/buttons/Button'
import TrashIcon from '../../../../components/ui/svg/TrashIcon'
import { deleteWorkoutCommentService } from '../../libs/services/comment.service'

const WorkoutCommentDeleteForm = ({
    currentComment,
    closeModal,
    removeComment,
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { id, text } = currentComment

    //const onHandleSubmit = (ev) =>
    //    handleSubmit(ev, id, setIsSubmitting, closeModal)

    return (
        <form
            className='p-5 text-center'
            onSubmit={(ev) =>
                handleSubmit(ev, id, setIsSubmitting, closeModal, removeComment)
            }
        >
            <TrashIcon
                className={
                    'text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
                }
            />
            <p className='mb-1 text-gray-500 dark:text-gray-300'>
                Estas seguro que quieres elimar el comentario:
            </p>
            <p className='mb-6 text-gray-500 dark:text-gray-300'>{text}</p>
            <div className='flex justify-center items-center gap-4'>
                <Button
                    kind='outline'
                    loading={isSubmitting}
                    onClick={closeModal}
                >
                    Cancelar
                </Button>
                <Button type='submit' loading={isSubmitting}>
                    Eliminar
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
    removeComment
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const res = await deleteWorkoutCommentService(commentId)

    if (res.status === 204) {
        removeComment(commentId)
        closeModal()
    }

    setIsSubmitting(false)
}

export default WorkoutCommentDeleteForm
