import { useEffect, useState } from 'react'
import { HttpStatusCode } from '@constant/HttpStatusCode'
import { paginateWorkout, sortWorkout } from '../functions/workout.filter'
import { fetchWorkoutService } from '../services/workout.service'

const initialState = {
    data: [],
    loading: true,
    error: null,
}

const useWorkout = (filters) => {
    const [workouts, setWorkouts] = useState(initialState)

    const setData = (newData) =>
        setWorkouts({ data: newData, loading: false, error: null })

    const setError = (newError) =>
        setWorkouts({ data: [], loading: false, error: newError })

    const deleteWorkouts = (id) => {
        setWorkouts({
            ...workouts,
            data: workouts.data.filter((workout) => workout.id !== id),
        })
    }

    useEffect(() => {
        fetchWorkouts(setData, setError, {
            startDate: '01/01/2022',
            endDate: '12/31/2022',
        })
    }, [])

    const { paginatedWorkouts, totalPages } = getWorkoutToDisplay(
        workouts.data,
        filters
    )

    return {
        workouts: paginatedWorkouts,
        loading: workouts.loading,
        error: workouts.error,
        totalPages,
        setWorkouts,
        deleteWorkouts,
    }
}

const fetchWorkouts = async (setData, setError, params) => {
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
}

const getWorkoutToDisplay = (workouts, { sortBy, page, itemPerPage }) => {
    const workoutsFiltered = sortWorkout(workouts, sortBy)

    const { paginatedWorkouts, totalPages } = paginateWorkout(
        workoutsFiltered,
        page,
        itemPerPage
    )

    return { paginatedWorkouts, totalPages }
}

export default useWorkout
