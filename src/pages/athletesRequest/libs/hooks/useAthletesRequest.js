import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { sourceCancelToken } from '../../../../api/axios.api'
import { useAuthContext } from '../../../auth/libs/context/auth.context'
import {
    acceptAthleteService,
    getAthleteRequestsService,
    rejectAthleteService,
} from '../services/athlete.service'

const useAthletesRequest = () => {
    const { user } = useAuthContext()
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

    const isCoach = user?.role?.includes('coach')

    useEffect(() => {
        if (!isCoach) return

        const cancelToken = sourceCancelToken()
        const setters = { setLoading, setData, setError }

        loadRequests(filters, setters, cancelToken)

        return () => cancelToken.cancel()
    }, [filters, isCoach])

    return {
        data: requests.data,
        count: requests.count,
        totalPages: requests.totalPages,
        isLoading: requests.isLoading,
        error: requests.error,
        filters,
        setPage,
        onSuccess,
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

const initialFilters = {
    limit: 8,
    page: 1,
    change: false,
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
