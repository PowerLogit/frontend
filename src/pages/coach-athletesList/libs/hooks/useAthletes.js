import { useEffect, useState } from 'react'

import { sourceCancelToken } from '../../../../api/axios.api'
import { getAthletesService } from '../services/coach.service'

const useAthletes = () => {
    const [requests, setRequests] = useState(INITIAL_STATE)
    const [filters, setFilters] = useState(initialFilters)

    const setData = (data, count, totalPages) => {
        setRequests({
            data: [...data],
            count,
            totalPages,
            isLoading: false,
            error: null,
        })
    }

    const setError = (newError) =>
        setRequests({ ...INITIAL_STATE, isLoading: false, error: newError })

    const setLoading = () =>
        setRequests((prevCoaches) => ({ ...prevCoaches, isLoading: true }))

    const setPage = (page) => setFilters({ ...filters, page })

    const onSuccess = () =>
        setFilters((prevFilters) => ({
            ...prevFilters,
            change: !prevFilters.change,
        }))

    useEffect(() => {
        const cancelToken = sourceCancelToken()
        const setters = { setLoading, setData, setError }

        loadAthletes(filters, setters, cancelToken)

        return () => cancelToken.cancel()
    }, [filters])

    return {
        data: requests.data,
        count: requests.count,
        totalPages: requests.totalPages,
        isLoading: requests.isLoading,
        error: requests.error,
        filters,
        setPage,
        onSuccess,
    }
}

const INITIAL_STATE = {
    data: [],
    count: 0,
    totalPages: 0,
    isLoading: true,
    error: null,
}

const initialFilters = {
    limit: 10,
    page: 1,
    change: false,
}

const loadAthletes = async (filters, setters, signal) => {
    setters.setLoading()

    const { limit, page } = filters

    const { data, count, totalPages, error, isAborted } =
        await getAthletesService({ limit, page }, signal)

    if (isAborted) return
    if (data) setters.setData(data, count, totalPages)
    else setters.setError(error)
}

export default useAthletes
