import { SORT_OPTION } from '../libs/constant/workoutSortOption'
import './WorkoutFilters.module.css'

const WorkoutFilters = ({ sortBy, setSortBy }) => {
    return (
        <form>
            <select
                value={sortBy}
                onChange={(ev) => setSortBy(Number(ev.target.value))}
            >
                <option value={SORT_OPTION.DEFAULT}>Por defecto</option>
                <option value={SORT_OPTION.DATE_DESC}>Descendente</option>
            </select>
        </form>
    )
}

export default WorkoutFilters
