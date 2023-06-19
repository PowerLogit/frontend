import ListPagination from '@ui/components/pagination/ListPagination'
import { useReducer } from 'react'
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

    const [filters, dispatchFilters] = useReducer(
        filterReducer,
        getFiltersInitialState()
    )

    const { workouts, totalWorkouts, workoutsLoading, workoutsError } =
        useWorkouts(filters)

    return (
        <div className='max-w-3xl mx-auto px-5 md:px-0 mt-4'>
            <h1 className='text-4xl text-center font-bold mb-8'>
                {t('workouts.title')}
            </h1>
            <WorkoutFormsProvider
                ressetFilters={() => dispatchFilters(reset())}
            >
                <WorkoutFilters
                    filters={filters}
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
                limit={filters.limit}
                dispatchFilters={dispatchFilters}
                totalWorkouts={totalWorkouts}
            />
        </div>
    )
}

export default Workout
