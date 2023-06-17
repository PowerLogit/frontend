import {
    validEmail,
    validName,
    validPassword,
    validSurname,
    validUsername,
} from '../validations/register.validation'

export const setUsername = (value) => (prevForm) => {
    const error = validUsername(value)

    return {
        ...prevForm,
        username: { value, error },
    }
}

export const setName = (value) => (prevForm) => {
    const error = validName(value)

    return {
        ...prevForm,
        name: { value, error },
    }
}

export const setSurname = (value) => (prevForm) => {
    const error = validSurname(value)

    return {
        ...prevForm,
        surname: { value, error },
    }
}

export const setEmail = (value) => (prevForm) => {
    const error = validEmail(value)

    return {
        ...prevForm,
        email: { value, error },
    }
}

export const setPassword = (value) => (prevForm) => {
    const error = validPassword(value)

    return {
        ...prevForm,
        password: { value, error },
    }
}
