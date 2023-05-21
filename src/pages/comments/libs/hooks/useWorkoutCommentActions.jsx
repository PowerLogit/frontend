import { useState } from 'react'

import WorkoutCommentDeleteForm from '../../components/forms/WorkoutCommentDeleteForm'

const useWorkoutCommentActions = (comment, removeComment) => {
    const [modalContent, setModalContent] = useState(initialStateModal)

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
        setDeleteForm,
        resetModalContent,
    }
}

const initialStateModal = {
    title: '',
    body: null,
}

export default useWorkoutCommentActions
