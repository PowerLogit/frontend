export const validCurrentPassword = (password) => {
    if (!password.length) return 'Campo requerido'
    if (password.length < 6) return 'Mínimo 6 caracteres'
    if (!/\d/.test(password)) return 'Debe contener al menos un número'
    if (!/[A-Z]/.test(password))
        return 'Debe contener al menos una letra mayúscula'
}

export const validNewPassword = (newPassword, currentPassword) => {
    if (!newPassword.length) return 'Campo requerido'
    if (newPassword.length < 6) return 'Mínimo 6 caracteres'
    if (!/\d/.test(newPassword)) return 'Debe contener al menos un número'
    if (!/[A-Z]/.test(newPassword))
        return 'Debe contener al menos una letra mayúscula'
    if (newPassword === currentPassword) return 'Las contraseñas son iguales'
}

export const validRepeatNewPassword = (repeatNewPassword, newPassword) => {
    if (!repeatNewPassword.length) return 'Campo requerido'
    if (repeatNewPassword !== newPassword) return 'La contraseña no coincide'
}
