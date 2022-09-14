import { NavLink } from 'react-router-dom'
import { PUBLIC_PAGES, PRIVATE_PAGES } from '../../constant/pagesNavbar'

const PagesLinks = ({ style, isAuth }) => {
    const PAGES = isAuth ? PUBLIC_PAGES.concat(PRIVATE_PAGES) : PUBLIC_PAGES

    return (
        <div className={style.links}>
            {PAGES.map(({ url, title }, index) => (
                <NavLink
                    key={index}
                    to={url}
                    className={({ isActive }) => (isActive ? style.active : '')}
                >
                    {title}
                </NavLink>
            ))}
        </div>
    )
}

export default PagesLinks
