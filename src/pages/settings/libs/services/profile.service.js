import { api } from '@api/axios.api'

import { HttpStatusCode } from '../../../../constant/HttpStatusCode'

export const getProfileService = async (bearer, cancelToken) => {
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
            data: undefined,
            error: !isAborted,
            isAborted,
        }
    }
}

export const udpateProfileService = async (payload) => {
    try {
        const { data, status, error } = await api({
            method: 'PATCH',
            url: '/users',
            payload,
        })

        const isOk = HttpStatusCode.OK === status
        if (!isOk) {
            throw error
        }

        return {
            data,
            status,
            error: !isOk,
        }
    } catch (error) {
        return {
            data: undefined,
            error: error.message,
        }
    }
}
