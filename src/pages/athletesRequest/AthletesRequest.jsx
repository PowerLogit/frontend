import { useState } from 'react'

import PageSelector from '../../components/ui/components/pagination/PageSelector'
import AthletesRequestRow from './components/AthletesRequestRow'
import useAthletesRequest from './libs/hooks/useAthletesRequest'

const AthletesRequest = () => {
    const [filters, setFilters] = useState(initialFilters)
    const { data, totalPages, isLoading, error } = useAthletesRequest(filters)

    const setPage = (page) => setFilters({ ...filters, page })

    const reloadFilters = () =>
        setFilters((prevFilters) => ({
            ...prevFilters,
            change: !prevFilters.change,
        }))

    return (
        <div className='max-w-screen-xl mx-auto mt-8 px-4 xl:px-0'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                Solicitudes de atletas
            </h1>

            <AthletesRequestRow
                data={data}
                isLoading={isLoading}
                error={error}
                resetFilters={reloadFilters}
            />

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
    change: false,
}

export default AthletesRequest
