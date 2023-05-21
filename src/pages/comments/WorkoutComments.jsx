import { useParams } from 'react-router-dom'

import WorkoutCard from '../workout/components/WorkoutCard'
import useWorkout from '../workout/libs/hooks/useWorkout'
import CommentRows from './components/CommentRows'
import WorkoutCommnetCreateForm from './components/forms/WorkoutCommnetCreateForm'
import useCommentsWorkout from './libs/hooks/useCommentsWorkout'

const WorkoutComments = () => {
    const { idWorkout } = useParams()

    const workoutData = useWorkout(idWorkout)
    const { comments, loading, error, addComment, removeComment } =
        useCommentsWorkout(idWorkout)

    const workout = getWorkout(workoutData)

    return (
        <div className='max-w-3xl mx-auto px-5 md:px-0 mt-5'>
            <div className='flex justify-center mb-6'>{workout}</div>

            <WorkoutCommnetCreateForm
                idWorkout={idWorkout}
                addComment={addComment}
            />

            <CommentRows
                comments={comments}
                loading={loading}
                error={error}
                removeComment={removeComment}
            />
        </div>
    )
}

const getWorkout = ({ workout, workoutLoading, workoutError }) => {
    if (workoutLoading) return <p>Cargando...</p>
    else if (workoutError) return <p>Error al cargar el workout</p>

    return <WorkoutCard workout={workout} />
}

export default WorkoutComments
