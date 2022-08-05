import { useEffect, useState } from 'react'
import style from './workout.module.css'
import axios from '../../config/axios'

const Workout = () => {
    const [workout, setWorkout] = useState({
        data: [],
        loading: false,
        error: null,
        status: null,
    })

    const [params, setParams] = useState({
        startDate: null,
        endDate: null,
    })

    useEffect(() => {
        axiosWorkout(workout, setWorkout, params)
    }, [])

    return (
        <div className={style.wrapper}>
            <h1>Workout</h1>
            {!workout.data.length > 0 && <p>Sin ejercicios</p>}

            <div className={style.container}>
                {workout.data.length > 0 &&
                    workout.data.map((workout) => (
                        <div key={workout.id} className={style.card}>
                            <div>
                                <p>
                                    {workout.name}: {workout.sets}x
                                    {workout.reps}x{workout.weight} Kg
                                </p>
                                <p>{normalizeDate(workout.date)}</p>
                            </div>
                            <div>
                                <p> Edit </p>
                                <p> Delete </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Workout

const normalizeDate = (date) => {
    const newDate = new Date(date).toLocaleString('es-ES', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    return newDate.charAt(0).toUpperCase() + newDate.slice(1)
}

const axiosWorkout = async (workout, setWorkout, params) => {
    setWorkout({ ...workout, loading: true })

    try {
        const Authorization = localStorage.getItem('Authorization')

        const res = await axios.get('/workout', {
            headers: {
                'Content-Type': 'application/json',
                Authorization,
            },
            params,
        })

        setWorkout({
            ...workout,
            data: res.data,
            loading: false,
            status: res.status,
        })
    } catch (error) {
        setWorkout({
            ...workout,
            loading: false,
            error: error.response.data,
            status: error.response.status,
        })
    }
}
