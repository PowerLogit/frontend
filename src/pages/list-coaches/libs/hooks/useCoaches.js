import { sourceCancelToken } from '@api/axios.api'
import { useEffect, useState } from 'react'

import { getCoachesService } from '../services/coach.service'

const useCoaches = (filters) => {
    const [coaches, setCoaches] = useState(INITIAL_STATE)

    const setData = (data, count, totalPages) => {
        setCoaches({
            data,
            count,
            totalPages,
            isLoading: false,
            error: null,
        })
    }

    const setError = (newError) =>
        setCoaches({ ...INITIAL_STATE, isLoading: false, error: newError })

    const setLoading = () =>
        setCoaches((prevCoaches) => ({ ...prevCoaches, isLoading: true }))

    useEffect(() => {
        const cancelToken = sourceCancelToken()
        const setters = { setLoading, setData, setError }

        loadCoaches(filters, setters, cancelToken)

        return () => cancelToken.cancel()
    }, [filters])

    return {
        data: coaches.data,
        count: coaches.count,
        totalPages: coaches.totalPages,
        isLoading: coaches.isLoading,
        error: coaches.error,
    }
}

const INITIAL_STATE = {
    data: [],
    count: 0,
    totalPages: 0,
    isLoading: true,
    error: null,
}

const loadCoaches = async (filters, setters, signal) => {
    setters.setLoading()

    const { data, count, totalPages, error, isAborted } =
        await getCoachesService(filters, signal)

    if (isAborted) return
    if (data) setters.setData(data, count, totalPages)
    else setters.setError(error)
}

export default useCoaches
