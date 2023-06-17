import { useTranslation } from 'react-i18next'

import AthletesListCard from './AthletesListCard'

const AthletesListRow = ({ data, isLoading, error }) => {
    const { t } = useTranslation()

    if (error) {
        return <p className='dark:text-white'>{t('athletes.noAthletes')}</p>
    } else if (isLoading) {
        return <p className='dark:text-white'>{t('athletes.loading')}</p>
    } else if (!data.length) {
        return <p className='dark:text-white'>{t('athletes.noAthletes')}</p>
    }

    return (
        <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6'>
            {data.map((athlete) => (
                <AthletesListCard key={athlete.id} athlete={athlete} />
            ))}
        </div>
    )
}

export default AthletesListRow
