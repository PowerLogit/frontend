import { SORT_OPTION } from '../constant/workoutSortOption'

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

    const totalPages = Math.ceil(workouts.length / limit)

    const paginatedWorkouts = workouts.slice(startIndex, endIndex)

    return { paginatedWorkouts, totalPages }
}
