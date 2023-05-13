import { NavLink } from 'react-router-dom'

const activeClass =
    'block py-2 pr-4 pl-3 text-white rounded bg-primary-700 md:bg-transparent md:text-primary-700 md:p-0 dark:text-white'

const notActiveClass =
    'block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'

const NavLinkTo = ({ url, title }) => {
    return (
        <NavLink
            to={url}
            className={({ isActive }) =>
                isActive ? activeClass : notActiveClass
            }
        >
            {title}
        </NavLink>
    )
}

export default NavLinkTo
