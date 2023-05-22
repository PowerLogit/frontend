import { useState } from 'react'

const useCommentEditForm = (comment) => {
    const [form, setForm] = useState(() => getInitialState(comment))

    const handleInputChange = (setValue) => (ev) => {
        setForm(setValue(ev.target.value))
    }

    const validateText = (text) => {
        if (text.length < 1 || text.length > 201)
            return 'Longitud entre 1 y 200 caracteres'
    }

    const setText = (value) => {
        const error = validateText(value)

        return {
            ...form,
            text: { value, error },
        }
    }

    const isFormInvalid =
        isInitialValues(form, comment) || !form.text.value || form.text.error

    return {
        form,
        isFormInvalid,
        handleInputChange,
        setText,
    }
}

const getInitialState = (comment) => ({
    text: {
        value: comment.text,
        error: undefined,
    },
})

const isInitialValues = (fomrValues, comment) =>
    fomrValues.text.value === comment.text

export default useCommentEditForm
