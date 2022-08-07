import style from './header.module.css'
import HeaderMovile from './HeaderMovile'
import HeaderDesktop from './HeaderDesktop'
import { useEffect, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'

const pages = [
    { title: 'Workout', url: '/workout' },
    { title: 'Calculadora', url: '/calc' },
    { title: 'Aproximaciones', url: '/aprox' },
]

const Header = () => {
    const { width } = useWindowSize()
    const [isMovile, setIsMovile] = useState(width <= 768)

    useEffect(() => {
        setIsMovile(width <= 768)
    }, [width])

    return (
        <div className={style.header}>
            {isMovile ? (
                <HeaderMovile pages={pages} />
            ) : (
                <HeaderDesktop pages={pages} />
            )}
        </div>
    )
}

export default Header
