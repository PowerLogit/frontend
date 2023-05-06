import { useAuthContext } from '@auth/libs/context/auth.context'
import { Link, useNavigate } from 'react-router-dom'

import { dropdownHeaderPages } from '../../constant/headerPages'
import { removeBearer } from '../../helpers/bearer.helper'
import { setIsNotAuth } from '../../pages/auth/libs/actions/auth.action'

const DropdownHeader = () => {
    const { dispatchAuth, user } = useAuthContext()
    const navigate = useNavigate()

    const handleLogOut = () => {
        removeBearer()
        dispatchAuth(setIsNotAuth())
        navigate('/')
    }

    return (
        <>
            <div
                className='relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full cursor-pointer dark:bg-gray-600'
                id='avatarButton'
                data-dropdown-toggle='userDropdown'
                data-dropdown-placement='bottom-start'
            >
                <svg
                    className='absolute w-12 h-12 text-gray-400 -left-1'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        fillRule='evenodd'
                        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                        clipRule='evenodd'
                    ></path>
                </svg>
            </div>

            <div
                id='userDropdown'
                className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600'
            >
                <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                    <div>{user?.username}</div>
                    <div className='font-medium truncate'>{user?.email}</div>
                </div>
                <ul
                    className='py-2 text-sm text-gray-700 dark:text-gray-200'
                    aria-labelledby='avatarButton'
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
                <div className='py-1'>
                    <button
                        onClick={() => handleLogOut()}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </>
    )
}

export default DropdownHeader
