import { api } from '@api/axios.api'

import { HttpStatusCode } from '../../../../constant/HttpStatusCode'

export const addCoachRoleService = async () => {
    try {
        const { data, status, error } = await api({
            method: 'PATCH',
            url: '/coaches/add-role',
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

export const removeCoachRoleService = async () => {
    try {
        const { data, status, error } = await api({
            method: 'PATCH',
            url: '/coaches/remove-role',
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
