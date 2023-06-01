import { useAuthContext } from '@auth/libs/context/auth.context'

import { formatDateAgo } from '../../../helpers/normaliceDate'
import WorkoutCommentActions from './WorkoutCommentActions'

const CommentCard = ({ comment, settersComment }) => {
    const { user } = useAuthContext()

    const { author, text, createdAt, updatedAt } = comment
    const { name, surname, username } = author

    const date = new Date(createdAt)
    const formattedDateAgo = formatDateAgo(date)

    const isEdited = createdAt !== updatedAt
    const isAuthor = username === user.username

    return (
        <article className='p-6 text-base rounded-lg shadow border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-600'>
            <footer className='flex justify-between items-center mb-2'>
                <div className='flex items-center'>
                    <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
                        <img
                            className='mr-2 w-6 h-6 rounded-full'
                            src='https://cdn-icons-png.flaticon.com/512/6073/6073873.png'
                            alt={username}
                        />
                        {name} {surname}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                        <time>{formattedDateAgo}</time>
                        {isEdited && <i> (editado)</i>}
                    </p>
                </div>
                {isAuthor && (
                    <WorkoutCommentActions
                        comment={comment}
                        settersComment={settersComment}
                    />
                )}
            </footer>
            <p className='text-gray-500 dark:text-gray-400'>{text}</p>
        </article>
    )
}

export default CommentCard
