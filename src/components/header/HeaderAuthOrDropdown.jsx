import { useAuthContext } from '@auth/libs/context/auth.context'
import { Link } from 'react-router-dom'

import DropdownNotification from '../dropdownNotification/DropdownNotification'
import DropdownHeader from './DropdownHeader'
import { useTranslation } from 'react-i18next'

const HeaderAuthOrDropdown = ({ athletesRequest }) => {
    const { isAuthenticated, dispatchAuth, user } = useAuthContext()
    const { t } = useTranslation()

    if (isAuthenticated && !user) return

    if (!isAuthenticated)
        return (
            <Link
                to='/authenticate'
                className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
            >
                {t('header.authenticate')}
            </Link>
        )

    const isCoach = user?.role?.find((role) => role === 'coach')

    return (
        <div className='flex gap-4 items-center'>
            {isCoach && (
                <DropdownNotification athletesRequest={athletesRequest} />
            )}
            <DropdownHeader dispatchAuth={dispatchAuth} user={user} />
        </div>
    )
}

export default HeaderAuthOrDropdown
