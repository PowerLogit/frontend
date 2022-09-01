import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

export const getWorkoutService = async (filters, cancelToken) => {
    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: '/workout',
            params: {
                _page: filters.page,
                _limit: filters.itemPerPage,
                _sort: filters.sortBy,
            },
            cancelToken,
        })

        const isOk = HttpStatusCode.OK === status
        if (!isOk) throw new Error(JSON.stringify(error))

        return {
            workout: data.data,
            count: isOk ? data.count : 0,
            error: !isOk,
            aborted: false,
        }
    } catch (error) {
        const isAborted = JSON.parse(error.message)?.isCancel

        return {
            workout: undefined,
            count: 0,
            error: !isAborted,
            isAborted,
        }
    }
}

export const createWorkoutService = async (workout) => {
    return api({
        method: 'POST',
        url: '/workout',
        payload: workout,
    })
}

export const editWorkoutService = async (workout) => {
    const { id, ...rest } = workout

    return api({
        method: 'PATCH',
        url: `/workout/${id}`,
        payload: rest,
    })
}

export const deleteWorkoutService = async (id) => {
    return api({
        method: 'DELETE',
        url: `/workout/${id}`,
    })
}
