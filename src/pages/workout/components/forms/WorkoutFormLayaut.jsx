import IconButton from '@ui/components/buttons/IconButton'
import CrossIcon from '@ui/svg/CrossIcon'
import style from './WorkoutFormLayaut.module.css'

const WorkoutFormLayaut = ({ onClose, children }) => (
    <div className={style.wrapper}>
        <IconButton
            icon={CrossIcon}
            filled
            onClick={onClose}
            className={style.close}
        />
        {children}
    </div>
)

export default WorkoutFormLayaut
