import { AUTH_REDUCER } from '../constant/authReducer'

export const setNewAuth = () => ({
    type: AUTH_REDUCER.SET_NEW_AUTH,
})

export const setIsAuth = (profile) => ({
    type: AUTH_REDUCER.SET_IS_AUTH,
    payload: profile,
})

export const setIsNotAuth = (error) => ({
    type: AUTH_REDUCER.SET_IS_NOT_AUTH,
    payload: error,
})

export const setResetError = () => ({
    type: AUTH_REDUCER.SET_RESET_ERROR,
})
