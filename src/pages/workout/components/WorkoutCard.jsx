import IconButton from '../../../components/ui/components/buttons/IconButton'
import PencilIcon from '../../../components/ui/svg/PencilIcon'
import TrashIcon from '../../../components/ui/svg/TrashIcon'
import style from './WorkoutCard.module.css'

const WorkoutCard = ({ workout }) => {
    const { name, sets, reps, weight, date } = workout

    return (
        <div className={style.card}>
            <div>
                <p>
                    {name}: {sets}x{reps}x{weight} Kg
                </p>
                <p>{normalizeDate(date)}</p>
            </div>
            <div>
                <IconButton icon={PencilIcon} className={style.button} />
                <IconButton
                    icon={TrashIcon}
                    className={style.button}
                    kind='red'
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
