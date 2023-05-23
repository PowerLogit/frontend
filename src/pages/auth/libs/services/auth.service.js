import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

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
        url: '/users',
        bearer,
    })
}

export const profileServiceV2 = async (bearer, cancelToken) => {
    try {
        const { data, status, error } = await api({
            method: 'GET',
            url: '/users',
            bearer,
            cancelToken,
        })

        const isOk = HttpStatusCode.OK === status
        if (!isOk) {
            throw error
        }

        return {
            data,
            error: !isOk,
            aborted: false,
        }
    } catch (error) {
        const isAborted = error?.isCancel

        return {
            workout: undefined,
            error: !isAborted,
            isAborted,
        }
    }
}
