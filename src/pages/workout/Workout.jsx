import style from './Workout.module.css'
import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import useWorkoutFilters from './libs/hooks/useWorkoutFilters'
import ListPagination from '@ui/components/pagination/ListPagination'
import useWorkout from './libs/hooks/useWorkout'
import { getWorkoutToDisplay } from './libs/functions/workout.filter'
import WorkoutFormContainer from './components/forms/WorkoutFormContainer'
import WorkoutFormsProvider from './libs/providers/WorkoutFormsContext.provider'

const Workout = () => {
    const {
        filters,
        pagination,
        filtersSetters,
        paginationSetters,
        ressetFilters,
    } = useWorkoutFilters()

    const { workouts, workoutsLoading, workoutsError, reloadWorkouts } =
        useWorkout()

    const { paginatedWorkouts, totalPages } = getWorkoutToDisplay(
        workouts,
        filters,
        pagination
    )

    return (
        <div className={style.wrapper}>
            <h1>Workout</h1>
            <WorkoutFormsProvider
                ressetFilters={ressetFilters}
                reloadWorkouts={reloadWorkouts}
            >
                <WorkoutFilters {...filters} {...filtersSetters} />
                <WorkoutFormContainer />

                <WorkoutRows
                    workouts={paginatedWorkouts}
                    loading={workoutsLoading}
                    error={workoutsError}
                />
            </WorkoutFormsProvider>
            <ListPagination
                {...pagination}
                {...paginationSetters}
                totalPages={totalPages}
            />
        </div>
    )
}

export default Workout
