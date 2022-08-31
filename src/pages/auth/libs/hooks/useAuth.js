import { HttpStatusCode } from '@constant/HttpStatusCode'
import { useEffect, useState } from 'react'
import { removeBearer } from '../../../../helpers/bearer.helper'
import { INITIAL_STATE_AUTH } from '../context/auth.context'
import { profileService } from '../services/auth.service'

const useAuth = () => {
    const [auth, setAuth] = useState(INITIAL_STATE_AUTH)

    const setLoading = () =>
        setAuth({
            ...auth,
            loading: true,
        })

    const setIsNewAuth = () =>
        setAuth({
            ...auth,
            loading: false,
            isAuthenticated: true,
        })

    const setError = (newError) =>
        setAuth({
            ...auth,
            loading: false,
            error: newError,
            isAuthenticated: false,
            token: null,
        })

    useEffect(() => {
        async function getProfile(bearer) {
            try {
                const { data, status } = await profileService(bearer)
                if (status !== HttpStatusCode.OK) throw new Error()

                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: data,
                    loading: false,
                    isAuthenticated: true,
                }))
            } catch (error) {
                removeBearer()
                setAuth((prevAuth) => ({
                    ...prevAuth,
                    loading: false,
                    isAuthenticated: false,
                    token: null,
                }))
            }
        }

        if (auth.token) getProfile(auth.token)
    }, [auth.token])

    return {
        auth,
        setterAuth: {
            setLoading,
            setIsNewAuth,
            setError,
        },
    }
}

export default useAuth
