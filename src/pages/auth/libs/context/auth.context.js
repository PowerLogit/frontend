import { createContext, useContext } from 'react'

export const INITIAL_STATE_AUTH = {
    user: null,
    loading: !!localStorage.getItem('Authorization'),
    error: null,
    token: localStorage.getItem('Authorization'),
    isAuthenticated: false,
}

export const AuthContext = createContext({
    ...INITIAL_STATE_AUTH,
    login: async () => {},
    register: async () => {},
    logOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)
