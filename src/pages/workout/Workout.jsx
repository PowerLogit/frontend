import style from './Workout.module.css'
import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import ListPagination from '@ui/components/pagination/ListPagination'
import useWorkout from './libs/hooks/useWorkout'
import WorkoutFormContainer from './components/forms/WorkoutFormContainer'
import WorkoutFormsProvider from './libs/providers/WorkoutFormsContext.provider'
import {
    filterReducer,
    FILTERS_INITIAL_STATE,
} from './libs/reducers/useFilters.reducer'
import { useReducer } from 'react'
import { reset } from './libs/actions/filters.action'

const Workout = () => {
    const [filters, dispatchFilters] = useReducer(
        filterReducer,
        FILTERS_INITIAL_STATE
    )

    const { workouts, totalWorkouts, workoutsLoading, workoutsError } =
        useWorkout(filters)

    return (
        <div className={style.wrapper}>
            <h1>Workout</h1>
            <WorkoutFormsProvider
                ressetFilters={() => dispatchFilters(reset())}
            >
                <WorkoutFilters
                    sortBy={filters.sortBy}
                    dispatchFilters={dispatchFilters}
                />
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
                dispatchFilters={dispatchFilters}
                totalWorkouts={totalWorkouts}
            />
        </div>
    )
}

export default Workout
