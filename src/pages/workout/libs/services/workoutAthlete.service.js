import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

export const getWorkoutsAthleteService = async (filters, cancelToken) => {
    const { itemPerPage: limit, ...restFilters } = filters

    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: '/workouts/athlete',
            params: { ...restFilters, limit },
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

export const getWorkoutAthleteService = async (id, cancelToken) => {
    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: `/workouts/athlete/${id}`,
            cancelToken,
        })

        const isOk = HttpStatusCode.OK === status
        if (!isOk) {
            throw new Error(JSON.stringify(error))
        }

        return {
            workout: data,
            error: !isOk,
            aborted: false,
        }
    } catch (error) {
        const isAborted = JSON.parse(error.message)?.isCancel

        return {
            workout: undefined,
            error: !isAborted,
            isAborted,
        }
    }
}

export const createWorkoutAthleteService = async (workout) => {
    return api({
        method: 'POST',
        url: '/workouts/athlete',
        payload: workout,
    })
}

export const editWorkoutAthleteService = async (workout) => {
    const { id, ...rest } = workout

    return api({
        method: 'PATCH',
        url: `/workouts/athlete/${id}`,
        payload: rest,
    })
}

export const deleteWorkoutAthleteService = async (id) => {
    return api({
        method: 'DELETE',
        url: `/workouts/athlete/${id}`,
    })
}
