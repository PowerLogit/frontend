import { EDIT_FORM_ACTION } from '../constant/editForm.action'

export const setName = (payload) => ({
    type: EDIT_FORM_ACTION.SET_NAME,
    payload,
})

export const setSets = (payload) => ({
    type: EDIT_FORM_ACTION.SET_SETS,
    payload,
})

export const setReps = (payload) => ({
    type: EDIT_FORM_ACTION.SET_REPS,
    payload,
})

export const setWeight = (payload) => ({
    type: EDIT_FORM_ACTION.SET_WEIGHT,
    payload,
})

export const setDate = (payload) => ({
    type: EDIT_FORM_ACTION.SET_DATE,
    payload,
})
