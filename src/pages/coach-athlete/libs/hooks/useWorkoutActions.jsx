import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import WorkoutDeleteForm from '../../components/forms/WorkoutDeleteForm'
import WorkoutEditForm from '../../components/forms/WorkoutEditForm'

const useWorkoutActions = (workout) => {
    const [modalContent, setModalContent] = useState(initialStateModal)

    const navigate = useNavigate()

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

    const setComments = () => {
        navigate(`workout/${workout.id}`)
    }

    const resetModalContent = () => {
        setModalContent(initialStateModal)
    }

    return {
        modalContent,
        setEditForm,
        setDeleteForm,
        setComments,
        resetModalContent,
    }
}

const initialStateModal = {
    title: '',
    body: null,
}

export default useWorkoutActions
