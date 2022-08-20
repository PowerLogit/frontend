import api from '@api/axios'

export const fetchWorkoutService = async (params) => {
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

export const getWorkoutService = async (signal) => {
    try {
        const Authorization = localStorage.getItem('Authorization')

        const res = await fetch('http://192.168.0.90:3100/api/workout', {
            headers: {
                'Content-Type': 'application/json',
                Authorization,
            },
            signal,
        })

        let workout

        if (res.ok) workout = await res.json()

        return {
            workout,
            error: !res.ok,
            aborted: false,
        }
    } catch (error) {
        const isAborted = error.name === 'AbortError'

        return {
            workout: undefined,
            error: !isAborted,
            aborted: isAborted,
        }
    }
}

export const createWorkoutService = async (workout) => {
    try {
        const Authorization = localStorage.getItem('Authorization')

        const res = await fetch('http://192.168.0.90:3100/api/workout', {
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
        const res = await fetch(`http://192.168.0.90:3100/api/workout/${id}`, {
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
        const res = await fetch(`http://192.168.0.90:3100/api/workout/${id}`, {
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
