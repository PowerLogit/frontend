import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import TrashIcon from '../../../../components/ui/svg/TrashIcon'
import { normalizeDateUTC } from '../../../../helpers/normaliceDate'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import { deleteWorkoutAthleteService } from '../../libs/services/workoutAthlete.service'

const WorkoutDeleteForm = ({ currentWorkout, closeModal }) => {
    const { t, i18n } = useTranslation()
    const { onSuccess } = useContext(WorkoutFormsContext)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { id, name, sets, reps, weight, date } = currentWorkout
    const dateFormat = normalizeDateUTC(date, i18n.language)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, id, setIsSubmitting, onSuccess, closeModal, t)

    return (
        <form className='p-5 text-center' onSubmit={onHandleSubmit}>
            <TrashIcon
                className={
                    'text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
                }
            />
            <p className='mb-1 text-gray-500 dark:text-gray-300'>
                {t('workouts.modal.delete.description')}
            </p>
            <p className='mb-6 text-gray-500 dark:text-gray-300'>
                {name}: {sets}x{reps}x{weight} Kg - {dateFormat}
            </p>
            <div className='flex justify-center items-center gap-4'>
                <Button
                    kind='outline'
                    loading={isSubmitting}
                    onClick={closeModal}
                >
                    {t('workouts.modal.delete.buttons.cancel')}
                </Button>
                <Button
                    type='submit'
                    kind='danger'
                    icon={TrashIcon}
                    loading={isSubmitting}
                >
                    {t('workouts.modal.delete.buttons.delete')}
                </Button>
            </div>
        </form>
    )
}

const handleSubmit = async (
    ev,
    workoutId,
    setIsSubmitting,
    onSuccess,
    closeModal,
    t
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const res = await deleteWorkoutAthleteService(workoutId)

    if (res.status === 204) {
        onSuccess()
        closeModal()
        toast.success(t('workouts.modal.delete.toast.success'))
    } else {
        toast.error(t('workouts.modal.delete.toast.error'))
    }

    setIsSubmitting(false)
}

export default WorkoutDeleteForm
