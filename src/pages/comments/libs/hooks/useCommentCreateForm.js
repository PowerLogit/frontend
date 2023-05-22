import { useState } from 'react'

const useCommentCreateForm = () => {
    const [form, setForm] = useState(INITIAL_STATE)

    const setResetForm = () => setForm(INITIAL_STATE)

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

    const isFormInvalid = !form.text.value || form.text.error

    return {
        form,
        isFormInvalid,
        handleInputChange,
        setResetForm,
        setText,
    }
}

const INITIAL_STATE = {
    text: {
        value: '',
        error: undefined,
    },
}

export default useCommentCreateForm
