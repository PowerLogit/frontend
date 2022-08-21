import IconButton from '@ui/components/buttons/IconButton'
import CrossIcon from '@ui/svg/CrossIcon'
import { useContext } from 'react'
import { WORKOUT_FORM } from '../../libs/constant/workoutForm'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import WorkoutCreateForm from './WorkoutCreateForm'
import WorkoutDeleteForm from './WorkoutDeleteForm'
import WorkoutEditForm from './WorkoutEditForm'
import style from './WorkoutFormContainer.module.css'

const WorkoutFormContainer = () => {
    const { currentForm, setFiltersForm } = useContext(WorkoutFormsContext)

    const renderForm = FORMS[currentForm]

    if (!renderForm) return null

    return (
        <div className={style.wrapper}>
            <IconButton
                icon={CrossIcon}
                filled
                onClick={setFiltersForm}
                className={style.close}
            />
            {renderForm}
        </div>
    )
}

const FORMS = {
    [WORKOUT_FORM.CREATE]: <WorkoutCreateForm />,
    [WORKOUT_FORM.EDIT]: <WorkoutEditForm />,
    [WORKOUT_FORM.DELETE]: <WorkoutDeleteForm />,
}

export default WorkoutFormContainer
