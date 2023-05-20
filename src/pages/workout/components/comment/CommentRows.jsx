import CommentCard from './CommentCard'

const CommentRows = ({ comments, loading, error }) => {
    if (error)
        return (
            <p className='dark:text-white'>Error al cargar los comentarios</p>
        )
    if (loading) return <p className='dark:text-white'>Cargando ...</p>
    if (!comments.length)
        return <p className='dark:text-white'>Sin comentarios</p>

    return (
        <div className='flex flex-col gap-4 text-gray-500'>
            {comments.map((comment, index) => (
                <CommentCard key={index} comment={comment} />
            ))}
        </div>
    )
}

export default CommentRows
