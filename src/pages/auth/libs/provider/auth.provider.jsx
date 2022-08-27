import { AuthContext } from '../context/auth.context'
import useAuth from '../hooks/useAuth'

export const AuthContextProvider = ({ children }) => {
    const { auth, setterAuth, setLoading, setError, fnAuth } = useAuth()

    return (
        <AuthContext.Provider
            value={{
                ...auth,
                setterAuth,
                setLoading,
                setError,
                register: fnAuth.register,
                login: fnAuth.login,
                logOut: fnAuth.logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
