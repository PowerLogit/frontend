import { useEffect, useReducer } from 'react'
import { HttpStatusCode } from '@constant/HttpStatusCode'
import { AuthContext, INITIAL_STATE_AUTH } from '../context/auth.context'
import { authReducer } from '../reducers/useAuth.reducer'
import { profileService } from '../services/auth.service'
import { setIsAuth, setIsNotAuth } from '../actions/auth.action'
import { removeBearer } from '../../../../helpers/bearer.helper'

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
    try {
        const { data, status, error } = await profileService(bearer)

        if (status !== HttpStatusCode.OK) {
            throw new Error(JSON.stringify(error.message))
        }

        dispatch(setIsAuth(data))
    } catch (error) {
        removeBearer()

        dispatch(setIsNotAuth())
    }
}
