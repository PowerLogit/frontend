import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../libs/context/auth.context'

const PrivateRoute = ({ roles }) => {
    const { isAuthenticated, user, token, loading } = useAuthContext()
    const location = useLocation()

    if (token && loading) {
        return <h3>Loading...</h3>
    } else if (
        isAuthenticated &&
        (!roles || roles.every((role) => user.role.includes(role)))
    ) {
        return <Outlet />
    } else if (loading) {
        return <h3>Loading...</h3>
    }

    localStorage.setItem('redirectPath', location.pathname)

    return <Navigate to='/authenticate' state={{ from: location }} replace />
}

export default PrivateRoute
