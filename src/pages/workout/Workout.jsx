import style from './Workout.module.css'
import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import UseWorkoutFilters from './libs/hooks/UseWorkoutFilters'
import { WorkoutContext } from './libs/context/Workout.context'
import { useContext } from 'react'
import { paginateWorkout, sortWorkout } from './libs/functions/workout.filter'
import ListPagination from '../../components/ui/components/pagination/ListPagination'

const Workout = () => {
    const { filters, setSortBy, setPage, setItemPerPage } = UseWorkoutFilters()
    const { data } = useContext(WorkoutContext)

    const { workouts, totalPages } = getWorkout(data, filters)

    return (
        <div className={style.wrapper}>
            <h1>Workout</h1>
            <WorkoutFilters sortBy={filters.sortBy} setSortBy={setSortBy} />
            <WorkoutRows workouts={workouts} />
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

const getWorkout = (workouts, { sortBy, page, itemPerPage }) => {
    let workoutsFiltered = sortWorkout(workouts, sortBy)

    const totalPages = Math.ceil(workouts.length / itemPerPage)

    workoutsFiltered = paginateWorkout(workoutsFiltered, page, itemPerPage)

    return { workouts: workoutsFiltered, totalPages }
}

export default Workout
