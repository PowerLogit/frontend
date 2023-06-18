import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import Button from '../../../components/ui/components/buttons/Button'
import useAvatar from '../../../hooks/useAvatar'
import {
    cancelRequestToCoach,
    sendRequestToCoach,
} from '../libs/services/athlete.service'
import { getRoleFormat } from '../../../helpers/roleFormat'

const CardCoach = ({ coach, toogleData }) => {
    const { t, i18n } = useTranslation()

    const { name, surname, username, role, hasRequest } = coach

    const { avatar, avatarAlt } = useAvatar(coach)

    const roleFormat = getRoleFormat(role, i18n.language)

    const onHandleSendRequest = async () =>
        handleSendRequest(coach.id, toogleData, t)
    const onHandleCancelRequest = async () =>
        handleCancelRequest(coach.id, toogleData, t)

    return (
        <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center p-10'>
                <img
                    className='w-24 h-24 mb-3 rounded-full shadow-lg'
                    src={avatar}
                    alt={avatarAlt}
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                    {name} {surname}
                </h5>
                <h5 className='mb-1 text-md text-gray-900 dark:text-white'>
                    @{username}
                </h5>
                <span className='mb-4 text-sm text-center text-gray-500 dark:text-gray-400'>
                    {roleFormat}
                </span>
                {hasRequest ? (
                    <Button kind='outline' onClick={onHandleCancelRequest}>
                        {t('coaches.card.cancel')}
                    </Button>
                ) : (
                    <Button onClick={onHandleSendRequest}>
                        {t('coaches.card.send')}
                    </Button>
                )}
            </div>
        </div>
    )
}

const handleSendRequest = async (idCoach, toogleData, t) => {
    const { status } = await sendRequestToCoach(idCoach)

    if (status === 201) {
        toast.success(t('coaches.toast.send.success'))
        toogleData(idCoach)
    } else {
        toast.error(t('coaches.toast.send.success'))
    }
}

const handleCancelRequest = async (idCoach, toogleData, t) => {
    const { status } = await cancelRequestToCoach(idCoach)

    if (status === 204) {
        toast.success(t('coaches.toast.cancel.success'))
        toogleData(idCoach)
    } else {
        toast.error(t('coaches.toast.cancel.success'))
    }
}

export default CardCoach
