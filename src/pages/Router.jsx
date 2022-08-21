import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@components/header/Header'
import PrivateRoute from '@components/PrivateRoute'
import { AuthContextProvider } from '@auth/context/auth.context'
import Authenticate from '@auth/Authenticate'
import Workout from '@workout/Workout'

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
