import { PAGINATION } from '../../../../constant/pagination'
import { FILTERS_ACTION } from '../constant/filtersAction'
import { SORT_OPTION } from '../constant/workoutSortOption'
import {
    getFirstDayOfWeek,
    getLastDayOfWeek,
    normalizeDateISO,
} from '../functions/normaliceDate'

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

        case FILTERS_ACTION.SET_ATHLETE:
            return {
                ...state,
                athlete: !state.athlete,
            }

        case FILTERS_ACTION.SET_COACH:
            return {
                ...state,
                coach: !state.coach,
            }

        case FILTERS_ACTION.SET_ITEM_PER_PAGE:
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                itemPerPage: payload,
            }

        case FILTERS_ACTION.RESET:
            return { ...payload }

        default:
            throw new Error('Invalid action type')
    }
}

export const getFiltersInitialState = () => ({
    sortBy: SORT_OPTION.DEFAULT,
    page: PAGINATION.DEFAULT_PAGE,
    startDate: normalizeDateISO(getFirstDayOfWeek()),
    athlete: true,
    coach: false,
    endDate: normalizeDateISO(getLastDayOfWeek()),
    itemPerPage: PAGINATION.DEFAULT_ITEM_PER_PAGE,
})
