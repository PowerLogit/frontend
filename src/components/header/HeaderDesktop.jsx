import { useAuthContext } from '@auth/libs/context/auth.context'
import { pages } from '@constant/pagesNavbar'
import { Link, NavLink } from 'react-router-dom'
import style from './HeaderDesktop.module.css'

const HeaderDesktop = ({ handleLogOut }) => {
    const { isAuthenticated, user } = useAuthContext()

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
                        <button onClick={handleLogOut}>Cerrar sesion</button>
                    </>
                ) : (
                    <>
                        <Link to={'/authenticate'}> Identificarse </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default HeaderDesktop
