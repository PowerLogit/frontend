import { useEffect, useState } from 'react'

import { sourceCancelToken } from '../../../../api/axios.api'
import {
    acceptAthleteService,
    getAthleteRequestsService,
    rejectAthleteService,
} from '../services/athlete.service'
import { toast } from 'sonner'

const useAthletesRequest = (filters) => {
    const [requests, setRequests] = useState(INITIAL_STATE)

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
        handlers: {
            handleAccept,
            handleReject,
        },
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

    const { limit, page } = filters

    const { data, count, totalPages, error, isAborted } =
        await getAthleteRequestsService({ limit, page }, signal)

    if (isAborted) return
    if (data) setters.setData(data, count, totalPages)
    else setters.setError(error)
}

const handleAccept = async (idAthlete, setIsSubmitting, onSuccess) => {
    setIsSubmitting(true)

    const { status } = await acceptAthleteService(idAthlete)

    if (status === 201) {
        onSuccess()
        toast.success('Atleta aceptado exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al aceptar el atleta. Por favor, inténtalo de nuevo.'
        )
    }

    setIsSubmitting(false)
}

const handleReject = async (idAthlete, setIsSubmitting, onSuccess) => {
    setIsSubmitting(true)

    const { status } = await rejectAthleteService(idAthlete)

    if (status === 204) {
        onSuccess()
        toast.success('Atleta rechazado exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al rechazar el atleta. Por favor, inténtalo de nuevo.'
        )
    }

    setIsSubmitting(false)
}

export default useAthletesRequest
