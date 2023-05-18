import { removeBearer, setBearer } from '../../../../helpers/bearer.helper'
import { AUTH_REDUCER } from '../constant/authReducer'
import { INITIAL_STATE_AUTH } from '../context/auth.context'

export const authReducer = (state, { type, payload }) => {
    switch (type) {
        case AUTH_REDUCER.SET_IS_LOADING:
            return {
                ...state,
                loading: true,
            }

        case AUTH_REDUCER.SET_NEW_AUTH:
            setBearer(payload)

            return {
                ...state,
                loading: false,
                error: null,
                token: payload,
                isAuthenticated: true,
            }

        case AUTH_REDUCER.SET_IS_AUTH:
            return {
                ...state,
                user: payload,
                loading: false,
                error: null,
                isAuthenticated: true,
            }

        case AUTH_REDUCER.SET_IS_NOT_AUTH:
            removeBearer()

            return INITIAL_STATE_AUTH

        case AUTH_REDUCER.SET_ERROR:
            return {
                ...INITIAL_STATE_AUTH,
                loading: false,
                error: payload,
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
