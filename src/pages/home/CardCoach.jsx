const CardCoach = ({ name, description }) => {
    return (
        <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center p-10'>
                <img
                    className='w-24 h-24 mb-3 rounded-full shadow-lg'
                    src='https://cdn-icons-png.flaticon.com/512/6073/6073873.png'
                    alt={name + ' image'}
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                    {name}
                </h5>
                <span className='text-sm text-center text-gray-500 dark:text-gray-400'>
                    {description}
                </span>
            </div>
        </div>
    )
}

export default CardCoach
