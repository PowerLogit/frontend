import { useEffect, useState } from 'react'

import { sourceCancelToken } from '../api/axios.api'
import { getAthleteRequestsService } from '../pages/athletesRequest/libs/services/athlete.service'

const useAthletesRequest = (filters) => {
    const [requests, setRequests] = useState(INITIAL_STATE)

    const setData = (data, count, totalPages) => {
        setRequests({
            data,
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

    useEffect(() => {
        const cancelToken = sourceCancelToken()
        const setters = { setLoading, setData, setError }

        loadRequests(filters, setters, cancelToken)

        return () => cancelToken.cancel()
    }, [filters])

    return {
        data: requests.data,
        count: requests.count,
        totalPages: requests.totalPages,
        isLoading: requests.isLoading,
        error: requests.error,
    }
}

const INITIAL_STATE = {
    data: [],
    count: 0,
    totalPages: 0,
    isLoading: true,
    error: null,
}

const loadRequests = async (filters, setters, signal) => {
    setters.setLoading()

    const { data, count, totalPages, error, isAborted } =
        await getAthleteRequestsService(filters, signal)

    if (isAborted) return
    if (data) setters.setData(data, count, totalPages)
    else setters.setError(error)
}

export default useAthletesRequest
