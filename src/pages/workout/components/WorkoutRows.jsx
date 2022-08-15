import { useContext } from 'react'
import { WorkoutContext } from '../libs/context/Workout.context'
import WorkoutCard from './WorkoutCard'
import style from './WorkoutRows.module.css'

const WorkoutRows = ({ workouts }) => {
    const { loading } = useContext(WorkoutContext)

    if (loading) return <p>Loading ...</p>
    if (!workouts.length > 0) return <p>Sin ejercicios</p>

    return (
        <div className={style.wrapper}>
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
    )
}

export default WorkoutRows
