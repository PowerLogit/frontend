import { useContext } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

const PrivateRoute = () => {
    const location = useLocation()

    // const isAuthenticated = localStorage.getItem('Authorization')
    const { isAuthenticated, loading } = useContext(AuthContext)

    if (loading) return <h3>Loading...</h3>

    // console.log(x)

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default PrivateRoute
