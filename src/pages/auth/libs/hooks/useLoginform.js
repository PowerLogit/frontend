import { useState } from 'react'

import { NODE_ENV } from '../../../../config/common'

const isDevMode = NODE_ENV === 'dev'

const useLoginform = () => {
    const [form, setForm] = useState(initialState)

    const handleChange = (setValue) => (ev) => {
        setForm(setValue(ev.target.value))
    }

    const isFormValid =
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
    email: {
        value: isDevMode ? 'usuario@gmail.com' : '',
        error: undefined,
    },
    password: {
        value: isDevMode ? 'Admin1' : '',
        error: undefined,
    },
}

export default useLoginform
