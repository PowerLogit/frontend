import { useState } from 'react'

const UseWorkoutFilters = () => {
    const [filters, setFilters] = useState({
        sortBy: 0,
    })

    const setSortBy = (sortBy) => setFilters({ ...filters, sortBy })

    return {
        ...filters,
        setSortBy,
    }
}

export default UseWorkoutFilters
