import {
    validCurrentPassword,
    validNewPassword,
    validRepeatNewPassword,
} from '../validations/userPassword.validation'

export const setCurrentPassword = (value) => (prevForm) => {
    const errorCurrentPassword = validCurrentPassword(value)
    const errorNewPassword = validNewPassword(prevForm.newPassword.value, value)

    return {
        ...prevForm,
        currentPassword: {
            value,
            error: errorCurrentPassword,
        },
        newPassword: { ...prevForm.newPassword, error: errorNewPassword },
    }
}

export const setNewPassword = (value) => (prevForm) => {
    const errorCurrentPassword = validCurrentPassword(
        prevForm.currentPassword.value
    )

    const errorNewPassword = validNewPassword(
        value,
        prevForm.currentPassword.value
    )

    const errorRepeatNewPassword = validRepeatNewPassword(
        prevForm.repeatNewPassword.value,
        value
    )

    return {
        ...prevForm,
        currentPassword: {
            ...prevForm.currentPassword,
            error: errorCurrentPassword,
        },
        newPassword: { value, error: errorNewPassword },
        repeatNewPassword: {
            ...prevForm.repeatNewPassword,
            error: errorRepeatNewPassword,
        },
    }
}

export const setRepeatNewPassword = (value) => (prevForm) => {
    const error = validRepeatNewPassword(value, prevForm.newPassword.value)

    return {
        ...prevForm,
        repeatNewPassword: { value, error },
    }
}
