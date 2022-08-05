import api from '../config/axios'

export const loginService = async (credential) => {
    try {
        const res = await api.post('/auth/login', credential)

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

export const registerService = async (credential) => {
    try {
        const res = await api.post('/auth/register', credential)

        return {
            data: res.data,
            status: res.status,
        }
    } catch (error) {
        return {
            message: error.response.data,
            status: error.response.status,
        }
    }
}

export const profileService = async (bearer) => {
    try {
        const res = await api.get('/auth/profile', {
            headers: { Authorization: bearer },
        })

        return {
            data: res.data,
            status: res.status,
        }
    } catch (error) {
        return {
            message: error.response.data,
            status: error.response.status,
        }
    }
}
