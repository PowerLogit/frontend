import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import athletesRequestEN from '../pages/athletesRequest/libs/i18n/en.json'
import athletesRequestES from '../pages/athletesRequest/libs/i18n/es.json'
import authEN from '../pages/auth/libs/i18n/en.json'
import authES from '../pages/auth/libs/i18n/es.json'
import calcEN from '../pages/calculate/libs/i18n/en.json'
import calcES from '../pages/calculate/libs/i18n/es.json'
import homeEN from '../pages/home/i18n/en.json'
import homeES from '../pages/home/i18n/es.json'
import footerEN from './footer/en.json'
import footerES from './footer/es.json'
import headerEN from './header/en.json'
import headerES from './header/es.json'

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
            },
        },
    },
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
