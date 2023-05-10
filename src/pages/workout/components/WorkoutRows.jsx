import WorkoutCard from './WorkoutCard'

const WorkoutRows = ({ workouts, loading, error }) => {
    if (error) return <p> Error al cargar los workouts </p>
    if (loading) return <p>Cargando ...</p>
    if (!workouts.length > 0) return <p>Sin ejercicios</p>

    return (
        <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-4'>
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
    )
}

export default WorkoutRows
