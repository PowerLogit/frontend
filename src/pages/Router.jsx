import Authenticate from '@auth/Authenticate'
import PrivateRoute from '@auth/components/PrivateRoute'
import { AuthContextProvider } from '@auth/libs/provider/auth.provider'
import Workout from '@workout/Workout'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import Footer from '../components/Footer'
import Header from '../components/header/Header'
import PageNotFound from '../components/PageNotFound'
import i18n from '../i18n/i18n'
import AthletesRequest from './athletesRequest/AthletesRequest'
import useAthletesRequest from './athletesRequest/libs/hooks/useAthletesRequest'
import Calculate from './calculate/Calculate'
import CoachAthleteWorkout from './coach-athlete/CoachAthleteWorkout'
import AthletesList from './coach-athletesList/AthletesList'
import ChatCoach from './coach-athletesList/components/chat/Chat'
import WorkoutComments from './comments/WorkoutComments'
import Home from './home/Home'
import ListCoaches from './list-coaches/ListCoaches'
import ChatAthlete from './my-coach/components/chat/Chat'
import MyCoach from './my-coach/MyCoach'
import Settings from './settings/SideBar'

const Router = () => {
    return (
        <div className='dark:bg-gray-900 dark:text-white flex flex-col min-h-screen'>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <Toaster richColors position='top-right' />

                    <AuthContextProvider>
                        <RouterMain />
                    </AuthContextProvider>
                </BrowserRouter>
            </I18nextProvider>
        </div>
    )
}

const RouterMain = () => {
    const athletesRequest = useAthletesRequest()

    return (
        <>
            <Header athletesRequest={athletesRequest} />

            <main className='flex-grow flex-shrink-0'>
                <Routes>
                    {/* Public routes */}
                    <Route path='/' element={<Home />} />
                    <Route path='/authenticate' element={<Authenticate />} />

                    {/* Private routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path='/settings' element={<Settings />} />
                    </Route>

                    {/* Private routes athlete */}
                    <Route element={<PrivateRoute roles={['athlete']} />}>
                        <Route path='/workouts' element={<Workout />} />
                        <Route
                            path='/workout/:idWorkout'
                            element={<WorkoutComments />}
                        />
                        <Route path='/calc/:weight?' element={<Calculate />} />
                        <Route path='/coaches' element={<ListCoaches />} />
                        <Route path='/coach' element={<MyCoach />} />
                        <Route
                            path='/coach-chat/:idCoach'
                            element={<ChatAthlete />}
                        />
                    </Route>

                    {/* Private routes coach */}
                    <Route element={<PrivateRoute roles={['coach']} />}>
                        <Route
                            path='/athletes-request'
                            element={
                                <AthletesRequest
                                    athletesRequest={athletesRequest}
                                />
                            }
                        />
                        <Route
                            path='/athletes-list'
                            element={<AthletesList />}
                        />
                        <Route
                            path='/athlete/:idAthlete/:username'
                            element={<CoachAthleteWorkout />}
                        />
                        <Route
                            path='/athlete-chat/:idAthlete/:username'
                            element={<ChatCoach />}
                        />
                    </Route>

                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </main>

            <Footer />
        </>
    )
}

export default Router
