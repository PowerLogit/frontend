const PageSelector = ({ page, setPage, totalPages }) => {
    const isFirstPage = page === 1
    const isLastPage = page === totalPages || totalPages === 0

    return (
        <div className='flex flex-col items-center'>
            <span className='text-sm text-gray-700 dark:text-gray-400'>
                {'Página '}
                <span className='font-semibold text-gray-900 dark:text-white'>
                    {page}
                </span>
                {' de '}
                <span className='font-semibold text-gray-900 dark:text-white'>
                    {totalPages || 1}
                </span>
            </span>
            <div className='inline-flex mt-2 xs:mt-0'>
                <button
                    disabled={isFirstPage}
                    onClick={() => setPage(page - 1)}
                    className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                    <svg
                        aria-hidden='true'
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                            clipRule='evenodd'
                        ></path>
                    </svg>
                    <span className='pl-2'>Anterior</span>
                </button>
                <button
                    disabled={isLastPage}
                    onClick={() => setPage(page + 1)}
                    className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                >
                    <span className='pr-2'>Siguiente</span>
                    <svg
                        aria-hidden='true'
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            fillRule='evenodd'
                            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                            clipRule='evenodd'
                        ></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default PageSelector

/**
 * <div className={style.wrapper}>
            <IconButton
                filled
                disabled={isFirstPage}
                icon={ArrowLeftIcon}
                onClick={() => setPage(page - 1)}
            />
            <span>
                Página {page} de {totalPages || 1}
            </span>
            <IconButton
                filled
                disabled={isLastPage}
                icon={ArrowRightIcon}
                onClick={() => setPage(page + 1)}
            />
        </div>
 */
