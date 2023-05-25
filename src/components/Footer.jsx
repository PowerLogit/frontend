import useTheme from '../hooks/useTheme'
import Button from './ui/components/buttons/Button'

const Footer = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <footer className='mt-auto mx-auto w-full max-w-screen-xl bg-white sm:flex sm:items-center sm:justify-between py-5 px-5 xl:px-0 dark:bg-gray-900'>
            <p className='mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0'>
                &copy; 2023 PowerLog.es - Reservados todos los derechos.
            </p>
            <Button kind='normal' onClick={() => toggleTheme()}>
                Modo {theme === 'dark' ? 'Claro' : 'Oscuro'}
            </Button>
        </footer>
    )
}

export default Footer
