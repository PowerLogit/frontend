import { useEffect, useReducer } from 'react'

import { remplace } from '../actions/editForm.action'
import { normalizeDateISO } from '../functions/normaliceDate'
import { editFormReducer } from '../reducers/useEditForm.reducer'

const useEditForm = (workout) => {
    const [fomrValues, dispatchFormValues] = useReducer(
        editFormReducer,
        workout,
        getInitialState
    )

    const isFormInvalid =
        isInitialValues(fomrValues, workout) ||
        !fomrValues.name.value ||
        fomrValues.name.error ||
        !fomrValues.sets.value ||
        fomrValues.sets.error ||
        !fomrValues.reps.value ||
        fomrValues.reps.error ||
        !fomrValues.weight.value ||
        fomrValues.weight.error

    useEffect(() => {
        dispatchFormValues(remplace(getInitialState(workout)))
    }, [workout])

    return {
        fomrValues,
        isFormInvalid,
        dispatchFormValues,
    }
}

const getInitialState = (workout) => ({
    id: workout.id,
    name: {
        value: workout.name,
        error: undefined,
    },
    sets: {
        value: workout.sets,
        error: undefined,
    },
    reps: {
        value: workout.reps,
        error: undefined,
    },
    weight: {
        value: workout.weight,
        error: undefined,
    },
    date: normalizeDateISO(workout.date),
})

const isInitialValues = (fomrValues, workout) =>
    fomrValues.name.value === workout.name &&
    Number(fomrValues.sets.value) === workout.sets &&
    Number(fomrValues.reps.value) === workout.reps &&
    Number(fomrValues.weight.value) === workout.weight &&
    fomrValues.date === normalizeDateISO(workout.date)

export default useEditForm
