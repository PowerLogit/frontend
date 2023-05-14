const WorkoutStatus = ({ isCompleted, isSuccessful }) => {
    const statusKey = getStatusKey(isCompleted, isSuccessful)
    const { color, text } = statusMap[statusKey]

    return (
        <span className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
            <div className={`h-2.5 w-2.5 rounded-full ${color} mr-2`}></div>
            {text}
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
        text: 'Pendiente',
    },
    completed: {
        color: 'bg-green-500',
        text: 'Completado',
    },
    failed: {
        color: 'bg-red-500',
        text: 'Fallido',
    },
    default: {
        color: 'bg-gray-500',
        text: '',
    },
}

export default WorkoutStatus
