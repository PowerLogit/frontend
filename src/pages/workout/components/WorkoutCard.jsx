import IconButton from '@ui/components/buttons/IconButton'
import PencilIcon from '@ui/svg/PencilIcon'
import TrashIcon from '@ui/svg/TrashIcon'
import style from './WorkoutCard.module.css'

const WorkoutCard = ({ workout, setEditForm, setDelteForm }) => {
    const { id, name, sets, reps, weight, date } = workout

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
                    onClick={() =>
                        setEditForm({ id, name, sets, reps, weight, date })
                    }
                />
                <IconButton
                    icon={TrashIcon}
                    className={style.button}
                    kind='red'
                    onClick={() =>
                        setDelteForm({ id, name, sets, reps, weight })
                    }
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
