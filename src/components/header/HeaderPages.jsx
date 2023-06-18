import { useAuthContext } from '@auth/libs/context/auth.context'

import {
    headerPagesAthlete,
    headerPagesCoach,
    headerPagesPublic,
} from '../../constant/headerPages'
import NavLinkTo from '../ui/components/navigation/NavLinkTo'
import { useTranslation } from 'react-i18next'

const HeaderPages = () => {
    const { t } = useTranslation()

    const { isAuthenticated, user } = useAuthContext()

    const hasCoach = user?.coach
    const isAthlete = user?.role?.find((role) => role === 'athlete')
    const isCoach = user?.role?.find((role) => role === 'coach')

    return (
        <>
            {!isAuthenticated &&
                headerPagesPublic.map(({ title, url }) => (
                    <li key={url}>
                        <NavLinkTo url={url} title={t(title)} />
                    </li>
                ))}
            {isAthlete &&
                headerPagesAthlete.map(({ title, url }) => {
                    if (
                        (hasCoach && url === '/coaches') ||
                        (!hasCoach && url === '/coach')
                    )
                        return null

                    return (
                        <li key={url}>
                            <NavLinkTo url={url} title={t(title)} />
                        </li>
                    )
                })}
            {isCoach &&
                headerPagesCoach.map(({ title, url }) => (
                    <li key={url}>
                        <NavLinkTo url={url} title={t(title)} />
                    </li>
                ))}
        </>
    )
}

export default HeaderPages
