import { useState } from 'react'

const useRegisterForm = () => {
    const [form, setForm] = useState(initialState)

    const handleChange = (setValue) => (ev) => {
        setForm(setValue(ev.target.value))
    }

    const isFormValid =
        !form.username.value ||
        form.username.error ||
        !form.name.value ||
        form.name.error ||
        !form.surname.value ||
        form.surname.error ||
        !form.email.value ||
        form.email.error ||
        !form.password.value ||
        form.password.error

    return {
        form,
        isFormValid,
        handleChange,
    }
}

const initialState = {
    username: {
        value: '',
        error: undefined,
    },
    name: {
        value: '',
        error: undefined,
    },
    surname: {
        value: '',
        error: undefined,
    },
    email: {
        value: '',
        error: undefined,
    },
    password: {
        value: '',
        error: undefined,
    },
}

export default useRegisterForm
