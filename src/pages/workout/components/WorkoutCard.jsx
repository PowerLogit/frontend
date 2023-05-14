import { Dropdown } from 'flowbite-react'
import { useContext } from 'react'

import PencilIcon from '../../../components/ui/svg/PencilIcon'
import ThreeDotsIcon from '../../../components/ui/svg/ThreeDotsIcon'
import TrashIcon from '../../../components/ui/svg/TrashIcon'
import { WorkoutFormsContext } from '../libs/context/WorkoutForms.context'
import { normalizeDateUTC } from '../libs/functions/normaliceDate'
import WorkoutStatus from './WorkoutStatus'

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
                <WorkoutStatus
                    isCompleted={isCompleted}
                    isSuccessful={isSuccessful}
                />
            </div>
            <div>
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<ThreeDotsIcon />}
                >
                    <Dropdown.Item
                        icon={PencilIcon}
                        onClick={() => setEditForm(workout)}
                    >
                        <span className='pl-2'>Editar</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                        icon={TrashIcon}
                        onClick={() => setDelteForm(workout)}
                    >
                        <span className='pl-2'>Eliminar</span>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    )
}

export default WorkoutCard
