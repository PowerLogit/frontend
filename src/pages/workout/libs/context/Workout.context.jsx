import { createContext, useEffect, useState } from 'react'
import { HttpStatusCode } from '@constant/HttpStatusCode'
import { paginateWorkout, sortWorkout } from '../functions/workout.filter'
import { fetchWorkoutService } from '../services/workout.service'

const initialState = {
    data: [],
    loading: true,
    error: null,
}

export const WorkoutContext = createContext()

export const WorkoutContextProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState(initialState)

    const deleteWorkouts = (id) => {
        setWorkouts({
            ...workouts,
            data: workouts.data.filter((workout) => workout.id !== id),
        })
    }

    useEffect(() => {
        fetchWorkouts(setWorkouts, {
            startDate: '01/01/2022',
            endDate: '12/31/2022',
        })
    }, [])

    // const { data, totalPages } = getWorkoutToDisplay(workouts.data, filters)

    return (
        <WorkoutContext.Provider
            value={{ ...workouts, setWorkouts, deleteWorkouts }}
        >
            {children}
        </WorkoutContext.Provider>
    )
}

const fetchWorkouts = async (setWorkouts, params) => {
    try {
        const { data, status, error } = await fetchWorkoutService(params)

        if (status !== HttpStatusCode.OK) throw new Error(error)

        setWorkouts((prevWorkouts) => ({
            ...prevWorkouts,
            data,
            loading: false,
        }))
    } catch (error) {
        setWorkouts((prevWorkouts) => ({
            ...prevWorkouts,
            loading: false,
            error: error.message,
        }))
    }
}

const getWorkoutToDisplay = (workouts, { sortBy, page, itemPerPage }) => {
    const workoutsFiltered = sortWorkout(workouts, sortBy)

    const { paginatedWorkouts, totalPages } = paginateWorkout(
        workoutsFiltered,
        page,
        itemPerPage
    )

    return { workouts: paginatedWorkouts, totalPages }
}
