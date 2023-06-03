import { api } from '@api/axios.api'

import { HttpStatusCode } from '../../../../constant/HttpStatusCode'

export const udpatePasswordService = async (payload) => {
    try {
        const { data, status, error } = await api({
            method: 'PATCH',
            url: '/auth/change-password',
            payload,
        })

        const isOk = HttpStatusCode.NO_CONTENT === status
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
