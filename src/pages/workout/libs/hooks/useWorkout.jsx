import { useEffect, useState } from 'react'
import { getWorkoutService } from '../services/workout.service'

const initialState = {
    data: [],
    loading: true,
    error: null,
}

const useWorkout = () => {
    const [workouts, setWorkouts] = useState(initialState)

    const setData = (newData) =>
        setWorkouts({ data: newData, loading: false, error: null })

    const setError = (newError) =>
        setWorkouts({ data: [], loading: false, error: newError })

    const reloadWorkouts = () =>
        setWorkouts({ data: [], loading: true, error: null })

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

        if (!workouts.loading) return

        const controller = new AbortController()

        loadWorkout(setData, setError, controller.signal)

        return () => controller.abort()
    }, [workouts.loading])

    return {
        workouts: workouts.data,
        workoutsLoading: workouts.loading,
        workoutsError: workouts.error,
        setWorkouts,
        reloadWorkouts,
        deleteWorkouts,
    }
}

const loadWorkout = async (setData, setError, signal) => {
    const { workout, error, aborted } = await getWorkoutService(signal)

    if (aborted) return
    if (workout) setData(workout)
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
