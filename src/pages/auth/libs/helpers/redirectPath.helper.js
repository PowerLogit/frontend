const PATH = 'redirectPath'

export const setRedirectPath = (newPath) => {
    localStorage.setItem(PATH, newPath)

    return
}

export const getRedirectPath = () => {
    const redirectPath = localStorage.getItem(PATH) || '/'
    localStorage.removeItem(PATH)

    return redirectPath
}

export const removeRedirectPath = () => {
    localStorage.removeItem(PATH)

    return
}
