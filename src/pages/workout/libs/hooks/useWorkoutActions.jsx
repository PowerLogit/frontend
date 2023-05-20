import { useState } from 'react'

import WorkoutComments from '../../components/comment/WorkoutComments'
import WorkoutCompleteForm from '../../components/forms/WorkoutCompleteForm'
import WorkoutDeleteForm from '../../components/forms/WorkoutDeleteForm'
import WorkoutEditForm from '../../components/forms/WorkoutEditForm'

const useWorkoutActions = (workout) => {
    const [modalContent, setModalContent] = useState(initialStateModal)

    const setEditForm = () => {
        setModalContent({
            title: 'Editar workout',
            body: (
                <WorkoutEditForm
                    currentWorkout={workout}
                    closeModal={resetModalContent}
                />
            ),
        })
    }

    const setDeleteForm = () => {
        setModalContent({
            title: 'Eliminar workout',
            body: (
                <WorkoutDeleteForm
                    currentWorkout={workout}
                    closeModal={resetModalContent}
                />
            ),
        })
    }

    const setIsComplete = () => {
        setModalContent({
            title: 'Completar workout',
            body: (
                <WorkoutCompleteForm
                    currentWorkout={workout}
                    closeModal={resetModalContent}
                />
            ),
        })
    }

    const setComments = () => {
        setModalContent({
            title: 'Comentarios del workout',
            body: (
                <WorkoutComments
                    currentWorkout={workout}
                    onSuccess={resetModalContent}
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
        setIsComplete,
        setComments,
        resetModalContent,
    }
}

const initialStateModal = {
    title: '',
    body: null,
}

export default useWorkoutActions
