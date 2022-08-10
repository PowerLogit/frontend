import { useEffect, useState } from 'react'
import style from './Workout.module.css'
import { getWorkoutService } from '../../services/workout.service'
import { HttpStatusCode } from '../../constant/HttpStatusCode'
import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import UseWorkoutFilters from './UseWorkoutFilters'

const Workout = () => {
    const [workout, setWorkout] = useState({
        data: [],
        loading: false,
        error: null,
    })

    const { sortBy, ...setFiltersFn } = UseWorkoutFilters()

    useEffect(() => {
        getWorkout(workout, setWorkout, {
            startDate: '01/01/2022',
            endDate: '12/31/2022',
        })
    }, [])

    let workoutsFiltered = sortWorkout(workout.data, sortBy)

    return (
        <div className={style.wrapper}>
            <h1>Workout</h1>
            <WorkoutFilters sortBy={sortBy} {...setFiltersFn} />
            <WorkoutRows workouts={workoutsFiltered} />
        </div>
    )
}

const sortWorkout = (workouts, sortBy) => {
    const sortedWorkout = [...workouts]

    switch (sortBy) {
        case 1:
            return sortedWorkout.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            )

        default:
            return sortedWorkout
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

export default Workout
