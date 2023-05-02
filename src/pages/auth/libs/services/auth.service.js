import { api } from '@api/axios.api'

export const loginService = (credential) => {
    return api({
        method: 'POST',
        url: '/v1/auth/login',
        payload: credential,
    })
}

export const registerService = (credential) => {
    return api({
        method: 'POST',
        url: '/v1/auth/register',
        payload: credential,
    })
}

export const profileService = (bearer) => {
    return api({
        method: 'GET',
        url: '/v1/users',
        bearer,
    })
}
