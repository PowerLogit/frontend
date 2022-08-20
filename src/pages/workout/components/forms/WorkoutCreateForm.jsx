import InputText from '@ui/components/form/InputText'
import style from './WorkoutCreateForm.module.css'
import Button from '@ui/components/buttons/Button'
import useCreateForm from '../../libs/hooks/useCreateForm'
import { createWorkoutService } from '../../libs/services/workout.service'
import { useState } from 'react'

const WorkoutCreateForm = ({ onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { fomrValues, isFormInvalid, settersFormValues } = useCreateForm()

    const { setName, setSets, setReps, setWeight, setDate } = settersFormValues
    const { name, sets, reps, weight, date } = fomrValues

    return (
        <form
            onSubmit={(ev) =>
                handleSubmit(ev, fomrValues, setIsSubmitting, onSuccess)
            }
        >
            <div className={style.row}>
                <InputText
                    label='Nombre'
                    placeholder='SQLB'
                    value={name.value}
                    error={name.error}
                    onChange={(ev) => setName(ev.target.value)}
                    className={style.input}
                />
                <input
                    type='date'
                    value={date}
                    onChange={(ev) => setDate(ev.target.value)}
                />
            </div>
            <div className={style.row}>
                <InputText
                    label='Series'
                    placeholder='4'
                    value={sets.value}
                    error={sets.error}
                    onChange={(ev) => setSets(ev.target.value)}
                    className={style.input}
                />
                <InputText
                    label='Repes'
                    placeholder='4'
                    value={reps.value}
                    error={reps.error}
                    onChange={(ev) => setReps(ev.target.value)}
                    className={style.input}
                />
                <InputText
                    label='Peso'
                    placeholder='110'
                    value={weight.value}
                    error={weight.error}
                    onChange={(ev) => setWeight(ev.target.value)}
                    className={style.input}
                />
            </div>
            <Button type='submit' disabled={isFormInvalid || isSubmitting}>
                {isSubmitting ? 'Cargando...' : 'Crear'}
            </Button>
        </form>
    )
}

const handleSubmit = async (ev, fomrValues, setIsSubmitting, onSuccess) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const { name, sets, reps, weight, date } = fomrValues

    const workout = {
        id: crypto.randomUUID(),
        name: name.value,
        sets: Number(sets.value),
        reps: Number(reps.value),
        weight: Number(weight.value),
        date: date,
    }

    const res = await createWorkoutService(workout)

    if (!res.ok) setIsSubmitting(false)

    onSuccess()
}

export default WorkoutCreateForm
