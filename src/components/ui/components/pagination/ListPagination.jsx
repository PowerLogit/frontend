import style from './ListPagination.module.css'
import Select from '../form/Select'
import PageSelector from './PageSelector'
import { PAGINATION } from '@constant/pagination'

const ListPagination = ({
    page,
    setPage,
    itemPerPage,
    setItemPerPage,
    totalWorkouts,
}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.itemPerPage}>
                <Select
                    value={itemPerPage}
                    onChange={(ev) => setItemPerPage(Number(ev.target.value))}
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
                setPage={setPage}
                totalPages={Math.ceil(totalWorkouts / itemPerPage)}
            />
        </div>
    )
}

export default ListPagination
