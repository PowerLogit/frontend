import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import AthletesRequestCard from './AthletesRequestCard'

const AthletesRequestRow = ({
    data,
    isLoading,
    error,
    onSuccess,
    handlers,
}) => {
    const { t } = useTranslation()

    if (error) {
        toast.error(t('athletesRequest.error'))
        return (
            <p className='dark:text-white'>{t('athletesRequest.noAthletes')}</p>
        )
    } else if (isLoading) {
        return <p className='dark:text-white'>{t('athletesRequest.loading')}</p>
    } else if (!data.length) {
        return (
            <p className='dark:text-white'>{t('athletesRequest.noAthletes')}</p>
        )
    }

    return (
        <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6'>
            {data.map((athlete) => (
                <AthletesRequestCard
                    key={athlete.id}
                    athlete={athlete}
                    onSuccess={onSuccess}
                    handlers={handlers}
                />
            ))}
        </div>
    )
}

export default AthletesRequestRow
