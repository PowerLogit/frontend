import { PAGINATION } from '@constant/pagination'

import {
    setLimit,
    setPage,
} from '../../../../pages/workout/libs/actions/filters.action'
import Select from '../form/Select'
import PageSelector from './PageSelector'

const ListPagination = ({ page, limit, dispatchFilters, totalWorkouts }) => {
    if (!totalWorkouts) return

    return (
        <div className='mt-8 flex flex-col justify-center items-center gap-4 sm:flex-row sm:justify-between sm:items-center'>
            <div className='flex items-center gap-4'>
                <Select
                    value={limit}
                    onChange={(ev) =>
                        dispatchFilters(setLimit(Number(ev.target.value)))
                    }
                    className='w-20'
                >
                    {PAGINATION.ITEM_PER_PAGE_OPTIONS.map((value) => (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))}
                </Select>
                <p>Elementos por pagina</p>
            </div>
            <PageSelector
                page={page}
                setPage={(newPage) => dispatchFilters(setPage(newPage))}
                totalPages={Math.ceil(totalWorkouts / limit)}
            />
        </div>
    )
}

export default ListPagination
