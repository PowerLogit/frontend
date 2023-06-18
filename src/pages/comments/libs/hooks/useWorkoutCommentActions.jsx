import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import WorkoutCommentDeleteForm from '../../components/forms/WorkoutCommentDeleteForm'
import WorkoutCommnetEditForm from '../../components/forms/WorkoutCommnetEditForm'

const useWorkoutCommentActions = (comment, settersComment) => {
    const { t } = useTranslation()

    const [modalContent, setModalContent] = useState(initialStateModal)

    const { updateComment, removeComment } = settersComment

    const setEditForm = () => {
        setModalContent({
            title: t('workouts.comments.modal.edit.title'),
            body: (
                <WorkoutCommnetEditForm
                    currentComment={comment}
                    closeModal={resetModalContent}
                    updateComment={updateComment}
                />
            ),
        })
    }

    const setDeleteForm = () => {
        setModalContent({
            title: t('workouts.comments.modal.delete.title'),
            body: (
                <WorkoutCommentDeleteForm
                    currentComment={comment}
                    closeModal={resetModalContent}
                    removeComment={removeComment}
                />
            ),
        })
    }

    const resetModalContent = () => {
        setModalContent(initialStateModal)
    }

    return {
        modalContent,
        setEditForm,
        setDeleteForm,
        resetModalContent,
    }
}

const initialStateModal = {
    title: '',
    body: null,
}

export default useWorkoutCommentActions
