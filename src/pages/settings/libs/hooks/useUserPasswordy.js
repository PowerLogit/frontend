import { useState } from 'react'

const useUserPassword = () => {
    const [form, setForm] = useState(initialState)

    const handleInput = (setValue) => (ev) => {
        setForm(setValue(ev.target.value))
    }

    const isFormInvalid =
        !form.currentPassword.value ||
        form.currentPassword.error ||
        !form.newPassword.value ||
        form.newPassword.error ||
        !form.repeatNewPassword.value ||
        form.repeatNewPassword.error ||
        form.currentPassword.value === form.newPassword.value ||
        form.currentPassword.value === form.repeatNewPassword.value ||
        form.newPassword.value !== form.repeatNewPassword.value

    const setResetForm = () => setForm(initialState)

    return {
        form,
        isFormInvalid,
        setResetForm,
        handleInput,
    }
}

const initialState = {
    currentPassword: {
        value: '',
        error: undefined,
    },
    newPassword: {
        value: '',
        error: undefined,
    },
    repeatNewPassword: {
        value: '',
        error: undefined,
    },
}

export default useUserPassword
