import { Autorization } from '@api/services/authorization.service'
import { HttpStatusCode } from '@constant/HttpStatusCode'
import { useCallback, useEffect, useState } from 'react'
import {
    loginService,
    profileService,
    registerService,
} from '../services/auth.service'

const useAuth = () => {
    const [auth, setAuth] = useState(() => getInitialState())

    const setLoading = () =>
        setAuth({
            ...auth,
            loading: true,
        })

    const setIsAuth = (newUser) =>
        setAuth({
            ...auth,
            user: newUser,
            loading: false,
            isAuthenticated: true,
        })

    const setError = (newError = true) =>
        setAuth({
            ...auth,
            loading: false,
            error: newError,
            isAuthenticated: false,
            token: null,
        })

    const setProfile = useCallback((newUser) => {
        setAuth((prevAuth) => ({
            ...prevAuth,
            user: newUser,
            loading: false,
            isAuthenticated: true,
        }))
    }, [])

    const setProfileError = useCallback((newError = true) => {
        setAuth((prevAuth) => ({
            ...prevAuth,
            loading: false,
            error: newError,
            isAuthenticated: false,
            token: null,
        }))
    }, [])

    useEffect(() => {
        if (auth.token) profile(auth.token, setProfile, setProfileError)
    }, [auth.token, setProfile, setProfileError])

    return {
        auth,
        setterAuth: {
            setLoading,
            setIsAuth,
            setError,
        },
        setLoading,
        setError,
        fnAuth: {
            register,
            login,
            logOut,
        },
    }
}

export const INITIAL_STATE_AUTH = {
    user: null,
    loading: false,
    error: null,
    token: null,
    isAuthenticated: false,
}

const getInitialState = () => ({
    ...INITIAL_STATE_AUTH,
    token: localStorage.getItem('Authorization'),
    loading: !!localStorage.getItem('Authorization'),
})

const register = async (credential, navigate, setterAuth) => {
    setterAuth.setLoading()

    try {
        const { data, status, error } = await registerService(credential)

        if (status !== HttpStatusCode.CREATED) throw new Error(error)

        Autorization.set(data)

        setterAuth.setIsAuth()
        navigate('/')
    } catch (error) {
        setterAuth.setError(error.message)
    }
}

const login = async (credential, navigate, setterAuth) => {
    setterAuth.setLoading()

    try {
        const { data, status, error } = await loginService(credential)

        if (status !== HttpStatusCode.OK) throw new Error(error)

        Autorization.set(data)

        setterAuth.setIsAuth()
        navigate('/')
    } catch (error) {
        setterAuth.setError(error.message)
    }
}

const logOut = (setError, navigate) => {
    Autorization.remove()
    setError()
    navigate('/')
}

const profile = async (bearer, setIsAuth, setError) => {
    try {
        const { data, status } = await profileService(bearer)

        if (status !== HttpStatusCode.OK) throw new Error()

        setIsAuth(data)
    } catch (error) {
        Autorization.remove()

        setError()
    }
}

export default useAuth
