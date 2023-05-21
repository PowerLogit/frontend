import { useState } from 'react'

import WorkoutCommentDeleteForm from '../../components/forms/WorkoutCommentDeleteForm'
import WorkoutCommnetEditForm from '../../components/forms/WorkoutCommnetEditForm'

const useWorkoutCommentActions = (comment, settersComment) => {
    const [modalContent, setModalContent] = useState(initialStateModal)

    const { updateComment, removeComment } = settersComment

    const setEditForm = () => {
        setModalContent({
            title: 'Editar comentario',
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
            title: 'Eliminar comentario',
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
