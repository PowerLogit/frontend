import { useContext } from 'react'
import IconButton from '../../../components/ui/components/buttons/IconButton'
import PencilIcon from '../../../components/ui/svg/PencilIcon'
import TrashIcon from '../../../components/ui/svg/TrashIcon'
import { WorkoutContext } from '../libs/context/Workout.context'
import style from './WorkoutCard.module.css'

const WorkoutCard = ({ workout }) => {
    const { id, name, sets, reps, weight, date } = workout
    const { deleteWorkouts } = useContext(WorkoutContext)

    return (
        <div className={style.wrapper}>
            <div>
                <p>
                    {name}: {sets}x{reps}x{weight} Kg
                </p>
                <p>{normalizeDate(date)}</p>
            </div>
            <div>
                <IconButton
                    icon={PencilIcon}
                    className={style.button}
                    onClick={() => console.log(id)}
                />
                <IconButton
                    icon={TrashIcon}
                    className={style.button}
                    kind='red'
                    onClick={() => deleteWorkouts(id)}
                />
            </div>
        </div>
    )
}

const normalizeDate = (date) => {
    const newDate = new Date(date).toLocaleString('es-ES', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    return newDate.charAt(0).toUpperCase() + newDate.slice(1)
}

export default WorkoutCard
