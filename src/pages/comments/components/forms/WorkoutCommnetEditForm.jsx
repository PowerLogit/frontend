import { useState } from 'react'

import Button from '../../../../components/ui/components/buttons/Button'
import { editWorkoutCommentService } from '../../libs/services/comment.service'

const getInitialState = (comment) => ({
    text: {
        value: comment.text,
        error: undefined,
    },
})

const WorkoutCommnetEditForm = ({
    currentComment,
    updateComment,
    closeModal,
}) => {
    const [form, setForm] = useState(() => getInitialState(currentComment))
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

    return (
        <form
            onSubmit={(ev) =>
                handleSubmit(
                    ev,
                    form,
                    currentComment,
                    setIsSubmitting,
                    updateComment,
                    closeModal
                )
            }
        >
            <div className='w-full border border-gray-200 rounded-b-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600'>
                <div className='p-4 py-2 bg-white dark:bg-gray-800'>
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
                <div className='flex items-center gap-4 px-3 py-2 border-t dark:border-gray-600'>
                    <Button
                        kind='outline'
                        loading={isSubmitting}
                        onClick={closeModal}
                        className={'max-w-40'}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type='submit'
                        loading={isSubmitting}
                        disabled={isFormInvalid}
                        className={'max-w-40'}
                    >
                        Editar
                    </Button>
                </div>
            </div>
        </form>
    )
}

const handleSubmit = async (
    ev,
    fomrValues,
    currentComment,
    setIsSubmitting,
    updateComment,
    closeModal
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const text = fomrValues.text.value
    const commentUpdated = { id: currentComment.id, text }

    const { data, status } = await editWorkoutCommentService(commentUpdated)

    if (status === 200) {
        updateComment(data)
        closeModal()
    }

    setIsSubmitting(false)
}

export default WorkoutCommnetEditForm
