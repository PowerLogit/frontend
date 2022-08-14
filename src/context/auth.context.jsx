import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HttpStatusCode } from '../constant/HttpStatusCode'
import {
    loginService,
    profileService,
    registerService,
} from '../services/auth.service'
import { Autorization } from '../services/authorization.service'

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    loading: false,
    error: null,
}

export const AuthContext = createContext({
    ...initialState,
    login: async () => {},
    register: async () => {},
    logOut: () => {},
})

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const token = Autorization.get()
        return { ...initialState, token: token }
    })

    const [loading, setLoading] = useState(() => !!auth.token)

    useEffect(() => {
        async function getUserProfile(bearer) {
            try {
                const { data, status } = await profileService(bearer)

                if (status !== HttpStatusCode.OK)
                    if (status !== 200) throw new Error()

                setAuth((prevAuth) => ({
                    ...prevAuth,
                    isAuthenticated: true,
                    user: data,
                }))
            } catch (error) {
                Autorization.remove()

                setAuth((prevAuth) => ({
                    ...prevAuth,
                    token: null,
                }))
            } finally {
                setLoading(false)
            }
        }

        if (auth.token) getUserProfile(auth.token)
    }, [auth.token])

    const navigate = useNavigate()

    const login = async (credential) => {
        try {
            setAuth({ ...auth, loading: true })

            const { data, status, error } = await loginService(credential)

            if (status !== HttpStatusCode.OK) throw new Error(error)

            Autorization.set(data)

            setAuth((prevAuth) => ({
                ...prevAuth,
                isAuthenticated: true,
                loading: false,
            }))

            navigate('/')
        } catch (error) {
            setAuth({
                ...auth,
                isAuthenticated: false,
                loading: false,
                error: error.message,
            })
        }
    }

    const register = async (credential) => {
        try {
            setAuth({ ...auth, loading: true })

            const { data, status, error } = await registerService(credential)

            if (status !== HttpStatusCode.CREATED) throw new Error(error)

            Autorization.set(data)

            setAuth((prevAuth) => ({
                ...prevAuth,
                isAuthenticated: true,
                loading: false,
            }))

            navigate('/')
        } catch (error) {
            setAuth({
                ...auth,
                isAuthenticated: false,
                loading: false,
                error: error.message,
            })
        }
    }

    const logOut = () => {
        Autorization.remove()
        setAuth({ ...auth, isAuthenticated: false })
        navigate('/')
    }

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                login,
                register,
                logOut,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
