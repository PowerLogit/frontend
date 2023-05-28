import { useAuthContext } from '@auth/libs/context/auth.context'

import {
    headerPagesAthlete,
    headerPagesCoach,
    headerPagesPublic,
} from '../../constant/headerPages'
import NavLinkTo from '../ui/components/navigation/NavLinkTo'

const HeaderPages = () => {
    const { isAuthenticated, user } = useAuthContext()

    const isAthlete = user?.role?.find((role) => role === 'athlete')
    const isCoach = user?.role?.find((role) => role === 'coach')

    return (
        <>
            {!isAuthenticated &&
                headerPagesPublic.map(({ title, url }, index) => (
                    <li key={index}>
                        <NavLinkTo url={url} title={title} />
                    </li>
                ))}
            {isAthlete &&
                headerPagesAthlete.map(({ title, url }, index) => (
                    <li key={index}>
                        <NavLinkTo url={url} title={title} />
                    </li>
                ))}
            {isCoach &&
                headerPagesCoach.map(({ title, url }, index) => (
                    <li key={index}>
                        <NavLinkTo url={url} title={title} />
                    </li>
                ))}
        </>
    )
}

export default HeaderPages
