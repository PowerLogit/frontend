import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

export const getCoachesService = async (filters, cancelToken) => {
    try {
        const {
            status,
            data: res,
            error,
        } = await api({
            method: 'GET',
            url: '/coaches',
            params: filters,
            cancelToken,
        })

        const isOk = HttpStatusCode.OK === status
        if (!isOk) {
            throw error
        }

        const { data, count, totalPages } = res

        return {
            data,
            count: isOk ? count : 0,
            totalPages,
            error: !isOk,
            aborted: false,
        }
    } catch (error) {
        const isAborted = error?.isCancel

        return {
            data: undefined,
            count: 0,
            totalPages: 0,
            error: !isAborted,
            isAborted,
        }
    }
}
