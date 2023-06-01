import { PAGINATION } from '../../../../constant/pagination'
import {
    getFirstDayOfWeek,
    getLastDayOfWeek,
} from '../../../../helpers/normaliceDate'
import { FILTERS_ACTION } from '../constant/filtersAction'
import { SORT_OPTION } from '../constant/workoutSortOption'

export const filterReducer = (state, { type, payload }) => {
    switch (type) {
        case FILTERS_ACTION.SET_SORT_BY:
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                sortBy: payload,
            }

        case FILTERS_ACTION.SET_START_DATE:
            if (payload > state.endDate) return state

            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                startDate: payload,
            }

        case FILTERS_ACTION.SET_END_DATE:
            if (payload < state.startDate) return state

            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                endDate: payload,
            }

        case FILTERS_ACTION.SET_PAGE:
            return {
                ...state,
                page: payload,
            }

        case FILTERS_ACTION.SET_LIMIT:
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                limit: payload,
            }

        case FILTERS_ACTION.RESET:
            return { ...payload }

        default:
            throw new Error('Invalid action type')
    }
}

export const getFiltersInitialState = () => ({
    sortBy: SORT_OPTION.DEFAULT,
    startDate: getFirstDayOfWeek(),
    endDate: getLastDayOfWeek(),
    page: PAGINATION.DEFAULT_PAGE,
    limit: PAGINATION.DEFAULT_ITEM_PER_PAGE,
})
