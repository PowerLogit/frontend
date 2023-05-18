import { HttpStatusCode } from '@constant/HttpStatusCode'
import { useEffect, useReducer } from 'react'

import { setIsAuth, setIsNotAuth } from '../actions/auth.action'
import { AuthContext, INITIAL_STATE_AUTH } from '../context/auth.context'
import { authReducer } from '../reducers/useAuth.reducer'
import { profileService } from '../services/auth.service'

export const AuthContextProvider = ({ children }) => {
    const [auth, dispatchAuth] = useReducer(authReducer, INITIAL_STATE_AUTH)

    useEffect(() => {
        if (auth.token) {
            getProfile(auth.token, dispatchAuth)
        }
    }, [auth.token])

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                dispatchAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const getProfile = async (bearer, dispatch) => {
    //dispatch(setIsLoading())

    try {
        const { data, status } = await profileService(bearer)

        if (status !== HttpStatusCode.OK) {
            throw new Error()
        }

        dispatch(setIsAuth(data))
    } catch (error) {
        dispatch(setIsNotAuth())
    }
}
