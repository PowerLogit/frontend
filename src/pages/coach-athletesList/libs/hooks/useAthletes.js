import { useCallback, useEffect, useState } from 'react'

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

    const setPage = useCallback(
        (page) => setFilters({ ...filters, page }),
        [filters]
    )

    const setSearch = useCallback(
        (ev) => setFilters((prev) => ({ ...prev, search: ev.target.value })),
        []
    )

    const onSuccess = () =>
        setFilters((prevFilters) => ({
            ...prevFilters,
            change: !prevFilters.change,
        }))

    useEffect(() => {
        const cancelToken = sourceCancelToken()

        const timeoutId = setTimeout(() => {
            const setters = { setLoading, setData, setError }
            loadAthletes(filters, setters, cancelToken)
        }, 400)

        return () => {
            cancelToken.cancel()
            clearTimeout(timeoutId)
        }
    }, [filters])

    return {
        data: requests.data,
        count: requests.count,
        totalPages: requests.totalPages,
        isLoading: requests.isLoading,
        error: requests.error,
        filters,
        setPage,
        setSearch,
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
    limit: 8,
    page: 1,
    search: '',
    change: false,
}

const loadAthletes = async (filters, setters, signal) => {
    setters.setLoading()

    const { limit, page, search } = filters

    const { data, count, totalPages, error, isAborted } =
        await getAthletesService({ limit, page, search }, signal)

    if (isAborted) return
    if (data) setters.setData(data, count, totalPages)
    else setters.setError(error)
}

export default useAthletes
