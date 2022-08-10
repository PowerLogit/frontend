import { useEffect, useState } from 'react'
import { HttpStatusCode } from '../../../../constant/HttpStatusCode'
import { getWorkoutService } from '../../../../services/workout.service'

const UseWorkout = () => {
    const [workout, setWorkout] = useState({
        data: [],
        loading: false,
        error: null,
    })
    useEffect(() => {
        getWorkout(workout, setWorkout, {
            startDate: '01/01/2022',
            endDate: '12/31/2022',
        })
    }, [])

    return {
        workout: workout.data,
        loading: workout.loading,
        error: workout.error,
    }
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

export default UseWorkout
