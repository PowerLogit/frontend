import IconButton from '@ui/components/buttons/IconButton'
import PencilIcon from '@ui/svg/PencilIcon'
import TrashIcon from '@ui/svg/TrashIcon'
import { normalizeDateUTC } from '../libs/functions/normaliceDate'
import style from './WorkoutCard.module.css'

const WorkoutCard = ({ workout, setEditForm, setDelteForm }) => {
    const { name, sets, reps, weight, date } = workout

    return (
        <div className={style.wrapper}>
            <div>
                <p>
                    {name}: {sets}x{reps}x{weight} Kg
                </p>
                <p>{normalizeDateUTC(date)}</p>
            </div>
            <div>
                <IconButton
                    icon={PencilIcon}
                    className={style.button}
                    onClick={() => setEditForm(workout)}
                />
                <IconButton
                    icon={TrashIcon}
                    className={style.button}
                    kind='red'
                    onClick={() => setDelteForm(workout)}
                />
            </div>
        </div>
    )
}

export default WorkoutCard
