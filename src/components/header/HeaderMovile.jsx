import { useAuthContext } from '@auth/libs/context/auth.context'
import { pages } from '@constant/pagesNavbar'
import IconButton from '@ui/components/buttons/IconButton'
import CrossIcon from '@ui/svg/CrossIcon'
import ListIcon from '@ui/svg/ListIcon'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import style from './HeaderMovile.module.css'

const HeaderMovile = ({ handleLogOut }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { isAuthenticated } = useAuthContext()
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
                    <button onClick={handleLogOut}>
                        <a>Cerrar sesision</a>
                    </button>
                )}
            </div>
        </div>
    )
}

export default HeaderMovile
