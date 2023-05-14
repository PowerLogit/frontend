import { deleteWorkoutService } from '../../libs/services/workout.service'
import { useContext, useState } from 'react'
import { normalizeDateUTC } from '../../libs/functions/normaliceDate'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import Button from '../../../../components/ui/components/buttons/Button'

const WorkoutDeleteForm = () => {
    const { currentWorkout, setFiltersForm, onSuccess } =
        useContext(WorkoutFormsContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { id, name, sets, reps, weight, date } = currentWorkout

    return (
        <form
            className='p-5 text-center bg-white rounded-lg shadow dark:bg-gray-800'
            onSubmit={(ev) => handleSubmit(ev, id, setIsSubmitting, onSuccess)}
        >
            <svg
                className='text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    fillRule='evenodd'
                    d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                    clipRule='evenodd'
                ></path>
            </svg>
            <p className='mb-1 text-gray-500 dark:text-gray-300'>
                Estas seguro que quieres elimar el workout:
            </p>
            <p className='mb-4 text-gray-500 dark:text-gray-300'>
                {name}: {sets}x{reps}x{weight} Kg - {normalizeDateUTC(date)}
            </p>
            <div className='flex justify-center items-center gap-4'>
                <Button
                    kind='outline'
                    disabled={isSubmitting}
                    onClick={setFiltersForm}
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

const handleSubmit = async (ev, workoutId, setIsSubmitting, onSuccess) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const res = await deleteWorkoutService(workoutId)

    if (!res.ok) setIsSubmitting(false)

    onSuccess()
}

export default WorkoutDeleteForm
