import { toast } from 'sonner'

import CommentCard from './CommentCard'
import { useTranslation } from 'react-i18next'

const CommentRows = ({ comments, loading, error, settersComment }) => {
    const { t } = useTranslation()

    if (error) {
        toast.error(t('workouts.comments.rows.error'))
        return
    } else if (loading) {
        return (
            <p className='dark:text-white'>
                {t('workouts.comments.rows.loading')}
            </p>
        )
    } else if (!comments.length) {
        return (
            <p className='dark:text-white'>
                {t('workouts.comments.rows.noComments')}
            </p>
        )
    }

    return (
        <div className='flex flex-col gap-4 text-gray-500'>
            {comments.map((comment, index) => (
                <CommentCard
                    key={index}
                    comment={comment}
                    settersComment={settersComment}
                />
            ))}
        </div>
    )
}

export default CommentRows
