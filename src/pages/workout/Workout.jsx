import style from './Workout.module.css'
import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import useWorkoutFilters from './libs/hooks/useWorkoutFilters'
import ListPagination from '@ui/components/pagination/ListPagination'
import useWorkout from './libs/hooks/useWorkout'
import WorkoutFormContainer from './components/forms/WorkoutFormContainer'
import WorkoutFormsProvider from './libs/providers/WorkoutFormsContext.provider'

const Workout = () => {
    const { filters, filtersSetters, paginationSetters, ressetFilters } =
        useWorkoutFilters()

    const { workouts, workoutsCount, workoutsLoading, workoutsError } =
        useWorkout(filters)

    return (
        <div className={style.wrapper}>
            <h1>Workout</h1>
            <WorkoutFormsProvider ressetFilters={ressetFilters}>
                <WorkoutFilters sortBy={filters.sortBy} {...filtersSetters} />
                <WorkoutFormContainer />

                <WorkoutRows
                    workouts={workouts}
                    loading={workoutsLoading}
                    error={workoutsError}
                />
            </WorkoutFormsProvider>
            <ListPagination
                page={filters.page}
                itemPerPage={filters.itemPerPage}
                {...paginationSetters}
                totalWorkouts={workoutsCount}
            />
        </div>
    )
}

export default Workout
