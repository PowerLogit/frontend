import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

export const getWorkoutsCoachAthleteService = async (
    idAthlete,
    filters,
    cancelToken
) => {
    const { itemPerPage: limit, ...restFilters } = filters

    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: `/workouts/coach/${idAthlete}/athlete`,
            params: { ...restFilters, limit },
            cancelToken,
        })

        const isOk = status === HttpStatusCode.OK
        if (!isOk) throw error

        const { data: workout, count } = data

        return {
            workout,
            count: isOk ? count : 0,
            error: !isOk,
            aborted: false,
        }
    } catch (error) {
        const isAborted = error?.isCancel

        return {
            workout: undefined,
            count: 0,
            error: !isAborted,
            isAborted,
        }
    }
}

// TODO: NEED TO BE UPDATED
export const getWorkoutCoachAthleteService = async (id, cancelToken) => {
    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: `/workouts/coach/${id}`,
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

export const createWorkoutCoachAthleteService = async (workout, idAthlete) => {
    return api({
        method: 'POST',
        url: `workouts/coach/${idAthlete}/athlete`,
        payload: workout,
    })
}

export const editWorkoutCoachAthleteService = async (workout, idAthlete) => {
    const { id, ...rest } = workout

    return api({
        method: 'PATCH',
        url: `workouts/coach/${id}/workout/${idAthlete}/athlete`,
        payload: rest,
    })
}

export const deleteWorkoutCoachAthleteService = async (
    idWorkout,
    idAthlete
) => {
    return api({
        method: 'DELETE',
        url: `workouts/coach/${idWorkout}/workout/${idAthlete}/athlete`,
    })
}
