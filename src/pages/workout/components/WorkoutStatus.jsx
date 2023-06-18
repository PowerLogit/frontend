import { useTranslation } from 'react-i18next'

const WorkoutStatus = ({ isCompleted, isSuccessful }) => {
    const { t } = useTranslation()

    const statusKey = getStatusKey(isCompleted, isSuccessful)
    const { color, text } = statusMap[statusKey]

    return (
        <span className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
            <div className={`h-2.5 w-2.5 rounded-full ${color} mr-2`}></div>
            {t(text)}
        </span>
    )
}

const getStatusKey = (isCompleted, isSuccessful) => {
    if (!isCompleted) return 'pending'
    else if (isCompleted && isSuccessful) return 'completed'
    else if (isCompleted && !isSuccessful) return 'failed'
    else return 'default'
}

const statusMap = {
    pending: {
        color: 'bg-yellow-500',
        text: 'workouts.card.status.pending',
    },
    completed: {
        color: 'bg-green-500',
        text: 'workouts.card.status.completed',
    },
    failed: {
        color: 'bg-red-500',
        text: 'workouts.card.status.failed',
    },
    default: {
        color: 'bg-gray-500',
        text: 'workouts.card.status.default',
    },
}

export default WorkoutStatus
