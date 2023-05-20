import useCommentsWorkout from '../../libs/hooks/useCommentsWorkout'
import WorkoutCard from '../WorkoutCard'
import CommentRows from './CommentRows'
import WorkoutCommnetCreateForm from './WorkoutCommnetCreateForm'

const WorkoutComments = ({ currentWorkout, onSuccess }) => {
    const { comments, loading, error } = useCommentsWorkout(currentWorkout.id)

    return (
        <div className='p-5 w-full'>
            <div className='flex justify-center mb-6'>
                <WorkoutCard workout={currentWorkout} />
            </div>

            <div className='overflow-y-auto max-h-[32rem]'>
                <div className='mr-1'>
                    <WorkoutCommnetCreateForm
                        currentWorkout={currentWorkout}
                        onSuccess={onSuccess}
                    />

                    <CommentRows
                        comments={comments}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    )
}

export default WorkoutComments
