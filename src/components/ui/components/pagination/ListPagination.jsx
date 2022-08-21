import style from './ListPagination.module.css'
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
    return (
        <div className={style.wrapper}>
            <div className={style.itemPerPage}>
                <Select
                    value={itemPerPage}
                    onChange={(ev) =>
                        dispatchFilters(setItemPerPage(Number(ev.target.value)))
                    }
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
