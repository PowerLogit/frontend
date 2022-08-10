import WorkoutCard from './WorkoutCard'
import style from './WorkoutList.module.css'

const WorkoutList = ({ workouts }) => {
    const workoutsRender = renderWorkouts(workouts)
    return <div className={style.container}>{workoutsRender}</div>
}

const renderWorkouts = (workouts) => {
    if (!workouts.length) return <p>Sin ejercicios</p>
    return workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
    ))
}

export default WorkoutList
