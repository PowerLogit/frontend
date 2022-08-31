import { AuthContext } from '../context/auth.context'
import useAuth from '../hooks/useAuth'

export const AuthContextProvider = ({ children }) => {
    const { auth, setterAuth } = useAuth()

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                ...setterAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
