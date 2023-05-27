import { useState } from 'react'

import PageSelector from '../../components/ui/components/pagination/PageSelector'
import CoachesRow from './components/CoachesRow'
import useCoaches from './libs/hooks/useCoaches'

const ListCoaches = () => {
    const [filters, setFilters] = useState(initialFilters)
    const { data, totalPages, isLoading, error } = useCoaches(filters)

    const setPage = (page) => setFilters({ ...filters, page })

    return (
        <div className='max-w-screen-xl mx-auto mt-8 px-4 xl:px-0'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                Lista de Entrenadores
            </h1>

            <CoachesRow data={data} isLoading={isLoading} error={error} />

            {!!data.length && (
                <PageSelector
                    page={filters.page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            )}
        </div>
    )
}

const initialFilters = {
    limit: 8,
    page: 1,
}

export default ListCoaches
