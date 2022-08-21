import InputText from '@ui/components/form/InputText'
import style from './WorkoutCreateForm.module.css'
import Button from '@ui/components/buttons/Button'
import useCreateForm from '../../libs/hooks/useCreateForm'
import { createWorkoutService } from '../../libs/services/workout.service'
import { useContext, useState } from 'react'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import {
    setDate,
    setName,
    setReps,
    setSets,
    setWeight,
} from '../../libs/actions/createForm.action'

const WorkoutCreateForm = () => {
    const { onSuccess } = useContext(WorkoutFormsContext)

    const { fomrValues, isFormInvalid, dispatchFormValues } = useCreateForm()
    const { name, sets, reps, weight, date } = fomrValues

    const [isSubmitting, setIsSubmitting] = useState(false)

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
                    onChange={(ev) =>
                        dispatchFormValues(setName(ev.target.value))
                    }
                    className={style.input}
                />
                <input
                    type='date'
                    value={date}
                    onChange={(ev) =>
                        dispatchFormValues(setDate(ev.target.value))
                    }
                />
            </div>
            <div className={style.row}>
                <InputText
                    label='Series'
                    placeholder='4'
                    value={sets.value}
                    error={sets.error}
                    onChange={(ev) =>
                        dispatchFormValues(setSets(ev.target.value))
                    }
                    className={style.input}
                />
                <InputText
                    label='Repes'
                    placeholder='4'
                    value={reps.value}
                    error={reps.error}
                    onChange={(ev) =>
                        dispatchFormValues(setReps(ev.target.value))
                    }
                    className={style.input}
                />
                <InputText
                    label='Peso'
                    placeholder='110'
                    value={weight.value}
                    error={weight.error}
                    onChange={(ev) =>
                        dispatchFormValues(setWeight(ev.target.value))
                    }
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
