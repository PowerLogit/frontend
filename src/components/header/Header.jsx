import { useAuthContext } from '@auth/libs/context/auth.context'
import { Navbar } from 'flowbite-react'
import { Link } from 'react-router-dom'

import { headerPages } from '../../constant/headerPages'
import DropdownNotification from '../dropdownNotification/DropdownNotification'
import NavLinkTo from '../ui/components/navigation/NavLinkTo'
import DropdownHeader from './DropdownHeader'

const Header = () => {
    const { isAuthenticated, dispatchAuth, user } = useAuthContext()

    const isCoach = user?.role?.find((role) => role === 'coach')

    return (
        <div className='dark:bg-gray-800'>
            <Navbar
                fluid={true}
                className='max-w-screen-xl mx-auto px-5 xl:px-0'
            >
                <Link to={'/'} className='flex items-center'>
                    <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                        PowerLog
                    </span>
                </Link>
                <div className='flex md:order-2'>
                    {!isAuthenticated ? (
                        <Link
                            to='/authenticate'
                            className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
                        >
                            Identificarse
                        </Link>
                    ) : (
                        <div className='flex gap-4 items-center'>
                            {isCoach && <DropdownNotification />}
                            <DropdownHeader
                                dispatchAuth={dispatchAuth}
                                user={user}
                            />
                        </div>
                    )}
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    {headerPages.map(({ title, url }, index) => (
                        <li key={index}>
                            <NavLinkTo url={url} title={title} />
                        </li>
                    ))}
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header
