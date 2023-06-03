import { api } from '@api/axios.api'

export const sendRequestToCoach = async (idCoach) => {
    return await api({
        method: 'POST',
        url: `/athletes/${idCoach}/send-request-to-coach`,
    })
}
