import './WorkoutFilters.module.css'

const WorkoutFilters = ({ sortBy, setSortBy }) => {
    return (
        <form>
            <select
                value={sortBy}
                onChange={(ev) => setSortBy(Number(ev.target.value))}
            >
                <option value={0}>Por defecto</option>
                <option value={1}>Descendente</option>
            </select>
        </form>
    )
}

export default WorkoutFilters
