import { AUTH_REDUCER } from '../constant/authReducer'

export const setLoading = () => ({ type: AUTH_REDUCER.SET_LOADING })

export const setIsAuth = (credential) => ({
    type: AUTH_REDUCER.SET_ISAUTH,
    payload: credential,
})

export const setError = (error) => ({
    type: AUTH_REDUCER.SET_ERROR,
    payload: error,
})
