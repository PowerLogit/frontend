import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

export const getWorkoutService = async (filters, cancelToken) => {
    const { itemPerPage: limit, ...restFilters } = filters

    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: '/workouts',
            params: { limit, ...restFilters },
            cancelToken,
        })

        const isOk = HttpStatusCode.OK === status
        if (!isOk) {
            throw new Error(JSON.stringify(error))
        }

        const { data: workout, count } = data

        return {
            workout,
            count: isOk ? count : 0,
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
        url: '/workouts',
        payload: workout,
    })
}

export const editWorkoutService = async (workout) => {
    const { id, ...rest } = workout

    return api({
        method: 'PATCH',
        url: `/workouts/${id}`,
        payload: rest,
    })
}

export const deleteWorkoutService = async (id) => {
    return api({
        method: 'DELETE',
        url: `/workouts/${id}`,
    })
}
