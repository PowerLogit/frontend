import { sourceCancelToken } from '@api/axios.api'
import { useEffect, useState } from 'react'
import { getCoachProfileService } from '../services/athlete.service'

const useCoachProfile = () => {
    const [coach, setCoach] = useState(INITIAL_STATE)

    const setData = (data) => {
        setCoach({
            data,
            isLoading: false,
            error: null,
        })
    }

    const setError = (newError) =>
        setCoach({ ...INITIAL_STATE, isLoading: false, error: newError })

    const setLoading = () =>
        setCoach((prevCoaches) => ({ ...prevCoaches, isLoading: true }))

    useEffect(() => {
        const cancelToken = sourceCancelToken()
        const setters = { setLoading, setData, setError }

        loadCoach(setters, cancelToken)

        return () => cancelToken.cancel()
    }, [])

    return {
        data: coach.data,
        isLoading: coach.isLoading,
        error: coach.error,
    }
}

const INITIAL_STATE = {
    data: null,
    isLoading: true,
    error: null,
}

const loadCoach = async (setters, signal) => {
    setters.setLoading()

    const { data, count, totalPages, error, isAborted } =
        await getCoachProfileService(signal)

    if (isAborted) return
    if (data) setters.setData(data, count, totalPages)
    else setters.setError(error)
}

export default useCoachProfile
