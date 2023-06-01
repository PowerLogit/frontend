import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

export const getWorkoutService = async (id, cancelToken) => {
    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: `/workouts/${id}`,
            cancelToken,
        })

        const isOk = HttpStatusCode.OK === status
        if (!isOk) {
            throw error
        }

        return {
            workout: data,
            error: !isOk,
            aborted: false,
        }
    } catch (error) {
        const isAborted = error?.isCancel

        return {
            workout: undefined,
            error: !isAborted,
            isAborted,
        }
    }
}
