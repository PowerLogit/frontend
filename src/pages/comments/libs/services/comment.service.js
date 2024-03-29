import { api } from '@api/axios.api'
import { HttpStatusCode } from '@constant/HttpStatusCode'

export const getCommentsWorkoutService = async (idWorkout, cancelToken) => {
    try {
        const { status, data, error } = await api({
            method: 'GET',
            url: `/${idWorkout}/comments`,
            cancelToken,
        })

        const isOk = HttpStatusCode.OK === status
        if (!isOk) {
            throw error
        }

        return {
            data,
            count: isOk ? data.length : 0,
            error: !isOk,
            aborted: false,
        }
    } catch (error) {
        const isAborted = error?.isCancel

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
            throw error
        }

        return {
            comment: data,
            error: !isOk,
            aborted: false,
        }
    } catch (error) {
        const isAborted = error?.isCancel

        return {
            comment: undefined,
            error: !isAborted,
            isAborted,
        }
    }
}

export const createWorkoutCommentService = async (payload) => {
    return await api({
        method: 'POST',
        url: '/comments',
        payload,
    })
}

export const editWorkoutCommentService = async (comment) => {
    const { id, ...payload } = comment

    return await api({
        method: 'PATCH',
        url: `/comments/${id}`,
        payload,
    })
}

export const deleteWorkoutCommentService = async (id) => {
    return await api({
        method: 'DELETE',
        url: `/comments/${id}`,
    })
}
