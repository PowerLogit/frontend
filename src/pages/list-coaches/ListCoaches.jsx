import { useState } from 'react'
import { toast } from 'sonner'

import PageSelector from '../../components/ui/components/pagination/PageSelector'
import CardCoach from './components/CardCoach'
import useCoaches from './libs/hooks/useCoaches'

const ListCoaches = () => {
    const [filters, setFilters] = useState(initialFilters)
    const { data, totalPages, isLoading, error } = useCoaches(filters)

    const setPage = (page) => setFilters({ ...filters, page })

    if (isLoading) return <p>Cargando...</p>
    else if (error) {
        toast.error('Ha ocurrido un error al cargar los entrenadores')
        return
    }

    return (
        <div className='max-w-screen-xl mx-auto mt-8 px-4 xl:px-0'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                Lista de Entrenadores
            </h1>

            <div className='grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6'>
                {data.map((coach) => (
                    <CardCoach key={coach.id} coach={coach} />
                ))}
            </div>

            <PageSelector
                page={filters.page}
                setPage={setPage}
                totalPages={totalPages}
            />
        </div>
    )
}

const initialFilters = {
    limit: 8,
    page: 1,
}

export default ListCoaches
