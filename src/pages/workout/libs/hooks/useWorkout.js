import { useEffect, useState } from 'react'
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
        /*fetchWorkouts(setData, setError, {
            startDate: '01/01/2022',
            endDate: '12/31/2022',
        })*/
        const controller = new AbortController()

        loadWorkout(setData, setError, controller.signal, filters)

        return () => controller.abort()
    }, [filters])

    return {
        workouts: workouts.data,
        workoutsCount: workouts.count,
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

const loadWorkout = async (setData, setError, signal, pagination) => {
    const { workout, count, error, aborted } = await getWorkoutService(
        signal,
        pagination
    )

    if (aborted) return
    if (workout) setData(workout, count)
    else setError(error)
}

/*const fetchWorkouts = async (setData, setError, params) => {
    try {
        const { data, status, error } = await fetchWorkoutService(params)

        if (status !== HttpStatusCode.OK)
            throw new Error(JSON.stringify({ error, status }))

        setData(data)
    } catch (error) {
        const { error: message, status } = JSON.parse(error.message)

        if (status === HttpStatusCode.NOT_FOUND) return setData([])

        setError(message)
    }
}*/

export default useWorkout
