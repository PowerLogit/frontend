import { useAuthContext } from '@auth/libs/context/auth.context'
import { Link, NavLink } from 'react-router-dom'
import PagesLinks from '../PagesLinks'
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

            <PagesLinks style={style} isAuth={isAuthenticated} />

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
