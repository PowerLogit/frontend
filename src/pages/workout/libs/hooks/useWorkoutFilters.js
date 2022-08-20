import { useState } from 'react'
import { PAGINATION } from '@constant/pagination'
import { SORT_OPTION } from '../constant/workoutSortOption'

const useWorkoutFilters = () => {
    const [filters, setFilters] = useState(INITIAL_STATE)

    const setSortBy = (sortBy) =>
        setFilters({ ...filters, page: PAGINATION.DEFAULT_PAGE, sortBy })

    const setPage = (newPage) => setFilters({ ...filters, page: newPage })

    const setItemPerPage = (newItemPerPage) => {
        setFilters({
            ...filters,
            page: PAGINATION.DEFAULT_PAGE,
            itemPerPage: newItemPerPage,
        })
    }

    const ressetFilters = () => setFilters({ ...INITIAL_STATE })

    return {
        filters,
        filtersSetters: {
            setSortBy,
        },
        paginationSetters: {
            setPage,
            setItemPerPage,
        },
        ressetFilters,
    }
}

const INITIAL_STATE = {
    sortBy: SORT_OPTION.DEFAULT,
    page: PAGINATION.DEFAULT_PAGE,
    itemPerPage: PAGINATION.DEFAULT_ITEM_PER_PAGE,
}

export default useWorkoutFilters
