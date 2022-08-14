import { useContext } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) return <h3>Loading...</h3>

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to='/authenticate' state={{ from: location }} replace />
    )
}

export default PrivateRoute
