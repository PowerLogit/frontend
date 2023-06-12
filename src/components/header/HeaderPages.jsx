import { useAuthContext } from '@auth/libs/context/auth.context'

import {
    headerPagesAthlete,
    headerPagesCoach,
    headerPagesPublic,
} from '../../constant/headerPages'
import NavLinkTo from '../ui/components/navigation/NavLinkTo'

const HeaderPages = () => {
    const { isAuthenticated, user } = useAuthContext()

    const hasCoach = user?.coach
    const isAthlete = user?.role?.find((role) => role === 'athlete')
    const isCoach = user?.role?.find((role) => role === 'coach')

    return (
        <>
            {!isAuthenticated &&
                headerPagesPublic.map(({ title, url }) => (
                    <li key={url}>
                        <NavLinkTo url={url} title={title} />
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
                            <NavLinkTo url={url} title={title} />
                        </li>
                    )
                })}
            {isCoach &&
                headerPagesCoach.map(({ title, url }) => (
                    <li key={url}>
                        <NavLinkTo url={url} title={title} />
                    </li>
                ))}
        </>
    )
}

export default HeaderPages
