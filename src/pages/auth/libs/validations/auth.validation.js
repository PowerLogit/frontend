export const validUsername = (username) => {
    if (!username.length) return 'Campo requerido'
    if (username.length < 4) return 'Mínimo 4 caracteres'
    if (!/^[a-zA-Z0-9]+$/.test(username))
        return 'Sólo se permiten letras y números'
}

export const validName = (name) => {
    if (!name.length) return 'Campo requerido'
    if (name.length < 3) return 'Mínimo 3 caracteres'
    if (!/^[a-zA-Z]+$/.test(name)) return 'Sólo se permiten letras'
}

export const validSurname = (surname) => {
    if (!surname.length) return 'Campo requerido'
    if (surname.length < 3) return 'Mínimo 3 caracteres'
    if (!/^[a-zA-Z]+$/.test(surname)) return 'Sólo se permiten letras'
}

export const validEmail = (email) => {
    if (!email.length) return 'Campo requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido'
}

export const validPassword = (password) => {
    if (!password.length) return 'Campo requerido'
    if (password.length < 6) return 'Mínimo 6 caracteres'
    if (!/\d/.test(password)) return 'Debe contener al menos un número'
    if (!/[A-Z]/.test(password))
        return 'Debe contener al menos una letra mayúscula'
}
