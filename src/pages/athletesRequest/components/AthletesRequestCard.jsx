import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '../../../components/ui/components/buttons/Button'
import useAvatar from '../../../hooks/useAvatar'

const AthletesRequestCard = ({ athlete, onSuccess, handlers }) => {
    const { t } = useTranslation()
    const { avatar, avatarAlt } = useAvatar(athlete)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleAccept = async () =>
        handlers.handleAccept(athlete.id, setIsSubmitting, onSuccess, t)

    const onHandleReject = async () =>
        handlers.handleReject(athlete.id, setIsSubmitting, onSuccess, t)

    return (
        <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center p-10'>
                <img
                    className='w-24 h-24 mb-3 rounded-full shadow-lg'
                    src={'/default.png'}
                    alt={avatarAlt}
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                    {athlete.name} {athlete.surname}
                </h5>
                <h5 className='mb-4 text-md text-gray-900 dark:text-white'>
                    @{athlete.username}
                </h5>
                <div className='flex gap-4'>
                    <Button
                        kind='danger'
                        loading={isSubmitting}
                        onClick={onHandleReject}
                    >
                        {t('athletesRequest.card.decline')}
                    </Button>
                    <Button
                        kind='success'
                        loading={isSubmitting}
                        onClick={onHandleAccept}
                    >
                        {t('athletesRequest.card.accept')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AthletesRequestCard
