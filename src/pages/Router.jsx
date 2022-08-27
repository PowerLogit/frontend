import Authenticate from '@auth/Authenticate'
import PrivateRoute from '@auth/components/PrivateRoute'
import { AuthContextProvider } from '@auth/libs/provider/auth.provider'
import Header from '@components/header/Header'
import Workout from '@workout/Workout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <AuthContextProvider>
                    <Header />
                    <Routes>
                        {/* Public routes */}
                        <Route path='/' element={<h1> Home </h1>} />
                        <Route
                            path='/authenticate'
                            element={<Authenticate />}
                        />
                        <Route path='*' element={<h1> 404 </h1>} />

                        {/* Private routes */}
                        <Route element={<PrivateRoute />}>
                            <Route path='/workout' element={<Workout />} />
                        </Route>
                    </Routes>
                </AuthContextProvider>
            </BrowserRouter>
        </>
    )
}

export default Router
