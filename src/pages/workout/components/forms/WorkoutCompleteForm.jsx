import { useContext, useState } from 'react'

import Button from '../../../../components/ui/components/buttons/Button'
import AlertIcon from '../../../../components/ui/svg/AlertIcon'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import { editWorkoutService } from '../../libs/services/workout.service'

const WorkoutCompleteForm = ({ currentWorkout, closeModal }) => {
    const { onSuccess } = useContext(WorkoutFormsContext)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = (isSuccessful) =>
        handleSubmit(
            currentWorkout.id,
            isSuccessful,
            setIsSubmitting,
            onSuccess,
            closeModal
        )

    return (
        <div className='p-5 text-center'>
            <AlertIcon className='mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Has completado de forma exitosa el workout ?
            </h3>
            <Button
                kind='normal'
                className='mr-2'
                onClick={() => onHandleSubmit(true)}
            >
                {isSubmitting ? 'Completando...' : 'Si, exitoso'}
            </Button>
            <Button kind='danger' onClick={() => onHandleSubmit(false)}>
                {isSubmitting ? 'Completando...' : 'No, fallido'}
            </Button>
        </div>
    )
}

const handleSubmit = async (
    idWorkout,
    isSuccessful,
    setIsSubmitting,
    onSuccess,
    closeModal
) => {
    setIsSubmitting(true)

    const updateWorkout = {
        id: idWorkout,
        isCompleted: true,
        isSuccessful,
    }

    const res = await editWorkoutService(updateWorkout)

    if (res.status !== 204) {
        setIsSubmitting(false)
    }

    onSuccess()
    closeModal()
}

export default WorkoutCompleteForm
