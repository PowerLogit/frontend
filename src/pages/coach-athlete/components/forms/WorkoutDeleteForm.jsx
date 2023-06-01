import { useContext, useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import TrashIcon from '../../../../components/ui/svg/TrashIcon'
import { normalizeDateUTC } from '../../../../helpers/normaliceDate'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import { deleteWorkoutCoachAthleteService } from '../../libs/services/workoutCoach.service'

const WorkoutDeleteForm = ({ currentWorkout, closeModal }) => {
    const { onSuccess } = useContext(WorkoutFormsContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { name, sets, reps, weight, date } = currentWorkout

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, currentWorkout, setIsSubmitting, onSuccess, closeModal)

    return (
        <form className='p-5 text-center' onSubmit={onHandleSubmit}>
            <TrashIcon
                className={
                    'text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
                }
            />
            <p className='mb-1 text-gray-500 dark:text-gray-300'>
                Estas seguro que quieres elimar el workout:
            </p>
            <p className='mb-6 text-gray-500 dark:text-gray-300'>
                {name}: {sets}x{reps}x{weight} Kg - {normalizeDateUTC(date)}
            </p>
            <div className='flex justify-center items-center gap-4'>
                <Button
                    kind='outline'
                    loading={isSubmitting}
                    onClick={closeModal}
                >
                    Cancelar
                </Button>
                <Button
                    type='submit'
                    kind='danger'
                    icon={TrashIcon}
                    loading={isSubmitting}
                >
                    Eliminar
                </Button>
            </div>
        </form>
    )
}

const handleSubmit = async (
    ev,
    workout,
    setIsSubmitting,
    onSuccess,
    closeModal
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const res = await deleteWorkoutCoachAthleteService(
        workout.id,
        workout.athlete
    )

    if (res.status === 204) {
        onSuccess()
        closeModal()
        toast.success('¡Entrenamiento eliminado exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al eliminar el entrenamiento. Por favor, inténtalo de nuevo'
        )
    }

    setIsSubmitting(false)
}

export default WorkoutDeleteForm
