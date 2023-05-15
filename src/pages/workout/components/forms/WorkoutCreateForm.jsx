import InputText from '@ui/components/form/InputText'
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

const WorkoutCreateForm = ({ closeModal }) => {
    const { onSuccess } = useContext(WorkoutFormsContext)

    const { fomrValues, isFormInvalid, dispatchFormValues } = useCreateForm()
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
    fomrValues,
    setIsSubmitting,
    onSuccess,
    closeModal
) => {
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

    if (res.status === 201) {
        onSuccess()
        closeModal()
    }

    setIsSubmitting(false)
}

export default WorkoutCreateForm
