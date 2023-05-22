import { useContext, useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import InputCheckbox from '../../../../components/ui/components/form/InputCheckbox'
import InputText from '../../../../components/ui/components/form/InputText'
import {
    setDate,
    setIsSuccessful,
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
    const { name, sets, reps, weight, date, isCompleted, isSuccessful } =
        fomrValues

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (setValue) => (ev) => {
        dispatchFormValues(setValue(ev.target.value))
    }

    const handleInputCheckboxChange = () => {
        dispatchFormValues(setIsSuccessful(!isSuccessful))
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
                {isCompleted && (
                    <InputCheckbox
                        label='Exitoso'
                        name='isSuccessful'
                        value={isSuccessful}
                        checked={isSuccessful}
                        onChange={handleInputCheckboxChange}
                    />
                )}
            </div>
            <div className='flex gap-4'>
                <Button
                    kind='outline'
                    loading={isSubmitting}
                    onClick={closeModal}
                >
                    Cancelar
                </Button>
                <Button
                    type='submit'
                    loading={isSubmitting}
                    disabled={isFormInvalid}
                >
                    Crear
                </Button>
            </div>
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
        isSuccessful: workout.isSuccessful,
    }

    const res = await editWorkoutService(newWorkout)

    if (res.status === 204) {
        onSuccess()
        closeModal()
        toast.success('¡Entrenamiento actualizado exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al actualizar el entrenamiento. Por favor, inténtalo de nuevo'
        )
    }

    setIsSubmitting(false)
}

export default WorkoutEditForm
