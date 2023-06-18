import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import WorkoutCard from './WorkoutCard'

const WorkoutRows = ({ workouts, loading, error }) => {
    const { t } = useTranslation()

    if (error) {
        toast.error(t('workouts.rows.error'))
        return (
            <p className='dark:text-white'>{t('workouts.rows.noWorkouts')}</p>
        )
    } else if (loading) {
        return <p className='dark:text-white'>{t('workouts.rows.loading')}</p>
    } else if (!workouts.length) {
        return (
            <p className='dark:text-white'>{t('workouts.rows.noWorkouts')}</p>
        )
    }

    return (
        <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-4'>
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
    )
}

export default WorkoutRows
