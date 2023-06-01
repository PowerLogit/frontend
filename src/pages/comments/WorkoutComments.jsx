import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import WorkoutCard from '../workout/components/WorkoutCard'
import CommentRows from './components/CommentRows'
import WorkoutCommnetCreateForm from './components/forms/WorkoutCommnetCreateForm'
import useCommentsWorkout from './libs/hooks/useCommentsWorkout'
import useWorkout from './libs/hooks/useWorkout'

const WorkoutComments = () => {
    const { idWorkout } = useParams()

    const workoutData = useWorkout(idWorkout)
    const { comments, loading, error, settersComment } =
        useCommentsWorkout(idWorkout)

    const workout = getWorkout(workoutData)

    return (
        <div className='max-w-3xl mx-auto px-5 md:px-0 mt-5'>
            <div className='flex justify-center mb-6'>{workout}</div>

            <WorkoutCommnetCreateForm
                idWorkout={idWorkout}
                addComment={settersComment.addComment}
            />

            <CommentRows
                comments={comments}
                loading={loading}
                error={error}
                settersComment={settersComment}
            />
        </div>
    )
}

const getWorkout = ({ workout, workoutLoading, workoutError }) => {
    if (workoutLoading) return <p>Cargando...</p>
    else if (workoutError) {
        return toast.error('Ha ocurrido un error al cargar el entrenamiento')
    }

    return <WorkoutCard workout={workout} />
}

export default WorkoutComments
