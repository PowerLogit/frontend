import style from './Header.module.css'
import HeaderMovile from './HeaderMovile'
import HeaderDesktop from './HeaderDesktop'
import { useEffect, useState } from 'react'
import useWindowSize from '../../hooks/useWindowSize'

const Header = () => {
    const { width } = useWindowSize()
    const [isDesktop, setIsDesktop] = useState(width > 768)

    const renderHeader = isDesktop ? <HeaderDesktop /> : <HeaderMovile />

    useEffect(() => {
        setIsDesktop(width > 768)
    }, [width])

    return <div className={style.header}>{renderHeader}</div>
}

export default Header
