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

const Workout = () => {
    const { currentForm, setFiltersForm, setCreateForm } = useFormWorkout()
    const { filters, setSortBy, setPage, setItemPerPage } = useWorkoutFilters()
    const { workouts, loading, error, totalPages, deleteWorkouts } =
        useWorkout(filters)

    return (
        <div className={style.wrapper}>
            <h1>Workout</h1>
            {currentForm === WORKOUT_FORM.FILTERS && (
                <WorkoutFilters
                    sortBy={filters.sortBy}
                    setSortBy={setSortBy}
                    slot={<Button onClick={setCreateForm}> Crear </Button>}
                />
            )}
            {currentForm === WORKOUT_FORM.CREATE && (
                <WorkoutCreateForm onClose={setFiltersForm} />
            )}
            <WorkoutRows
                workouts={workouts}
                loading={loading}
                error={error}
                deleteWorkouts={deleteWorkouts}
            />
            <ListPagination
                page={filters.page}
                setPage={setPage}
                itemPerPage={filters.itemPerPage}
                setItemPerPage={setItemPerPage}
                totalPages={totalPages}
            />
        </div>
    )
}

export default Workout
