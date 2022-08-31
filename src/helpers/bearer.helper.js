const AUTH = 'Authorization'

export const setBearer = (newBearer) => {
    return localStorage.setItem(AUTH, newBearer)
}

export const getBearer = () => {
    return localStorage.getItem(AUTH)
}

export const removeBearer = () => {
    return localStorage.removeItem(AUTH)
}
