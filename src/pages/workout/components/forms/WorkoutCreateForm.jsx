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
import { useTranslation } from 'react-i18next'

const WorkoutCreateForm = ({ closeModal }) => {
    const { t } = useTranslation()

    const { onSuccess } = useContext(WorkoutFormsContext)

    const { fomrValues, isFormInvalid, dispatchFormValues } = useCreateForm()
    const { name, sets, reps, weight, date } = fomrValues

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (setValue) => (ev) => {
        dispatchFormValues(setValue(ev.target.value))
    }

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, fomrValues, setIsSubmitting, onSuccess, closeModal, t)

    return (
        <form className='p-5' onSubmit={onHandleSubmit}>
            <div className='flex gap-4 mb-6'>
                <InputText
                    label={t('workouts.form.name.label')}
                    placeholder={t('workouts.form.name.placeholder')}
                    value={name.value}
                    error={t(t(name).error)}
                    onChange={handleInputChange(setName)}
                    className={'w-full'}
                />
                <InputText
                    label={t('workouts.form.date.label')}
                    type='date'
                    value={date}
                    onChange={handleInputChange(setDate)}
                    className={'w-full'}
                />
            </div>
            <div className='flex gap-4 mb-8'>
                <InputText
                    label={t('workouts.form.sets.label')}
                    placeholder={t('workouts.form.sets.placeholder')}
                    type='number'
                    min={1}
                    max={99}
                    value={sets.value}
                    error={t(sets.error)}
                    onChange={handleInputChange(setSets)}
                    className={'w-full'}
                />
                <InputText
                    label={t('workouts.form.reps.label')}
                    placeholder={t('workouts.form.reps.placeholder')}
                    type='number'
                    min={1}
                    max={999}
                    value={reps.value}
                    error={t(reps.error)}
                    onChange={handleInputChange(setReps)}
                    className={'w-full'}
                />
                <InputText
                    label={t('workouts.form.weight.label')}
                    placeholder={t('workouts.form.weight.placeholder')}
                    value={weight.value}
                    error={t(weight.error)}
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
                    {t('workouts.modal.create.buttons.cancel')}
                </Button>
                <Button
                    type='submit'
                    loading={isSubmitting}
                    disabled={isFormInvalid}
                >
                    {t('workouts.modal.create.buttons.create')}
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
    closeModal,
    t
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
        date,
    }

    const res = await createWorkoutAthleteService(workout)

    if (res.status === 201) {
        onSuccess()
        closeModal()
        toast.success(t('workouts.modal.create.toast.success'))
    } else {
        toast.error(t('workouts.modal.create.toast.error'))
    }

    setIsSubmitting(false)
}

export default WorkoutCreateForm
