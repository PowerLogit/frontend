import { PAGINATION } from '../../../../constant/pagination'
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
            return { ...FILTERS_INITIAL_STATE }

        default:
            throw new Error('Invalid action type')
    }
}

export const FILTERS_INITIAL_STATE = {
    sortBy: SORT_OPTION.DEFAULT,
    page: PAGINATION.DEFAULT_PAGE,
    itemPerPage: PAGINATION.DEFAULT_ITEM_PER_PAGE,
}
