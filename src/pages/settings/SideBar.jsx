import { useAuthContext } from '@auth/libs/context/auth.context'
import { Sidebar } from 'flowbite-react'
import { useState } from 'react'

import UserToAthlete from './components/athlete/UserToAthlete'
import UserToCoach from './components/coach/UserToCoach'
import Profile from './components/profile/Profile'
import MyCoach from './components/my-coach/MyCoach'

const Settings = () => {
    const { user } = useAuthContext()
    const [showPage, setShowPage] = useState(initialState)

    const pages = getPages(user)

    return (
        <div className='max-w-screen-xl mx-auto mt-8 flex gap-8 px-4 xl:px-0'>
            <div className='h-full'>
                <Sidebar aria-label='Sidebar with call to action button example'>
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            {pages.map((page) => (
                                <Sidebar.Item
                                    key={page.name}
                                    onClick={() => setShowPage(page)}
                                    className={`cursor-pointer hover:!bg-primary-800 ${
                                        page.name === showPage.name
                                            ? 'bg-primary-700'
                                            : ''
                                    }`}
                                >
                                    {page.name}
                                </Sidebar.Item>
                            ))}
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
            <showPage.component />
        </div>
    )
}

const initialState = {
    name: 'Mi Perfil',
    component: Profile,
}

const getPages = (user) => {
    const athleteTitle = getTitle(user?.roles?.includes('athlete'), 'Atleta')
    const coachTitle = getTitle(user?.roles?.includes('coach'), 'Entrenador')
    const hasCoach = user?.coach

    const pages = [
        initialState,
        { name: athleteTitle, component: UserToAthlete },
        { name: coachTitle, component: UserToCoach },
    ]

    if (hasCoach) {
        pages.push({ name: 'Mi Entrenador', component: MyCoach })
    }

    return pages
}

const getTitle = (conditional, title) =>
    conditional ? `Dejar de ser ${title}` : `Ser ${title}`

export default Settings
