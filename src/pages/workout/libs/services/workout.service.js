import api from '@api/axios'
import { API_BACKEND } from '@config/common'

export const fetchWorkoutService = async (params) => {
    const Authorization = localStorage.getItem('Authorization')

    try {
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

export const getWorkoutService = async (signal, filters) => {
    const Authorization = localStorage.getItem('Authorization')
    const url = findAllUrl(filters)

    try {
        const res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization,
            },
            signal,
        })

        let workout

        if (res.ok) workout = await res.json()

        return {
            workout: workout.data,
            count: res.ok ? workout.count : 0,
            error: !res.ok,
            aborted: false,
        }
    } catch (error) {
        const isAborted = error.name === 'AbortError'

        return {
            workout: undefined,
            count: 0,
            error: !isAborted,
            aborted: isAborted,
        }
    }
}

export const createWorkoutService = async (workout) => {
    const Authorization = localStorage.getItem('Authorization')

    try {
        const res = await fetch(`http://${API_BACKEND}/api/workout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization,
            },
            body: JSON.stringify(workout),
        })

        return res
    } catch (error) {
        return error.message
    }
}

export const editWorkoutService = async (workout) => {
    const { id, ...rest } = workout
    const Authorization = localStorage.getItem('Authorization')

    try {
        const res = await fetch(`http://${API_BACKEND}/api/workout/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization,
            },
            body: JSON.stringify(rest),
        })

        return res
    } catch (error) {
        return error.message
    }
}

export const deleteWorkoutService = async (id) => {
    const Authorization = localStorage.getItem('Authorization')

    try {
        const res = await fetch(`http://${API_BACKEND}/api/workout/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization,
            },
        })

        return res
    } catch (error) {
        return error.message
    }
}

const findAllUrl = (filters) => {
    const url = new URL(`http://${API_BACKEND}/api/workout`)
    const params = {
        _page: filters.page,
        _limit: filters.itemPerPage,
        _sort: filters.sortBy,
    }

    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    )

    return url.href
}

/*const createWorkoutService = async (payload) => {
    try {
        const Authorization = localStorage.getItem('Authorization')

        const res = await api.post('/workout', payload, {
            headers: { Authorization },
        })

        return {
            status: res.status,
        }
    } catch (error) {
        return {
            error: error.response.data,
            status: error.response.status,
        }
    }
}*/
