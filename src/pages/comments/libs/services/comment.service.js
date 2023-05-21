import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

export const getCommentsWorkoutService = async (idWorkout, cancelToken) => {
    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: `/${idWorkout}/comments`,
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
            data: undefined,
            count: 0,
            error: !isAborted,
            isAborted,
        }
    }
}

export const getCommentWorkoutService = async (idComment, cancelToken) => {
    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: `/comments/${idComment}`,
            cancelToken,
        })

        const isOk = HttpStatusCode.OK === status
        if (!isOk) {
            throw new Error(JSON.stringify(error))
        }

        return {
            comment: data,
            error: !isOk,
            aborted: false,
        }
    } catch (error) {
        const isAborted = JSON.parse(error.message)?.isCancel

        return {
            comment: undefined,
            error: !isAborted,
            isAborted,
        }
    }
}

export const createWorkoutCommentService = async (comment) => {
    return await api({
        method: 'POST',
        url: '/comments',
        payload: comment,
    })
}

export const deleteWorkoutCommentService = async (id) => {
    return await api({
        method: 'DELETE',
        url: `/comments/${id}`,
    })
}
