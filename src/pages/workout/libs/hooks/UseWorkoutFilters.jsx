import { useState } from 'react'
import { SORT_OPTION } from '../constant/workoutSortOption'

const INITIAL_STATE = {
    sortBy: SORT_OPTION.DEFAULT,
    page: 1,
    itemPerPage: 3,
}

const useWorkoutFilters = () => {
    const [filters, setFilters] = useState(INITIAL_STATE)

    const setSortBy = (sortBy) => setFilters({ ...filters, page: 1, sortBy })

    const setPage = (newPage) => setFilters({ ...filters, page: newPage })

    const setItemPerPage = (newItemPerPage) =>
        setFilters({ ...filters, page: 1, itemPerPage: newItemPerPage })

    const ressetFilters = () => setFilters(INITIAL_STATE)

    return {
        filters: {
            sortBy: filters.sortBy,
        },
        pagination: {
            page: filters.page,
            itemPerPage: filters.itemPerPage,
        },
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

export default useWorkoutFilters
