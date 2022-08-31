import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../libs/context/auth.context'

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuthContext()
    const location = useLocation()

    if (loading) return <h3>Loading...</h3>
    if (isAuthenticated) return <Outlet />

    localStorage.setItem('redirectPath', location.pathname)

    return <Navigate to='/authenticate' state={{ from: location }} replace />
}

export default PrivateRoute
