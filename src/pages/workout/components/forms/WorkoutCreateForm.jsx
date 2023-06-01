import { useContext, useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import InputText from '../../../../components/ui/components/form/InputText'
import {
    setDate,
    setName,
    setReps,
    setSets,
    setWeight,
} from '../../libs/actions/createForm.action'
import { WorkoutFormsContext } from '../../libs/context/WorkoutForms.context'
import useCreateForm from '../../libs/hooks/useCreateForm'
import { createWorkoutAthleteService } from '../../libs/services/workoutAthlete.service'

const WorkoutCreateForm = ({ closeModal }) => {
    const { onSuccess } = useContext(WorkoutFormsContext)

    const { fomrValues, isFormInvalid, dispatchFormValues } = useCreateForm()
    const { name, sets, reps, weight, date } = fomrValues

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (setValue) => (ev) => {
        dispatchFormValues(setValue(ev.target.value))
    }

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, fomrValues, setIsSubmitting, onSuccess, closeModal)

    return (
        <form className='p-5' onSubmit={onHandleSubmit}>
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

    const res = await createWorkoutAthleteService(workout)

    if (res.status === 201) {
        onSuccess()
        closeModal()
        toast.success('¡Entrenamiento creado exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al crear el entrenamiento. Por favor, inténtalo de nuevo'
        )
    }

    setIsSubmitting(false)
}

export default WorkoutCreateForm
