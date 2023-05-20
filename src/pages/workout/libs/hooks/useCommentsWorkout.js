import { sourceCancelToken } from '@api/axios.api'
import { useEffect, useState } from 'react'

import { getCommentsWorkoutService } from '../services/comment.service'

const useCommentsWorkout = (workoutId) => {
    const [comments, setComments] = useState(INITIAL_STATE)

    const setData = (data, count) => {
        setComments({
            data,
            count,
            loading: false,
            error: null,
        })
    }

    const setError = (error) =>
        setComments({ ...INITIAL_STATE, loading: false, error })

    const setLoading = () =>
        setComments((prevAuth) => ({ ...prevAuth, loading: true }))

    useEffect(() => {
        if (!workoutId) return

        const cancelToken = sourceCancelToken()
        const setters = { setLoading, setData, setError }

        loadCommentsWorkout(workoutId, setters, cancelToken)

        return () => cancelToken.cancel()
    }, [workoutId])

    return {
        comments: comments.data,
        count: comments.count,
        loading: comments.loading,
        error: comments.error,
    }
}

const loadCommentsWorkout = async (workoutId, setters, signal) => {
    setters.setLoading(true)

    const { data, count, error, isAborted } = await getCommentsWorkoutService(
        workoutId,
        signal
    )

    if (isAborted) return
    if (data) setters.setData(data, count)
    else setters.setError(error)
}

const INITIAL_STATE = {
    data: [],
    count: 0,
    loading: true,
    error: null,
}

export default useCommentsWorkout
