import IconButton from '@ui/components/buttons/IconButton'
import CrossIcon from '@ui/svg/CrossIcon'
import { useContext } from 'react'
import { WORKOUT_FORM } from '../../libs/constant/workoutForm'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import WorkoutCreateForm from './WorkoutCreateForm'
import WorkoutDeleteForm from './WorkoutDeleteForm'
import WorkoutEditForm from './WorkoutEditForm'

const WorkoutFormContainer = () => {
    const { currentForm, setFiltersForm } = useContext(WorkoutFormsContext)

    const renderForm = FORMS[currentForm]

    if (!renderForm) return null

    return (
        <div className='relative flex flex-col mb-6 rounded-md shadow-md'>
            <div className='absolute top-0 right-0 -mt-5 -mr-5 rounded-full bg-gray-700 shadow-md'>
                <IconButton icon={CrossIcon} filled onClick={setFiltersForm} />
            </div>
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
