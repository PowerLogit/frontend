import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import WorkoutCompleteForm from '../../components/forms/WorkoutCompleteForm'
import WorkoutDeleteForm from '../../components/forms/WorkoutDeleteForm'
import WorkoutEditForm from '../../components/forms/WorkoutEditForm'

const useWorkoutActions = (workout) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const [modalContent, setModalContent] = useState(initialStateModal)

    const setEditForm = () => {
        setModalContent({
            title: t('workouts.modal.edit.title'),
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
            title: t('workouts.modal.delete.title'),
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
            title: t('workouts.modal.complete.title'),
            body: (
                <WorkoutCompleteForm
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
