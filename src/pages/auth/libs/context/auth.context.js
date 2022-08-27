import { createContext, useContext } from 'react'
import { INITIAL_STATE_AUTH } from '../hooks/useAuth'

export const AuthContext = createContext({
    ...INITIAL_STATE_AUTH,
    login: async () => {},
    register: async () => {},
    logOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)
