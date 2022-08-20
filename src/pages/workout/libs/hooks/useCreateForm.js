import { useState } from 'react'
import { normalizeDateISO } from '../functions/normaliceDate'
import {
    validateName,
    validateReps,
    validateSets,
    validateWeight,
} from '../validations/workout.validation'

const useCreateForm = () => {
    const [fomrValues, setFormValues] = useState(() => getInitialState())

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
        !fomrValues.name.value ||
        fomrValues.name.error ||
        !fomrValues.sets.value ||
        fomrValues.sets.error ||
        !fomrValues.reps.value ||
        fomrValues.reps.error ||
        !fomrValues.weight.value ||
        fomrValues.weight.error

    return {
        fomrValues,
        isFormInvalid,
        setFormValues,
        settersFormValues: { setName, setSets, setReps, setWeight, setDate },
    }
}

const getInitialState = () => ({
    name: {
        value: '',
        error: undefined,
    },
    sets: {
        value: '',
        error: undefined,
    },
    reps: {
        value: '',
        error: undefined,
    },
    weight: {
        value: '',
        error: undefined,
    },
    date: normalizeDateISO(new Date()),
})

export default useCreateForm
