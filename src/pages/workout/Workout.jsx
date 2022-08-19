import style from './Workout.module.css'
import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import useWorkoutFilters from './libs/hooks/useWorkoutFilters'
import ListPagination from '@ui/components/pagination/ListPagination'
import useWorkout from './libs/hooks/useWorkout'
import useFormWorkout from './libs/hooks/useFormWorkout'
import Button from '../../components/ui/components/buttons/Button'
import { WORKOUT_FORM } from './libs/constant/workoutForm'
import WorkoutCreateForm from './components/forms/WorkoutCreateForm'
import { paginateWorkout, sortWorkout } from './libs/functions/workout.filter'
import WorkoutFormLayaut from './components/forms/WorkoutFormLayaut'

const Workout = () => {
    const { currentForm, setFiltersForm, setCreateForm } = useFormWorkout()
    const {
        filters,
        pagination,
        filtersSetters,
        paginationSetters,
        ressetFilters,
    } = useWorkoutFilters()

    const {
        workouts,
        workoutsLoading,
        workoutsError,
        reloadWorkouts,
        deleteWorkouts,
    } = useWorkout()

    const { paginatedWorkouts, totalPages } = getWorkoutToDisplay(
        workouts,
        filters,
        pagination
    )

    const onSuccess = () => {
        reloadWorkouts()
        ressetFilters()
        setFiltersForm()
    }

    return (
        <div className={style.wrapper}>
            <h1>Workout</h1>
            {currentForm === WORKOUT_FORM.FILTERS && (
                <WorkoutFilters
                    {...filters}
                    {...filtersSetters}
                    slot={<Button onClick={setCreateForm}> Crear </Button>}
                />
            )}
            {currentForm === WORKOUT_FORM.CREATE && (
                <WorkoutFormLayaut onClose={setFiltersForm}>
                    <WorkoutCreateForm onSuccess={onSuccess} />
                </WorkoutFormLayaut>
            )}
            <WorkoutRows
                workouts={paginatedWorkouts}
                loading={workoutsLoading}
                error={workoutsError}
                deleteWorkouts={deleteWorkouts}
            />
            <ListPagination
                {...pagination}
                {...paginationSetters}
                totalPages={totalPages}
            />
        </div>
    )
}

const getWorkoutToDisplay = (workouts, { sortBy }, { page, itemPerPage }) => {
    const workoutsFiltered = sortWorkout(workouts, sortBy)

    const { paginatedWorkouts, totalPages } = paginateWorkout(
        workoutsFiltered,
        page,
        itemPerPage
    )

    return { paginatedWorkouts, totalPages }
}

export default Workout
