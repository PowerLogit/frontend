import { api } from '@api/axios.api'

export const loginService = (credential) => {
    return api({
        method: 'POST',
        url: '/auth/login',
        payload: credential,
    })
}

export const registerService = (credential) => {
    return api({
        method: 'POST',
        url: '/auth/register',
        payload: credential,
    })
}

export const profileService = (bearer) => {
    return api({
        method: 'GET',
        url: '/auth/profile',
        bearer,
    })
}
