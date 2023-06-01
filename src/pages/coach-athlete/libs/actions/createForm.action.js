import { CREATE_FORM_ACTION } from '../constant/createForm.action'

export const setName = (payload) => ({
    type: CREATE_FORM_ACTION.SET_NAME,
    payload,
})

export const setSets = (payload) => ({
    type: CREATE_FORM_ACTION.SET_SETS,
    payload,
})

export const setReps = (payload) => ({
    type: CREATE_FORM_ACTION.SET_REPS,
    payload,
})

export const setWeight = (payload) => ({
    type: CREATE_FORM_ACTION.SET_WEIGHT,
    payload,
})

export const setDate = (payload) => ({
    type: CREATE_FORM_ACTION.SET_DATE,
    payload,
})
