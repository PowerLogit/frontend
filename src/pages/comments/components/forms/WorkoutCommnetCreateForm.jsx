import { useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import useCommentCreateForm from '../../libs/hooks/useCommentCreateForm'
import { createWorkoutCommentService } from '../../libs/services/comment.service'

const WorkoutCommnetCreateForm = ({ idWorkout, addComment }) => {
    const { form, isFormInvalid, handleInputChange, setResetForm, setText } =
        useCommentCreateForm()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) =>
        handleSubmit(
            ev,
            form,
            idWorkout,
            setIsSubmitting,
            setResetForm,
            addComment
        )

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
                <div className='flex items-center gap-4 px-3 py-2 border-t dark:border-gray-600'>
                    <Button
                        kind='outline'
                        loading={isSubmitting}
                        onClick={setResetForm}
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
                        Crear
                    </Button>
                </div>
            </div>
        </form>
    )
}

const handleSubmit = async (
    ev,
    fomrValues,
    idWorkout,
    setIsSubmitting,
    setResetForm,
    addComment
) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const newComment = {
        id: crypto.randomUUID(),
        text: fomrValues.text.value,
        workout: idWorkout,
    }

    const { data, status } = await createWorkoutCommentService(newComment)

    if (status === 201) {
        setResetForm()
        addComment(data)
        toast.success('¡Comentario creado exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al crear el comentario. Por favor, inténtalo de nuevo.'
        )
    }

    setIsSubmitting(false)
}

export default WorkoutCommnetCreateForm
