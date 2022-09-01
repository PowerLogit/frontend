import { useEffect, useState } from 'react'
import { sourceCancelToken } from '@api/axios.api'
import { getWorkoutService } from '../services/workout.service'

const useWorkout = (filters) => {
    const [workouts, setWorkouts] = useState(INITIAL_STATE)

    const setData = (newData, newCount) => {
        setWorkouts({
            data: newData,
            count: newCount,
            loading: false,
            error: null,
        })
    }

    const setError = (newError) =>
        setWorkouts({ data: [], count: 0, loading: false, error: newError })

    const deleteWorkouts = (id) => {
        setWorkouts({
            ...workouts,
            data: workouts.data.filter((workout) => workout.id !== id),
        })
    }

    useEffect(() => {
        const cancelToken = sourceCancelToken()

        loadWorkout(setData, setError, filters, cancelToken)

        return () => cancelToken.cancel()
    }, [filters])

    return {
        workouts: workouts.data,
        totalWorkouts: workouts.count,
        workoutsLoading: workouts.loading,
        workoutsError: workouts.error,
        setWorkouts,
        deleteWorkouts,
    }
}

const INITIAL_STATE = {
    data: [],
    count: 0,
    loading: true,
    error: null,
}

const loadWorkout = async (setData, setError, filters, signal) => {
    const { workout, count, error, isAborted } = await getWorkoutService(
        filters,
        signal
    )

    if (isAborted) return
    if (workout) setData(workout, count)
    else setError(error)
}

export default useWorkout
