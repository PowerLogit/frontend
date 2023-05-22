import { toast } from 'sonner'

import WorkoutCard from './WorkoutCard'

const WorkoutRows = ({ workouts, loading, error }) => {
    if (error) {
        toast.error(
            'Ha ocurrido un error al cargar los entrenamientos. Por favor, inténtalo de nuevo.'
        )
        return
    } else if (loading) {
        return <p className='dark:text-white'>Cargando ...</p>
    } else if (!workouts.length) {
        return <p className='dark:text-white'>Sin entrenamientos</p>
    }

    return (
        <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 gap-4'>
            {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
    )
}

export default WorkoutRows
