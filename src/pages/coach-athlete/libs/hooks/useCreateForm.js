import { useReducer } from 'react'
import { createFormReducer } from '../reducers/useCreateForm.reducer'
import { normalizeDateISO } from '../../../../helpers/normaliceDate'

const useCreateForm = () => {
    const [fomrValues, dispatchFormValues] = useReducer(
        createFormReducer,
        INITIAL_STATE
    )

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
        dispatchFormValues,
    }
}

const INITIAL_STATE = {
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
    isCompleted: {
        value: false,
        error: undefined,
    },
    isSuccessful: {
        value: false,
        error: undefined,
    },
    date: normalizeDateISO(new Date()),
}

export default useCreateForm
