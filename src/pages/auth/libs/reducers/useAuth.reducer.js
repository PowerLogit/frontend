import { AUTH_REDUCER } from '../constant/authReducer'

export const authReducer = (state, { type, payload }) => {
    switch (type) {
        case AUTH_REDUCER.SET_LOADING:
            return {
                ...state,
                loading: true,
            }

        case AUTH_REDUCER.SET_ISAUTH:
            return {
                ...state,
                user: payload,
                loading: false,
                isAuthenticated: true,
            }

        case AUTH_REDUCER.SET_ERROR:
            return {
                ...state,
                loading: false,
                error: payload || true,
                isAuthenticated: false,
                token: null,
            }

        default:
            throw new Error('Invalid action type')
    }
}
