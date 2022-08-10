import style from './headerMovile.module.css'
import { Link, NavLink } from 'react-router-dom'
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import IconButton from '../ui/components/buttons/IconButton'
import ListIcon from '../ui/svg/ListIcon'
import CrossIcon from '../ui/svg/CrossIcon'

const HeaderMovile = ({ pages }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { isAuthenticated, logOut } = useContext(AuthContext)
    const refClassName = useRef(style.links)

    useEffect(() => {
        const links = document.querySelectorAll(`.${refClassName.current}`)
        links.forEach((link) => {
            link.addEventListener('click', () => setIsOpen(false))
        })

        return () => {
            links.forEach((link) => {
                link.removeEventListener('click', () => setIsOpen(false))
            })
        }
    }, [isOpen])

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
                        <button>
                            <Link to={'/login'}> Identificarse </Link>
                        </button>
                    ) : (
                        <button onClick={() => logOut()}>
                            <a>Cerrar sesision</a>
                        </button>
                    )}
                </div>
                {!isOpen ? (
                    <IconButton
                        icon={ListIcon}
                        className={style.icon}
                        kind='red'
                        onClick={() => setIsOpen(!isOpen)}
                    />
                ) : (
                    <IconButton
                        icon={CrossIcon}
                        className={style.icon}
                        kind='red'
                        onClick={() => setIsOpen(!isOpen)}
                    />
                )}
                {/*
                    <a onClick={() => setIsOpen(!isOpen)} className={style.icon}>
                        <div> X </div>
                    </a>
                */}
            </div>
        </div>
    )
}

export default HeaderMovile
