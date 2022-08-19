import { useState } from 'react'
import {
    validateName,
    validateReps,
    validateSets,
    validateWeight,
} from '../validations/workout.validation'

const useFormValues = () => {
    const [fomrValues, setFormValues] = useState({
        name: {
            value: 'SQLB',
            error: undefined,
        },
        sets: {
            value: 1,
            error: undefined,
        },
        reps: {
            value: 1,
            error: undefined,
        },
        weight: {
            value: 100,
            error: undefined,
        },
        date: normalizeDateISO(new Date()),
    })

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

    return {
        fomrValues,
        setFormValues,
        settersFormValues: { setName, setSets, setReps, setWeight, setDate },
    }
}

const normalizeDateISO = (date) => {
    const newDate = new Date(date).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    return newDate.split('/').reverse().join('-')
}

export default useFormValues
