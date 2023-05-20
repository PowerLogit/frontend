import { formatDate } from '../../libs/functions/normaliceDate'

const CommentCard = ({ comment }) => {
    const { author, text, createdAt } = comment
    const { name, surname, username } = author

    const date = new Date(createdAt)
    const formattedDate = formatDate(date)

    return (
        <article className='p-6 text-base bg-white rounded-lg dark:bg-gray-900'>
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
                        <time>{formattedDate}</time>
                    </p>
                </div>
            </footer>
            <p className='text-gray-500 dark:text-gray-400'>{text}</p>
        </article>
    )
}

export default CommentCard
