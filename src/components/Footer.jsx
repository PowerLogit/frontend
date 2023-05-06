import useTheme from '../hooks/useTheme'

const Footer = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <footer className='mt-auto container mx-auto bg-white sm:flex sm:items-center sm:justify-between p-4 sm:p-6 xl:p-8 dark:bg-gray-900'>
            <p className='mb-4 text-sm text-center text-gray-500 dark:text-gray-400 sm:mb-0'>
                &copy; 2023 PowerLog.es - Reservados todos los derechos.
            </p>
            <button
                onClick={() => toggleTheme()}
                className='w-25 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            >
                Modo {theme === 'dark' ? 'Claro' : 'Oscuro'}
            </button>
        </footer>
    )
}

export default Footer
