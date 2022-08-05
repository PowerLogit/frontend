import style from './header.module.css'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { useContext } from 'react'

const Header = () => {
    const { isAuthenticated, user, logOut } = useContext(AuthContext)

    const pages = [
        { title: 'Home', url: '/' },
        { title: 'Workout', url: '/workout' },
    ]

    return (
        <div className={style.header}>
            <div className={style.title}>
                <NavLink to={'/'}>
                    <span>Power</span>
                    <span>Log</span>
                </NavLink>
            </div>

            <div className={style.links}>
                {pages.map(({ url, title }, index) => (
                    <NavLink
                        key={index}
                        to={url}
                        className={({ isActive }) =>
                            isActive ? style.active : ''
                        }
                    >
                        {title}
                    </NavLink>
                ))}
            </div>

            <div className={style.social}>
                {isAuthenticated ? (
                    <>
                        <span>{user?.name}</span>
                        <button onClick={() => logOut()}>Cerrar sesion</button>
                    </>
                ) : (
                    <>
                        <Link to={'/register'}> Register </Link>
                        <Link to={'/login'}> Login </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
