import IconButton from '@ui/components/buttons/IconButton'
import PencilIcon from '@ui/svg/PencilIcon'
import TrashIcon from '@ui/svg/TrashIcon'
import { useContext } from 'react'

import { WorkoutFormsContext } from '../libs/context/WorkoutForms.context'
import { normalizeDateUTC } from '../libs/functions/normaliceDate'

const WorkoutCard = ({ workout }) => {
    const { setEditForm, setDelteForm } = useContext(WorkoutFormsContext)

    const { name, sets, reps, weight, date, isCompleted, isSuccessful } =
        workout

    return (
        <div className='w-full p-5 max-w-sm flex justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col '>
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                    {name}: {sets}x{reps}x{weight} Kg
                </h5>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {normalizeDateUTC(date)}
                </span>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {isCompleted ? 'Completado' : 'Pendiente'}
                    {isCompleted &&
                        (isSuccessful ? ' - Exitoso' : ' - Fallido')}
                </span>
            </div>
            <div>
                <IconButton
                    icon={PencilIcon}
                    className={''}
                    onClick={() => setEditForm(workout)}
                />
                <IconButton
                    icon={TrashIcon}
                    className={''}
                    kind='red'
                    onClick={() => setDelteForm(workout)}
                />
            </div>
        </div>
    )
}

export default WorkoutCard
