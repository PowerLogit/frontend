import style from './HeaderMovile.module.css'
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

    const iconButton = !isOpen ? ListIcon : CrossIcon

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
        <div className={style.wrapper}>
            <div className={style.header}>
                <NavLink to={'/'}>
                    <span>Power</span>
                    <span>Log</span>
                </NavLink>
                <IconButton
                    icon={iconButton}
                    className={style.icon}
                    kind='pink'
                    onClick={() => setIsOpen(!isOpen)}
                />
            </div>

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
                        <Link to={'/authenticate'}> Identificarse </Link>
                    </button>
                ) : (
                    <button onClick={() => logOut()}>
                        <a>Cerrar sesision</a>
                    </button>
                )}
            </div>
        </div>
    )
}

export default HeaderMovile
