import { useAuthContext } from '@auth/libs/context/auth.context'
import { useTranslation } from 'react-i18next'

import { formatDateAgo } from '../../../helpers/normaliceDate'
import useAvatar from '../../../hooks/useAvatar'
import WorkoutCommentActions from './WorkoutCommentActions'

const CommentCard = ({ comment, settersComment }) => {
    const { t } = useTranslation()

    const { author, text, createdAt, updatedAt } = comment

    const { user } = useAuthContext()
    const { avatar, avatarAlt } = useAvatar(author)

    const { name, surname, username } = author

    const date = new Date(createdAt)
    const formattedDateAgo = formatDateAgo(date, t)

    const isEdited = createdAt !== updatedAt
    const isAuthor = username === user.username

    return (
        <article className='p-6 text-base rounded-lg shadow border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-600'>
            <footer className='flex justify-between items-center mb-2'>
                <div className='flex items-center'>
                    <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white'>
                        <img
                            className='mr-2 w-6 h-6 rounded-full'
                            src={avatar}
                            alt={avatarAlt}
                        />
                        {name} {surname}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                        <time>{formattedDateAgo}</time>
                        {isEdited && (
                            <i> ({t('workouts.comments.card.edited')})</i>
                        )}
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
