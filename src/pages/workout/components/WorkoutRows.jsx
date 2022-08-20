import WorkoutCard from './WorkoutCard'
import style from './WorkoutRows.module.css'

const WorkoutRows = ({
    workouts,
    loading,
    error,
    setEditForm,
    setDelteForm,
}) => {
    if (error) return <p> Error al cargar los workouts </p>
    if (loading) return <p>Cargando ...</p>
    if (!workouts.length > 0) return <p>Sin ejercicios</p>

    return (
        <div className={style.wrapper}>
            {workouts.map((workout) => (
                <WorkoutCard
                    key={workout.id}
                    workout={workout}
                    setEditForm={setEditForm}
                    setDelteForm={setDelteForm}
                />
            ))}
        </div>
    )
}

export default WorkoutRows
