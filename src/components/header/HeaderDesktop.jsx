import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import style from './HeaderDesktop.module.css'

const HeaderDesktop = ({ pages }) => {
    const { isAuthenticated, user, logOut } = useContext(AuthContext)
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
                        <Link to={'/login'}> Identificarse </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default HeaderDesktop
