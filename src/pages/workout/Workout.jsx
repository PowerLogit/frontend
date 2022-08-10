import style from './Workout.module.css'
import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import UseWorkoutFilters from './libs/hooks/UseWorkoutFilters'
import UseWorkout from './libs/hooks/UseWorkout'

const Workout = () => {
    const { sortBy, ...setFiltersFn } = UseWorkoutFilters()
    const { workout } = UseWorkout()

    let workoutsFiltered = sortWorkout(workout, sortBy)

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
