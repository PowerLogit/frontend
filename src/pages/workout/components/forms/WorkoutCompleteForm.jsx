import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import AlertIcon from '../../../../components/ui/svg/AlertIcon'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import { editWorkoutAthleteService } from '../../libs/services/workoutAthlete.service'

const WorkoutCompleteForm = ({ currentWorkout, closeModal }) => {
    const { t } = useTranslation()
    const { onSuccess } = useContext(WorkoutFormsContext)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (isSuccessful) =>
        handleSubmit(
            currentWorkout.id,
            isSuccessful,
            setIsSubmitting,
            onSuccess,
            closeModal,
            t
        )

    return (
        <div className='p-5 text-center'>
            <AlertIcon className='mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                {t('workouts.modal.complete.description')}
            </h3>
            <Button
                kind='normal'
                className='mr-2'
                loading={isSubmitting}
                onClick={() => onHandleSubmit(true)}
            >
                {t('workouts.modal.complete.buttons.success')}
            </Button>
            <Button
                kind='danger'
                loading={isSubmitting}
                onClick={() => onHandleSubmit(false)}
            >
                {t('workouts.modal.complete.buttons.fail')}
            </Button>
        </div>
    )
}

const handleSubmit = async (
    idWorkout,
    isSuccessful,
    setIsSubmitting,
    onSuccess,
    closeModal,
    t
) => {
    setIsSubmitting(true)

    const updateWorkout = {
        id: idWorkout,
        isCompleted: true,
        isSuccessful,
    }

    const res = await editWorkoutAthleteService(updateWorkout)

    if (res.status === 204) {
        onSuccess()
        closeModal()
        toast.success(t('workouts.modal.complete.toast.success'))
    } else {
        toast.error(t('workouts.modal.complete.toast.error'))
    }
}

export default WorkoutCompleteForm
