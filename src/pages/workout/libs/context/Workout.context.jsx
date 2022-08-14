import { createContext, useEffect, useState } from 'react'
import { HttpStatusCode } from '../../../../constant/HttpStatusCode'
import { getWorkoutService } from '../../../../services/workout.service'

const initialState = {
    data: [],
    loading: false,
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
        getWorkout(workouts, setWorkouts, {
            startDate: '01/01/2022',
            endDate: '12/31/2022',
        })
    }, [])

    return (
        <WorkoutContext.Provider
            value={{ ...workouts, setWorkouts, deleteWorkouts }}
        >
            {children}
        </WorkoutContext.Provider>
    )
}

const getWorkout = async (workout, setWorkout, params) => {
    setWorkout({ ...workout, loading: true })

    try {
        const { data, status, error } = await getWorkoutService(params)

        if (status !== HttpStatusCode.OK) throw new Error(error)

        setWorkout({
            ...workout,
            data,
            loading: false,
        })
    } catch (error) {
        setWorkout({
            ...workout,
            loading: false,
            error: error.message,
        })
    }
}
