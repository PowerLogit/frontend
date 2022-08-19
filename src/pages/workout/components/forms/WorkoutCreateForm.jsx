import InputText from '@ui/components/form/InputText'
import IconButton from '@ui/components/buttons/IconButton'
import style from './WorkoutCreateForm.module.css'
import CrossIcon from '@ui/svg/CrossIcon'
import Button from '@ui/components/buttons/Button'
import useFormValues from '../../libs/hooks/useFormValues'
import { createWorkoutService } from '../../libs/services/workout.service'
import { useState } from 'react'

const WorkoutCreateForm = ({ onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { fomrValues, settersFormValues } = useFormValues()
    const { setName, setSets, setReps, setWeight, setDate } = settersFormValues
    const { name, sets, reps, weight, date } = fomrValues

    const isDisabled =
        !name.value ||
        name.error ||
        !sets.value ||
        sets.error ||
        !reps.value ||
        reps.error ||
        !weight.value ||
        weight.error ||
        isSubmitting

    return (
        <div className={style.wrapper}>
            <form
                onSubmit={(ev) =>
                    handleSubmit(ev, fomrValues, setIsSubmitting, onClose)
                }
            >
                <IconButton
                    icon={CrossIcon}
                    filled
                    onClick={onClose}
                    className={style.close}
                />
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
                <Button type='submit' disabled={isDisabled}>
                    {isSubmitting ? 'Cargando...' : 'Crear'}
                </Button>
            </form>
        </div>
    )
}

const handleSubmit = async (ev, fomrValues, setIsSubmitting, onClose) => {
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

    const res = await fetch('http://localhost:3100/api/workout', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'no-cors',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('Authorization'),
        },
        body: JSON.stringify(workout),
    })

    if (res.ok) onClose() //TODO: Actualizar workouts
    else setIsSubmitting(false)
}

export default WorkoutCreateForm
