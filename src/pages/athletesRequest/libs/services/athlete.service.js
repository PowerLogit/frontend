import { api } from '../../../../api/axios.api'

export const getAthleteRequestsService = async (filters, cancelToken) => {
    try {
        const {
            status,
            data: res,
            error,
        } = await api({
            method: 'GET',
            url: '/coaches/athlete-requests',
            params: filters,
            cancelToken,
        })

        const isOk = status === 200
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

export const acceptAthleteService = async (idAthlete) => {
    return await api({
        method: 'POST',
        url: `/coaches/${idAthlete}/accept-athlete`,
    })
}

export const rejectAthleteService = async (idAthlete) => {
    return await api({
        method: 'DELETE',
        url: `/coaches/${idAthlete}/reject-athlete`,
    })
}
