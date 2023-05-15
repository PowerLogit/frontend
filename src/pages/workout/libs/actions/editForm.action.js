import { EDIT_FORM_ACTION } from '../constant/editForm.action'

export const setName = (name) => ({
    type: EDIT_FORM_ACTION.SET_NAME,
    payload: name,
})

export const setSets = (sets) => ({
    type: EDIT_FORM_ACTION.SET_SETS,
    payload: sets,
})

export const setReps = (reps) => ({
    type: EDIT_FORM_ACTION.SET_REPS,
    payload: reps,
})

export const setWeight = (weight) => ({
    type: EDIT_FORM_ACTION.SET_WEIGHT,
    payload: weight,
})

export const setDate = (date) => ({
    type: EDIT_FORM_ACTION.SET_DATE,
    payload: date,
})
