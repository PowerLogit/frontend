import style from './Workout.module.css'
import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import useWorkoutFilters from './libs/hooks/useWorkoutFilters'
import ListPagination from '@ui/components/pagination/ListPagination'
import useWorkout from './libs/hooks/useWorkout'

const Workout = () => {
    const { filters, setSortBy, setPage, setItemPerPage } = useWorkoutFilters()
    const { workouts, loading, error, totalPages, deleteWorkouts } =
        useWorkout(filters)

    return (
        <div className={style.wrapper}>
            <h1>Workout</h1>
            <WorkoutFilters sortBy={filters.sortBy} setSortBy={setSortBy} />
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
