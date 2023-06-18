export const validCurrentPassword = (password) => {
    if (!password.length)
        return 'settings.profile.password.form.errors.required'

    if (password.length < 6)
        return 'settings.profile.password.form.errors.minlength'

    if (!/\d/.test(password))
        return 'settings.profile.password.form.errors.numberFormat'

    if (!/[A-Z]/.test(password))
        return 'settings.profile.password.form.errors.letterFormat'
}

export const validNewPassword = (newPassword, currentPassword) => {
    if (!newPassword.length)
        return 'settings.profile.password.form.errors.required'

    if (newPassword.length < 6)
        return 'settings.profile.password.form.errors.minlength'

    if (!/\d/.test(newPassword))
        return 'settings.profile.password.form.errors.numberFormat'

    if (!/[A-Z]/.test(newPassword))
        return 'settings.profile.password.form.errors.letterFormat'

    if (newPassword === currentPassword)
        return 'settings.profile.password.form.errors.newPassword'
}

export const validRepeatNewPassword = (repeatNewPassword, newPassword) => {
    if (!repeatNewPassword.length)
        return 'settings.profile.password.form.errors.required'

    if (repeatNewPassword !== newPassword)
        return 'settings.profile.password.form.errors.repeatPassword'
}
