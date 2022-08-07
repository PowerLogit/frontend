import style from './headerMovile.module.css'
import { Link, NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'

const HeaderMovile = ({ pages }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { isAuthenticated, logOut } = useContext(AuthContext)

    return (
        <div className={style.mobileContainer}>
            <div className={style.topnav}>
                <NavLink to={'/'} className={style.title}>
                    <span>Power</span>
                    <span>Log</span>
                </NavLink>
                <div
                    style={{ display: `${isOpen ? 'block' : 'none'}` }}
                    className={style.links}
                >
                    {pages.map(({ url, title }, index) => (
                        <button key={index}>
                            <NavLink
                                to={url}
                                className={({ isActive }) =>
                                    isActive ? style.active : ''
                                }
                            >
                                {title}
                            </NavLink>
                        </button>
                    ))}
                    {!isAuthenticated ? (
                        <button onClick={() => logOut()}>
                            <Link to={'/login'}> Identificarse </Link>
                        </button>
                    ) : (
                        <button onClick={() => logOut()}>
                            <a>Cerrar sesision</a>
                        </button>
                    )}
                </div>
                <a onClick={() => setIsOpen(!isOpen)} className={style.icon}>
                    <div> X </div>
                </a>
            </div>
        </div>
    )
}

export default HeaderMovile
