import { useState } from 'react'
import { WORKOUT_FORM } from '../constant/workoutForm'

const useFormWorkout = () => {
    const [currentForm, setCurrentForm] = useState(INITIAL_STATE)

    const setFiltersForm = () => setCurrentForm(INITIAL_STATE)
    const setCreateForm = () => setCurrentForm({ form: WORKOUT_FORM.CREATE })
    const setEditForm = (workout) =>
        setCurrentForm({ form: WORKOUT_FORM.EDIT, workout })
    const setDelteForm = (workout) =>
        setCurrentForm({ form: WORKOUT_FORM.DELETE, workout })

    return {
        currentForm: currentForm.form,
        currentWorkout: currentForm.workout,
        setFiltersForm,
        setCreateForm,
        setEditForm,
        setDelteForm,
    }
}

const INITIAL_STATE = {
    form: WORKOUT_FORM.FILTERS,
}

export default useFormWorkout
