import style from './ListPagination.module.css'
import Select from '../form/Select'
import PageSelector from './PageSelector'

const ListPagination = ({
    page,
    setPage,
    itemPerPage,
    setItemPerPage,
    totalPages,
}) => {
    return (
        <div className={style.wrapper}>
            <div className={style.itemPerPage}>
                <Select
                    value={itemPerPage}
                    onChange={(ev) => setItemPerPage(Number(ev.target.value))}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </Select>
                <p>Elementos por pagina</p>
            </div>
            <PageSelector
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
        </div>
    )
}

export default ListPagination
