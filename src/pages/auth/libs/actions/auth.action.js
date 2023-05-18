import { AUTH_REDUCER } from '../constant/authReducer'

export const setIsLoading = () => ({
    type: AUTH_REDUCER.SET_IS_LOADING,
})

export const setNewAuth = (token) => ({
    type: AUTH_REDUCER.SET_NEW_AUTH,
    payload: token,
})

export const setIsAuth = (profile) => ({
    type: AUTH_REDUCER.SET_IS_AUTH,
    payload: profile,
})

export const setIsNotAuth = () => ({
    type: AUTH_REDUCER.SET_IS_NOT_AUTH,
})

export const setError = (error) => ({
    type: AUTH_REDUCER.SET_ERROR,
    payload: error,
})

export const setResetError = () => ({
    type: AUTH_REDUCER.SET_RESET_ERROR,
})
