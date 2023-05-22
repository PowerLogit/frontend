import Authenticate from '@auth/Authenticate'
import PrivateRoute from '@auth/components/PrivateRoute'
import { AuthContextProvider } from '@auth/libs/provider/auth.provider'
import Workout from '@workout/Workout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import Footer from '../components/Footer'
import Header from '../components/header/Header'
import PageNotFound from '../components/PageNotFound'
import Calculate from './calculate/Calculate'
import WorkoutComments from './comments/WorkoutComments'
import Home from './home/Home'
import Settings from './settings/SideBar'

const Router = () => {
    return (
        <div className='dark:bg-gray-900 dark:text-white flex flex-col min-h-screen'>
            <BrowserRouter>
                <Toaster richColors position='top-right' />

                <AuthContextProvider>
                    <main className='flex-grow flex-shrink-0'>
                        <Header />

                        <Routes>
                            {/* Public routes */}
                            <Route path='/' element={<Home />} />
                            <Route
                                path='/authenticate'
                                element={<Authenticate />}
                            />

                            {/* Private routes */}
                            <Route element={<PrivateRoute />}>
                                <Route path='/workouts' element={<Workout />} />
                                <Route
                                    path='/workout/:idWorkout'
                                    element={<WorkoutComments />}
                                />
                                <Route
                                    path='/calc/:weight?'
                                    element={<Calculate />}
                                />
                                <Route
                                    path='/settings'
                                    element={<Settings />}
                                />
                            </Route>

                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </main>

                    <Footer />
                </AuthContextProvider>
            </BrowserRouter>
        </div>
    )
}

export default Router
