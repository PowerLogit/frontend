import { useTranslation } from 'react-i18next'

import CardCoach from './CardCoach'

const CoachesRow = ({ data, isLoading, error, toogleData }) => {
    const { t } = useTranslation()

    if (error) {
        return <p className='dark:text-white'>{t('coaches.noCoaches')}</p>
    } else if (isLoading) {
        return <p className='dark:text-white'>{t('coaches.loading')}</p>
    } else if (!data.length) {
        return <p className='dark:text-white'>{t('coaches.noCoaches')}</p>
    }

    return (
        <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6'>
            {data.map((coach) => (
                <CardCoach
                    key={coach.id}
                    coach={coach}
                    toogleData={toogleData}
                />
            ))}
        </div>
    )
}

export default CoachesRow
