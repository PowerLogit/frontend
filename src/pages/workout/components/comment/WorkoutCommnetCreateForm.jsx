import { useState } from 'react'

import Button from '../../../../components/ui/components/buttons/Button'
import { createWorkoutCommentService } from '../../libs/services/comment.service'

const WorkoutCommnetCreateForm = ({ currentWorkout, onSuccess }) => {
    const [form, setForm] = useState(INITIAL_STATE)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isFormInvalid = !form.text.value || form.text.error

    const validateText = (text) => {
        if (text.length < 1 || text.length > 201)
            return 'Longitud entre 1 y 200 caracteres'
    }

    const handleInputChange = (setValue) => (ev) => {
        setForm(setValue(ev.target.value))
    }

    const setText = (value) => {
        const error = validateText(value)

        return {
            ...form,
            text: { value, error },
        }
    }

    const onHandleSubmit = () => (ev) =>
        handleSubmit(ev, form, currentWorkout, setIsSubmitting, onSuccess)

    return (
        <form className='mb-6' onSubmit={onHandleSubmit}>
            <div className='w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
                <div className='p-4 py-2 bg-white rounded-t-lg dark:bg-gray-800'>
                    <label htmlFor='comment' className='sr-only'>
                        Your comment
                    </label>
                    <textarea
                        id='comment'
                        rows='3'
                        value={form.text.value}
                        onChange={handleInputChange(setText)}
                        placeholder='Escribir un comentario...'
                        className='w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400'
                    ></textarea>
                    {form.text.error && (
                        <span className='mt-2 text-sm text-red-600 dark:text-red-500'>
                            {form.text.error}
                        </span>
                    )}
                </div>
                <div className='flex items-center justify-between px-3 py-2 border-t dark:border-gray-600'>
                    <Button
                        type='submit'
                        loading={isSubmitting}
                        disabled={isFormInvalid}
                        className={'w-40'}
                    >
                        Crear comentario
                    </Button>
                </div>
            </div>
        </form>
    )
}

const handleSubmit = async (
    ev,
    fomrValues,
    currentWorkout,
    setIsSubmitting,
    onSuccess
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const newComment = {
        id: crypto.randomUUID(),
        text: fomrValues.text.value,
        workout: currentWorkout.id,
    }

    const res = await createWorkoutCommentService(newComment)

    if (res.status === 201) {
        onSuccess()
    }

    setIsSubmitting(false)
}

const INITIAL_STATE = {
    text: {
        value: '',
        error: undefined,
    },
}

export default WorkoutCommnetCreateForm
