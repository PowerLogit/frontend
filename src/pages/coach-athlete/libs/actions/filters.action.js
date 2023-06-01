import { FILTERS_ACTION } from '../constant/filtersAction'
import { getFiltersInitialState } from '../reducers/useFilters.reducer'

export const setSortBy = (sortBy) => ({
    type: FILTERS_ACTION.SET_SORT_BY,
    payload: sortBy,
})

export const setStartDate = (startDate) => ({
    type: FILTERS_ACTION.SET_START_DATE,
    payload: startDate,
})

export const setEndDate = (endDate) => ({
    type: FILTERS_ACTION.SET_END_DATE,
    payload: endDate,
})

export const setPage = (page) => ({
    type: FILTERS_ACTION.SET_PAGE,
    payload: page,
})

export const setlimit = (limit) => ({
    type: FILTERS_ACTION.SET_ITEM_PER_PAGE,
    payload: limit,
})

export const reset = () => ({
    type: FILTERS_ACTION.RESET,
    payload: getFiltersInitialState(),
})
