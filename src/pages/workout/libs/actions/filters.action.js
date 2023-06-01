import { FILTERS_ACTION } from '../constant/filtersAction'
import { getFiltersInitialState } from '../reducers/useFilters.reducer'

export const setSortBy = (payload) => ({
    type: FILTERS_ACTION.SET_SORT_BY,
    payload,
})

export const setStartDate = (payload) => ({
    type: FILTERS_ACTION.SET_START_DATE,
    payload,
})

export const setEndDate = (payload) => ({
    type: FILTERS_ACTION.SET_END_DATE,
    payload,
})

export const setAthlete = (payload) => ({
    type: FILTERS_ACTION.SET_ATHLETE,
    payload,
})

export const setCoach = (payload) => ({
    type: FILTERS_ACTION.SET_COACH,
    payload,
})

export const setPage = (payload) => ({
    type: FILTERS_ACTION.SET_PAGE,
    payload,
})

export const setItemPerPage = (payload) => ({
    type: FILTERS_ACTION.SET_ITEM_PER_PAGE,
    payload,
})

export const reset = () => ({
    type: FILTERS_ACTION.RESET,
    payload: getFiltersInitialState(),
})
