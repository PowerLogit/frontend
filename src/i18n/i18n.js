import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import athletesRequestEN from '../pages/athletesRequest/libs/i18n/en.json'
import athletesRequestES from '../pages/athletesRequest/libs/i18n/es.json'
import authEN from '../pages/auth/libs/i18n/en.json'
import authES from '../pages/auth/libs/i18n/es.json'
import calcEN from '../pages/calculate/libs/i18n/en.json'
import calcES from '../pages/calculate/libs/i18n/es.json'
import athletesEN from '../pages/coach-athletesList/libs/i18n/en.json'
import athletesES from '../pages/coach-athletesList/libs/i18n/es.json'
import homeEN from '../pages/home/i18n/en.json'
import homeES from '../pages/home/i18n/es.json'
import coachesEN from '../pages/list-coaches/libs/i18n/en.json'
import coachesES from '../pages/list-coaches/libs/i18n/es.json'
import myCoachEN from '../pages/my-coach/libs/i18n/en.json'
import myCoachES from '../pages/my-coach/libs/i18n/es.json'
import settingsEN from '../pages/settings/libs/i18n/en.json'
import settingsES from '../pages/settings/libs/i18n/es.json'
import workoutsEN from '../pages/workout/libs/i18n/en.json'
import workoutsES from '../pages/workout/libs/i18n/es.json'
import commonEN from './common/en.json'
import commonES from './common/es.json'
import footerEN from './footer/en.json'
import footerES from './footer/es.json'
import headerEN from './header/en.json'
import headerES from './header/es.json'
import paginationEN from './pagination/en.json'
import paginationES from './pagination/es.json'

i18n.use(initReactI18next).init({
    lng: 'es',
    fallbackLng: 'en',
    resources: {
        es: {
            translation: {
                header: headerES,
                footer: footerES,
                home: homeES,
                auth: authES,
                athletesRequest: athletesRequestES,
                calc: calcES,
                coaches: coachesES,
                athletes: athletesES,
                pagination: paginationES,
                myCoach: myCoachES,
                workouts: workoutsES,
                common: commonES,
                settings: settingsES,
            },
        },
        en: {
            translation: {
                header: headerEN,
                footer: footerEN,
                home: homeEN,
                auth: authEN,
                athletesRequest: athletesRequestEN,
                calc: calcEN,
                coaches: coachesEN,
                athletes: athletesEN,
                pagination: paginationEN,
                myCoach: myCoachEN,
                workouts: workoutsEN,
                common: commonEN,
                settings: settingsEN,
            },
        },
    },
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
