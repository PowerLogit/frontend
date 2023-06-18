import { useAuthContext } from '@auth/libs/context/auth.context'
import { Sidebar } from 'flowbite-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import UserToAthlete from './components/athlete/UserToAthlete'
import UserToCoach from './components/coach/UserToCoach'
import Profile from './components/profile/Profile'

const Settings = () => {
    const { t } = useTranslation()
    const { user } = useAuthContext()

    const [showPage, setShowPage] = useState(() => getInitialState(t))

    const pages = getPages(user, t)

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

const getPages = (user, t) => {
    const isAthlete = user.role.includes('athlete')
    const isCoach = user.role.includes('coach')

    const athleteTitle = getTitle(isAthlete, 'athlete', t)
    const coachTitle = getTitle(isCoach, 'coach', t)

    const pages = [
        getInitialState(t),
        { name: athleteTitle, component: UserToAthlete },
        { name: coachTitle, component: UserToCoach },
    ]

    return pages
}

const getTitle = (haveRole, role, t) =>
    t(`settings.sidebar.${role}.${haveRole ? 'remove' : 'add'}`)

const getInitialState = (t) => ({
    name: t('settings.sidebar.profile'),
    component: Profile,
})

export default Settings
