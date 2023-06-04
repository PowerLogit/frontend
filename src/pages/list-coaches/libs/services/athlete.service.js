import { api } from '@api/axios.api'

export const sendRequestToCoach = async (idCoach) => {
    return await api({
        method: 'POST',
        url: `/athletes/${idCoach}/send-request-to-coach`,
    })
}

export const cancelRequestToCoach = async (idCoach) => {
    return await api({
        method: 'DELETE',
        url: `/athletes/${idCoach}/cancel-request-to-coach`,
    })
}
