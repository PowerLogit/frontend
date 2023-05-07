import { AUTH_REDUCER } from '../constant/authReducer'
import { INITIAL_STATE_AUTH } from '../context/auth.context'

export const authReducer = (state, { type, payload }) => {
    switch (type) {
        case AUTH_REDUCER.SET_NEW_AUTH:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: payload,
            }

        case AUTH_REDUCER.SET_IS_AUTH:
            return {
                ...state,
                user: payload,
                loading: false,
                isAuthenticated: true,
            }

        case AUTH_REDUCER.SET_IS_NOT_AUTH:
            return {
                ...INITIAL_STATE_AUTH,
            }

        case AUTH_REDUCER.SET_RESET_ERROR:
            return {
                ...state,
                error: null,
            }

        default:
            throw new Error('Invalid action type')
    }
}
