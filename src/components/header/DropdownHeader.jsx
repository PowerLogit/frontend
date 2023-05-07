import { useAuthContext } from '@auth/libs/context/auth.context'
import { Link, useNavigate } from 'react-router-dom'

import { dropdownHeaderPages } from '../../constant/headerPages'
import { removeBearer } from '../../helpers/bearer.helper'
import { setIsNotAuth } from '../../pages/auth/libs/actions/auth.action'

const DropdownHeader = () => {
    const { dispatchAuth, isAuthenticated, user } = useAuthContext()
    const navigate = useNavigate()

    const handleLogOut = () => {
        removeBearer()
        dispatchAuth(setIsNotAuth())
        navigate('/')
    }

    const roles = user?.role.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    const rolesFormat = new Intl.ListFormat('es-ES').format(roles)

    return (
        <>
            <button
                id='dropdownAvatarNameButton'
                data-dropdown-toggle='dropdownAvatarName'
                className='flex items-center text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white'
                type='button'
            >
                <span className='sr-only'>Open user menu</span>
                <img
                    className='w-8 h-8 mr-2 rounded-full'
                    src='https://cdn-icons-png.flaticon.com/512/6073/6073873.png'
                    alt='user photo'
                />
                {user?.username}
                <svg
                    className='w-4 h-4 mx-1.5'
                    aria-hidden='true'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                    ></path>
                </svg>
            </button>

            <div
                id='dropdownAvatarName'
                className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
            >
                {isAuthenticated && (
                    <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                        <div className='font-medium '>{rolesFormat}</div>
                        <div className='truncate'>{user?.email}</div>
                    </div>
                )}
                <ul
                    className='py-2 text-sm text-gray-700 dark:text-gray-200'
                    aria-labelledby='dropdownInformdropdownAvatarNameButtonationButton'
                >
                    {dropdownHeaderPages.map(({ title, url }, index) => (
                        <li key={index}>
                            <Link
                                to={url}
                                className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                            >
                                {title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='py-2'>
                    {isAuthenticated ? (
                        <button
                            onClick={() => handleLogOut()}
                            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        >
                            Cerrar sesión
                        </button>
                    ) : (
                        <Link
                            to='/authenticate'
                            className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                        >
                            Identificarse
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}

export default DropdownHeader
