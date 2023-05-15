import { useContext, useState } from 'react'

import Button from '../../../../components/ui/components/buttons/Button'
import TrashIcon from '../../../../components/ui/svg/TrashIcon'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import { normalizeDateUTC } from '../../libs/functions/normaliceDate'
import { deleteWorkoutService } from '../../libs/services/workout.service'

const WorkoutDeleteForm = ({ currentWorkout, closeModal }) => {
    const { onSuccess } = useContext(WorkoutFormsContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { id, name, sets, reps, weight, date } = currentWorkout

    return (
        <form
            className='p-5 text-center'
            onSubmit={(ev) =>
                handleSubmit(ev, id, setIsSubmitting, onSuccess, closeModal)
            }
        >
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
                    disabled={isSubmitting}
                    onClick={closeModal}
                >
                    {isSubmitting ? 'Cargando...' : 'Cancelar'}
                </Button>
                <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Cargando...' : 'Eliminar'}
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
    closeModal
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const res = await deleteWorkoutService(workoutId)

    if (res.status !== 204) {
        setIsSubmitting(false)
    }

    onSuccess()
    closeModal()
}

export default WorkoutDeleteForm
