import api from '../config/axios'

export const getWorkoutService = async (params) => {
    try {
        const Authorization = localStorage.getItem('Authorization')

        const res = await api.get('/workout', {
            headers: { Authorization },
            params,
        })

        return {
            data: res.data,
            status: res.status,
        }
    } catch (error) {
        return {
            error: error.response.data,
            status: error.response.status,
        }
    }
}
