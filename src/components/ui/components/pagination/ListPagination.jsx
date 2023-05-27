import Select from '../form/Select'
import PageSelector from './PageSelector'
import { PAGINATION } from '@constant/pagination'
import { setItemPerPage, setPage } from '@workout/libs/actions/filters.action'

const ListPagination = ({
    page,
    itemPerPage,
    dispatchFilters,
    totalWorkouts,
}) => {
    if (!totalWorkouts) return

    return (
        <div className='mt-8 flex flex-col justify-center items-center gap-4 sm:flex-row sm:justify-between sm:items-center'>
            <div className='flex items-center gap-4'>
                <Select
                    value={itemPerPage}
                    onChange={(ev) =>
                        dispatchFilters(setItemPerPage(Number(ev.target.value)))
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
                totalPages={Math.ceil(totalWorkouts / itemPerPage)}
            />
        </div>
    )
}

export default ListPagination
