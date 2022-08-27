import { useAuthContext } from '@auth/libs/context/auth.context'
import { pages } from '@constant/pagesNavbar'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import style from './HeaderDesktop.module.css'

const HeaderDesktop = () => {
    const { isAuthenticated, user, setError, logOut } = useAuthContext()
    const navigate = useNavigate()

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
                        <button onClick={() => logOut(setError, navigate)}>
                            Cerrar sesion
                        </button>
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
