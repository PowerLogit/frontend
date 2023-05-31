import { useEffect, useState } from 'react'
import { sourceCancelToken } from '@api/axios.api'
import { getWorkoutService } from '../services/workout.service'

const useWorkout = (idWorkout) => {
    const [workout, setWorkout] = useState(INITIAL_STATE)

    const setData = (data) => {
        setWorkout({
            data,
            loading: false,
            error: null,
        })
    }

    const setError = (newError) =>
        setWorkout({ data: null, loading: false, error: newError })

    const setLoading = () =>
        setWorkout((prevWorkout) => ({ ...prevWorkout, loading: true }))

    useEffect(() => {
        if (!idWorkout) return

        const cancelToken = sourceCancelToken()
        const setters = { setLoading, setData, setError }

        loadWorkout(idWorkout, setters, cancelToken)

        return () => cancelToken.cancel()
    }, [idWorkout])

    return {
        workout: workout.data,
        workoutLoading: workout.loading,
        workoutError: workout.error,
    }
}

const INITIAL_STATE = {
    data: null,
    loading: true,
    error: null,
}

const loadWorkout = async (idWorkout, setters, signal) => {
    setters.setLoading()

    const { workout, error, isAborted } = await getWorkoutService(
        idWorkout,
        signal
    )

    if (isAborted) return
    if (workout) setters.setData(workout)
    else setters.setError(error)
}

export default useWorkout
