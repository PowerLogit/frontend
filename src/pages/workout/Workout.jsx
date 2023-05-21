import ListPagination from '@ui/components/pagination/ListPagination'
import { useReducer } from 'react'

import WorkoutFilters from './components/WorkoutFilters'
import WorkoutRows from './components/WorkoutRows'
import { reset } from './libs/actions/filters.action'
import useWorkouts from './libs/hooks/useWorkouts'
import WorkoutFormsProvider from './libs/providers/WorkoutFormsContext.provider'
import {
    filterReducer,
    getFiltersInitialState,
} from './libs/reducers/useFilters.reducer'

const Workout = () => {
    const [filters, dispatchFilters] = useReducer(
        filterReducer,
        getFiltersInitialState()
    )

    const { workouts, totalWorkouts, workoutsLoading, workoutsError } =
        useWorkouts(filters)

    return (
        <div className='max-w-3xl mx-auto px-5 md:px-0 mt-5'>
            <h1 className='text-4xl font -bold text-center mb-4'>Workout</h1>
            <WorkoutFormsProvider
                ressetFilters={() => dispatchFilters(reset())}
            >
                <WorkoutFilters
                    sortBy={filters.sortBy}
                    filterBy={filters.filterBy}
                    dispatchFilters={dispatchFilters}
                />
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
