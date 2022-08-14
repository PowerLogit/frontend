import style from './Workout.module.css'
import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import UseWorkoutFilters from './libs/hooks/UseWorkoutFilters'
import { WorkoutContext } from './libs/context/Workout.context'
import { useContext } from 'react'

const Workout = () => {
    const { sortBy, ...setFiltersFn } = UseWorkoutFilters()
    const { data } = useContext(WorkoutContext)

    let workoutsFiltered = sortWorkout(data, sortBy)

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

export default Workout
