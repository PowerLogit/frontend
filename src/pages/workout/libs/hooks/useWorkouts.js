import { sourceCancelToken } from '@api/axios.api'
import { useEffect, useState } from 'react'

import { getWorkoutsAthleteService } from '../services/workoutAthlete.service'

const useWorkouts = (filters) => {
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

    const setLoading = () =>
        setWorkouts((prevAuth) => ({ ...prevAuth, loading: true }))

    useEffect(() => {
        const cancelToken = sourceCancelToken()

        loadWorkouts({ setLoading, setData, setError }, filters, cancelToken)

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

const loadWorkouts = async (setters, filters, signal) => {
    setters.setLoading()

    const { workout, count, error, isAborted } =
        await getWorkoutsAthleteService(filters, signal)

    if (isAborted) return
    if (workout) setters.setData(workout, count)
    else setters.setError(error)
}

export default useWorkouts
