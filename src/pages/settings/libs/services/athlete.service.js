import { api } from '@api/axios.api'

import { HttpStatusCode } from '../../../../constant/HttpStatusCode'

export const getCoachProfileService = async (cancelToken) => {
    try {
        const { data, status, error } = await api({
            method: 'GET',
            url: '/athletes/coach-profile',
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

export const addAthleteRoleService = async () => {
    try {
        const { data, status, error } = await api({
            method: 'PATCH',
            url: '/athletes/add-role',
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

export const removeAthleteRoleService = async () => {
    try {
        const { data, status, error } = await api({
            method: 'PATCH',
            url: '/athletes/remove-role',
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

export const leaveCoachService = async () => {
    return await api({
        method: 'DELETE',
        url: '/athletes/leave-coach',
    })
}
