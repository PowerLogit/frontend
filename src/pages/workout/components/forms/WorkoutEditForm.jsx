import Button from '@ui/components/buttons/Button'
import InputText from '@ui/components/form/InputText'
import { useContext, useState } from 'react'

import {
    setDate,
    setName,
    setReps,
    setSets,
    setWeight,
} from '../../libs/actions/editForm.action'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import useEditForm from '../../libs/hooks/useEditForm'
import { editWorkoutService } from '../../libs/services/workout.service'

const WorkoutEditForm = ({ currentWorkout, closeModal }) => {
    const { onSuccess } = useContext(WorkoutFormsContext)

    const { fomrValues, isFormInvalid, dispatchFormValues } =
        useEditForm(currentWorkout)
    const { name, sets, reps, weight, date } = fomrValues

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (setValue) => (ev) => {
        dispatchFormValues(setValue(ev.target.value))
    }

    return (
        <form
            className='p-5'
            onSubmit={(ev) =>
                handleSubmit(
                    ev,
                    fomrValues,
                    setIsSubmitting,
                    onSuccess,
                    closeModal
                )
            }
        >
            <div className='flex gap-4 mb-6'>
                <InputText
                    label='Nombre'
                    placeholder='SQLB'
                    value={name.value}
                    error={name.error}
                    onChange={handleInputChange(setName)}
                    className={'w-full'}
                />
                <InputText
                    label='Fecha'
                    type='date'
                    value={date}
                    onChange={handleInputChange(setDate)}
                    className={'w-full'}
                />
            </div>
            <div className='flex gap-4 mb-8'>
                <InputText
                    label='Series'
                    placeholder='4'
                    value={sets.value}
                    error={sets.error}
                    onChange={handleInputChange(setSets)}
                    className={'w-full'}
                />
                <InputText
                    label='Repes'
                    placeholder='4'
                    value={reps.value}
                    error={reps.error}
                    onChange={handleInputChange(setReps)}
                    className={'w-full'}
                />
                <InputText
                    label='Peso'
                    placeholder='110'
                    value={weight.value}
                    error={weight.error}
                    onChange={handleInputChange(setWeight)}
                    className={'w-full'}
                />
            </div>
            <Button type='submit' disabled={isFormInvalid || isSubmitting}>
                {isSubmitting ? 'Cargando...' : 'Crear'}
            </Button>
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

    const newWorkout = {
        id: workout.id,
        name: workout.name.value,
        sets: Number(workout.sets.value),
        reps: Number(workout.reps.value),
        weight: Number(workout.weight.value),
        date: workout.date,
    }

    const res = await editWorkoutService(newWorkout)

    if (res.status !== 204) {
        setIsSubmitting(false)
    }

    onSuccess()
    closeModal()
}

export default WorkoutEditForm
