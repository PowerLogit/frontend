import style from './WorkoutDeleteForm.module.css'
import Button from '@ui/components/buttons/Button'
import { deleteWorkoutService } from '../../libs/services/workout.service'
import { useState } from 'react'
import { normalizeDateUTC } from '../../libs/functions/normaliceDate'

const WorkoutDeleteForm = ({ onSuccess, onCancel, workout }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { id, name, sets, reps, weight, date } = workout

    return (
        <form
            onSubmit={(ev) => handleSubmit(ev, id, setIsSubmitting, onSuccess)}
        >
            <div className={style.message}>
                <p> Estas seguro que quieres elimar el workout: </p>
                <span>
                    {name}: {sets}x{reps}x{weight} Kg - {normalizeDateUTC(date)}
                </span>
            </div>
            <div className={style.buttons}>
                <Button
                    kind='secondary'
                    disabled={isSubmitting}
                    onClick={onCancel}
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
