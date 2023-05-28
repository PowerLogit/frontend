import { toast } from 'sonner'

import AthletesRequestCard from './AthletesRequestCard'

const AthletesRequestRow = ({
    data,
    isLoading,
    error,
    onSuccess,
    handlers,
}) => {
    if (error) {
        toast.error(
            'Ha ocurrido un error al cargar los atletas. Por favor, inténtalo de nuevo.'
        )
        return <p className='dark:text-white'>Sin Atletas</p>
    } else if (isLoading) {
        return <p className='dark:text-white'>Cargando ...</p>
    } else if (!data.length) {
        return <p className='dark:text-white'>Sin Atletas</p>
    }

    return (
        <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6'>
            {data.map((athlete) => (
                <AthletesRequestCard
                    key={athlete.id}
                    athlete={athlete}
                    onSuccess={onSuccess}
                    handlers={handlers}
                />
            ))}
        </div>
    )
}

export default AthletesRequestRow
