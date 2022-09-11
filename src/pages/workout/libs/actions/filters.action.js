import { FILTERS_ACTION } from '../constant/filtersAction'

export const setSortBy = (sortBy) => ({
    type: FILTERS_ACTION.SET_SORT_BY,
    payload: sortBy,
})

export const setFilterBy = (filterBy) => ({
    type: FILTERS_ACTION.SET_FILTER_BY,
    payload: filterBy,
})

export const setPage = (page) => ({
    type: FILTERS_ACTION.SET_PAGE,
    payload: page,
})

export const setItemPerPage = (itemPerPage) => ({
    type: FILTERS_ACTION.SET_ITEM_PER_PAGE,
    payload: itemPerPage,
})

export const reset = () => ({
    type: FILTERS_ACTION.RESET,
})
