import { useTranslation } from 'react-i18next'

const CardStatistic = ({ name, weight }) => {
    const { t } = useTranslation()

    return (
        <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                {name}
            </h5>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
                {t('home.personalBest')}: {weight} kg
            </p>
        </div>
    )
}

export default CardStatistic
