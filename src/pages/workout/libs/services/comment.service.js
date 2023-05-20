import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

export const getCommentsWorkoutService = async (idWorkout, cancelToken) => {
    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: `/comments/${idWorkout}`,
            cancelToken,
        })

        const isOk =
            HttpStatusCode.OK === status || HttpStatusCode.NO_CONTENT === status
        if (!isOk) {
            throw new Error(JSON.stringify(error))
        }

        return {
            data,
            count: isOk ? data.length : 0,
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

export const createWorkoutCommentService = async (comment) => {
    return api({
        method: 'POST',
        url: '/comments',
        payload: comment,
    })
}
