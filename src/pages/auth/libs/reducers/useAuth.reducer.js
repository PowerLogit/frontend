import { AUTH_REDUCER } from '../constant/authReducer'

export const authReducer = (state, { type, payload }) => {
    switch (type) {
        case AUTH_REDUCER.SET_NEW_AUTH:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
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
                ...state,
                loading: false,
                error: payload,
                isAuthenticated: false,
                token: null,
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
