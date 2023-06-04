import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../libs/context/auth.context'

const PrivateRoute = ({ roles }) => {
    const { isAuthenticated, user, token, loading } = useAuthContext()
    const location = useLocation()
    const navigate = useNavigate()

    const hasPermission = roles
        ? roles?.every((role) => user?.role?.includes(role))
        : true

    useEffect(() => {
        if (!!token && loading) return

        if (!!token && isAuthenticated && !hasPermission && !loading) {
            navigate(-1)
        }

        if (!token && !isAuthenticated && !loading) {
            navigate('/authenticate', {
                replace: true,
                state: { from: location },
            })
        }
    }, [isAuthenticated, loading, navigate, token, hasPermission, location])

    // if (!!token && loading) {
    //     return <h3>Loading...</h3>
    // }

    if (isAuthenticated && hasPermission) {
        return <Outlet />
    }

    return null
}

export default PrivateRoute
