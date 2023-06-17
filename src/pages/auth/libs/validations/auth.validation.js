export const validUsername = (username) => {
    if (!username.length) return 'auth.errors.required'
    if (username.length < 4) return 'auth.errors.username.min'
    if (!/^[a-zA-Z0-9]+$/.test(username)) return 'auth.errors.username.pattern'
}

export const validName = (name) => {
    if (!name.length) return 'auth.errors.required'
    if (name.length < 3) return 'auth.errors.name.min'
    if (!/^[a-zA-Z]+$/.test(name)) return 'auth.errors.name.pattern'
}

export const validSurname = (surname) => {
    if (!surname.length) return 'auth.errors.required'
    if (surname.length < 3) return 'auth.errors.surname.min'
    if (!/^[a-zA-Z]+$/.test(surname)) return 'auth.errors.surname.pattern'
}

export const validEmail = (email) => {
    if (!email.length) return 'auth.errors.required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'auth.errors.email'
}

export const validPassword = (password) => {
    if (!password.length) return 'auth.errors.required'
    if (password.length < 6) return 'auth.errors.password.min'
    if (!/\d/.test(password)) return 'auth.errors.password.number'
    if (!/[A-Z]/.test(password)) return 'auth.errors.password.letter'
}
