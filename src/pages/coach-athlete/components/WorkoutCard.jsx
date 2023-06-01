import { normalizeDateUTC } from '../../../helpers/normaliceDate'
import WorkoutActions from './WorkoutActions'
import WorkoutStatus from './WorkoutStatus'

const WorkoutCard = ({ workout }) => {
    const { name, sets, reps, weight, date, isCompleted, isSuccessful } =
        workout

    return (
        <>
            <div className='w-full p-5 max-w-sm flex justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
                <div className='flex flex-col '>
                    <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                        {name}: {sets}x{reps}x{weight} Kg
                    </h5>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                        {normalizeDateUTC(date)}
                    </span>
                    <WorkoutStatus
                        isCompleted={isCompleted}
                        isSuccessful={isSuccessful}
                    />
                </div>
                <div>
                    <WorkoutActions workout={workout} />
                </div>
            </div>
        </>
    )
}

export default WorkoutCard
