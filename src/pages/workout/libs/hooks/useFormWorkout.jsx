import { useState } from 'react'
import { WORKOUT_FORM } from '../constant/workoutForm'

const useFormWorkout = () => {
    const [currentForm, setCurrentForm] = useState(WORKOUT_FORM.FILTERS)

    const setFiltersForm = () => setCurrentForm(WORKOUT_FORM.FILTERS)
    const setCreateForm = () => setCurrentForm(WORKOUT_FORM.CREATE)
    const setEditForm = () => setCurrentForm(WORKOUT_FORM.EDIT)
    const setDelteForm = () => setCurrentForm(WORKOUT_FORM.DELETE)

    return {
        currentForm,
        setFiltersForm,
        setCreateForm,
        setEditForm,
        setDelteForm,
    }
}

export default useFormWorkout
