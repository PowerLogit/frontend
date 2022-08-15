import { useState } from 'react'
import { SORT_OPTION } from '../constant/workout.sortOption'

const UseWorkoutFilters = () => {
    const [filters, setFilters] = useState({
        sortBy: SORT_OPTION.DEFAULT,
        page: 1,
        itemPerPage: 3,
    })

    const setSortBy = (sortBy) => setFilters({ ...filters, sortBy })

    const setPage = (newPage) => setFilters({ ...filters, page: newPage })

    const setItemPerPage = (newItemPerPage) =>
        setFilters({ ...filters, itemPerPage: newItemPerPage })

    return {
        filters,
        setSortBy,
        setPage,
        setItemPerPage,
    }
}

export default UseWorkoutFilters
