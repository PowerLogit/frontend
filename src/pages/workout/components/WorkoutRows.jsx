import WorkoutCard from './WorkoutCard'
import style from './WorkoutRows.module.css'

const WorkoutRows = ({ workouts }) => {
    if (!workouts.length > 0) return <p>Sin ejercicios</p>
    return (
        <div className={style.container}>
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
    )
}

export default WorkoutRows
