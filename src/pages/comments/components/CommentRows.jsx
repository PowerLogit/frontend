import { toast } from 'sonner'

import CommentCard from './CommentCard'

const CommentRows = ({ comments, loading, error, settersComment }) => {
    if (error) {
        toast.error(
            'Ha ocurrido un error al cargar los comentarios. Por favor, inténtalo de nuevo.'
        )
        return
    } else if (loading) {
        return <p className='dark:text-white'>Cargando ...</p>
    } else if (!comments.length) {
        toast('No hay comentarios disponibles en este momento')
        return <p className='dark:text-white'>Sin comentarios</p>
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
