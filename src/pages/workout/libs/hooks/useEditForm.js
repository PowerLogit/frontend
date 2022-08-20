import { useEffect, useState } from 'react'
import { normalizeDateISO } from '../functions/normaliceDate'
import {
    validateName,
    validateReps,
    validateSets,
    validateWeight,
} from '../validations/workout.validation'

const useEditForm = (workout) => {
    const [fomrValues, setFormValues] = useState(() => getInitialState(workout))

    const setName = (newName) => {
        const error = validateName(newName)

        setFormValues({
            ...fomrValues,
            name: { value: newName, error },
        })
    }

    const setSets = (newSets) => {
        const error = validateSets(newSets)

        setFormValues({
            ...fomrValues,
            sets: { value: newSets, error },
        })
    }

    const setReps = (newReps) => {
        const error = validateReps(newReps)

        setFormValues({
            ...fomrValues,
            reps: { value: newReps, error },
        })
    }

    const setWeight = (newWeight) => {
        const error = validateWeight(newWeight)

        setFormValues({
            ...fomrValues,
            weight: { value: newWeight, error },
        })
    }

    const setDate = (newDate) => setFormValues({ ...fomrValues, date: newDate })

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
        setFormValues(getInitialState(workout))
    }, [workout])

    return {
        fomrValues,
        isFormInvalid,
        setFormValues,
        settersFormValues: { setName, setSets, setReps, setWeight, setDate },
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
    fomrValues.sets.value === workout.sets &&
    fomrValues.reps.value === workout.reps &&
    fomrValues.weight.value === workout.weight &&
    fomrValues.date === normalizeDateISO(workout.date)

export default useEditForm
