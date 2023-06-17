import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

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
            },
        },
        en: {
            translation: {
                header: headerEN,
                footer: footerEN,
                home: homeEN,
            },
        },
    },
    interpolation: {
        escapeValue: false,
    },
})

export default i18n
