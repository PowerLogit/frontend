import { useTranslation } from 'react-i18next'
import useTheme from '../hooks/useTheme'
import Button from './ui/components/buttons/Button'

const Footer = () => {
    const { theme, toggleTheme } = useTheme()
    const { t, i18n } = useTranslation()

    const themeText = theme === 'dark' ? t('footer.light') : t('footer.dark')

    return (
        <footer className='mt-auto mx-auto w-full max-w-screen-xl bg-white sm:flex sm:items-center sm:justify-between py-5 px-5 xl:px-0 dark:bg-gray-900'>
            <Button kind='normal' onClick={() => toggleTheme()}>
                {t('footer.themeMode', { theme: themeText })}
            </Button>
            <p className='mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0'>
                &copy; 2023 PowerLog.es - {t('footer.allRightsReserved')}
            </p>
            <div className='flex gap-2'>
                {Object.keys(lngs).map((lng) => (
                    <button
                        key={lng}
                        style={{
                            fontWeight:
                                i18n.resolvedLanguage === lng
                                    ? 'bold'
                                    : 'normal',
                        }}
                        type='submit'
                        onClick={() => i18n.changeLanguage(lng)}
                    >
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
        </footer>
    )
}

const lngs = {
    es: { nativeName: 'Español' },
    en: { nativeName: 'English' },
}

export default Footer
