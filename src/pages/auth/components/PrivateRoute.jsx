import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../libs/context/auth.context'

const PrivateRoute = ({ roles }) => {
    const { isAuthenticated, user, token, loading } = useAuthContext()
    const location = useLocation()
    const navigate = useNavigate()

    const hasPermission = roles?.every((role) => user?.role?.includes(role))

    useEffect(() => {
        if (token && loading) return

        if (!isAuthenticated || !hasPermission) {
            if (!loading) {
                navigate('/authenticate', {
                    replace: true,
                    state: { from: location },
                })
            }
        }
    }, [isAuthenticated, loading, navigate, token, hasPermission, location])

    if (token && loading) {
        return <h3>Loading...</h3>
    }

    if (isAuthenticated && hasPermission) {
        return <Outlet />
    }

    return <Navigate to='/authenticate' state={{ from: location }} replace />
}

export default PrivateRoute
