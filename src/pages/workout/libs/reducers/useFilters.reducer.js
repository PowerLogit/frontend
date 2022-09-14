import { PAGINATION } from '../../../../constant/pagination'
import { FILTERS_ACTION } from '../constant/filtersAction'
import { FILTERS_OPTION } from '../constant/workoutDateFilterOption'
import { SORT_OPTION } from '../constant/workoutSortOption'

export const filterReducer = (state, { type, payload }) => {
    switch (type) {
        case FILTERS_ACTION.SET_SORT_BY:
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                sortBy: payload,
            }

        case FILTERS_ACTION.SET_FILTER_BY:
            return {
                ...state,
                page: PAGINATION.DEFAULT_PAGE,
                filterBy: payload,
            }

        case FILTERS_ACTION.SET_PAGE:
            return {
                ...state,
                page: payload,
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
    filterBy: localStorage.getItem('filterDefault') || FILTERS_OPTION.DEFAULT,
    page: PAGINATION.DEFAULT_PAGE,
    itemPerPage: PAGINATION.DEFAULT_ITEM_PER_PAGE,
})
