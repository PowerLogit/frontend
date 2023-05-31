import { CREATE_FORM_ACTION } from '../constant/createForm.action'

export const setName = (name) => ({
    type: CREATE_FORM_ACTION.SET_NAME,
    payload: name,
})

export const setSets = (sets) => ({
    type: CREATE_FORM_ACTION.SET_SETS,
    payload: sets,
})

export const setReps = (reps) => ({
    type: CREATE_FORM_ACTION.SET_REPS,
    payload: reps,
})

export const setWeight = (weight) => ({
    type: CREATE_FORM_ACTION.SET_WEIGHT,
    payload: weight,
})

export const setDate = (date) => ({
    type: CREATE_FORM_ACTION.SET_DATE,
    payload: date,
})
