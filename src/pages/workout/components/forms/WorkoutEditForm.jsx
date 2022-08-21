import style from './WorkoutEditForm.module.css'
import InputText from '@ui/components/form/InputText'
import Button from '@ui/components/buttons/Button'
import useEditForm from '../../libs/hooks/useEditForm'
import { editWorkoutService } from '../../libs/services/workout.service'
import { useContext, useState } from 'react'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import {
    setDate,
    setName,
    setReps,
    setSets,
    setWeight,
} from '../../libs/actions/editForm.action'

const WorkoutEditForm = () => {
    const { currentWorkout, onSuccess } = useContext(WorkoutFormsContext)

    const { fomrValues, isFormInvalid, dispatchFormValues } =
        useEditForm(currentWorkout)
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
                {isSubmitting ? 'Cargando...' : 'Editar'}
            </Button>
        </form>
    )
}

const handleSubmit = async (ev, workout, setIsSubmitting, onSuccess) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const newWorkout = {
        id: workout.id,
        name: workout.name.value,
        sets: Number(workout.sets.value),
        reps: Number(workout.reps.value),
        weight: Number(workout.weight.value),
        date: workout.date,
    }

    const res = await editWorkoutService(newWorkout)

    if (!res.ok) setIsSubmitting(false)

    onSuccess()
}

export default WorkoutEditForm
