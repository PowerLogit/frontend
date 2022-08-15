import { SORT_OPTION } from '../constant/workout.sortOption'

export const sortWorkout = (workouts, sortBy) => {
    const sortedWorkout = [...workouts]

    switch (sortBy) {
        case SORT_OPTION.DATE_DESC:
            return sortedWorkout.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            )

        default:
            return sortedWorkout
    }
}

export const paginateWorkout = (workouts, page, limit) => {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    return workouts.slice(startIndex, endIndex)
}
