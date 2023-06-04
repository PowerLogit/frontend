import { useCallback, useState } from 'react'

import InputText from '../../components/ui/components/form/InputText'
import PageSelector from '../../components/ui/components/pagination/PageSelector'
import CoachesRow from './components/CoachesRow'
import useCoaches from './libs/hooks/useCoaches'

const ListCoaches = () => {
    const [filters, setFilters] = useState(initialFilters)
    const { data, totalPages, isLoading, error, toogleData } =
        useCoaches(filters)

    const setPage = useCallback(
        (page) => setFilters({ ...filters, page }),
        [filters]
    )
    const setSearch = useCallback(
        (ev) => setFilters((prev) => ({ ...prev, search: ev.target.value })),
        []
    )

    return (
        <div className='max-w-screen-xl mx-auto mt-8 px-4 xl:px-0'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                Lista de Entrenadores
            </h1>

            <InputText
                placeholder='Buscar entrenador...'
                type='search'
                className='mb-6 max-w-sm'
                value={filters.search}
                onChange={setSearch}
            />

            <CoachesRow
                data={data}
                isLoading={isLoading}
                error={error}
                toogleData={toogleData}
            />

            {totalPages > 1 && (
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
    search: '',
}

export default ListCoaches
