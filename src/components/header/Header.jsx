import { useAuthContext } from '@auth/libs/context/auth.context'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeBearer } from '../../helpers/bearer.helper'
import useWindowSize from '../../hooks/useWindowSize'
import { setIsNotAuth } from '../../pages/auth/libs/actions/auth.action'
import style from './Header.module.css'
import HeaderDesktop from './desktop/HeaderDesktop'
import HeaderMovile from './movile/HeaderMovile'

const Header = () => {
    const { width } = useWindowSize()
    const { dispatchAuth } = useAuthContext()
    const navigate = useNavigate()

    const [isDesktop, setIsDesktop] = useState(width > 768)

    const handleLogOut = () => {
        removeBearer()
        dispatchAuth(setIsNotAuth())
        navigate('/')
    }

    const renderHeader = isDesktop ? (
        <HeaderDesktop handleLogOut={handleLogOut} />
    ) : (
        <HeaderMovile handleLogOut={handleLogOut} />
    )

    useEffect(() => {
        setIsDesktop(width > 768)
    }, [width])

    return <div className={style.header}>{renderHeader}</div>
}

export default Header
