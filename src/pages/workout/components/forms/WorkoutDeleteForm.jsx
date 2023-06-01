import { useContext, useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import TrashIcon from '../../../../components/ui/svg/TrashIcon'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import { deleteWorkoutAthleteService } from '../../libs/services/workoutAthlete.service'
import { normalizeDateUTC } from '../../../../helpers/normaliceDate'

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
    workoutId,
    setIsSubmitting,
    onSuccess,
    closeModal
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const res = await deleteWorkoutAthleteService(workoutId)

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
