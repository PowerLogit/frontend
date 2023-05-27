import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '../libs/context/auth.context'

const PrivateRoute = () => {
    const { isAuthenticated, token, loading } = useAuthContext()
    const location = useLocation()

    if (token && loading) return <h3>Loading...</h3>
    else if (isAuthenticated) return <Outlet />
    else if (loading) return <h3>Loading...</h3>

    localStorage.setItem('redirectPath', location.pathname)

    return <Navigate to='/authenticate' state={{ from: location }} replace />
}

export default PrivateRoute
