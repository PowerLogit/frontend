import Button from '@ui/components/buttons/Button'
import { useContext } from 'react'
import { setFilterBy, setSortBy } from '../libs/actions/filters.action'
import { FILTERS_OPTION } from '../libs/constant/workoutDateFilterOption'
import { WORKOUT_FORM } from '../libs/constant/workoutForm'
import { SORT_OPTION } from '../libs/constant/workoutSortOption'
import { WorkoutFormsContext } from '../libs/context/WorkoutForms.context'
import style from './WorkoutFilters.module.css'

const WorkoutFilters = ({ sortBy, filterBy, dispatchFilters }) => {
    const { currentForm, setCreateForm } = useContext(WorkoutFormsContext)

    if (currentForm !== WORKOUT_FORM.FILTERS) return null

    return (
        <div className={style.wrapper}>
            <select
                defaultValue={sortBy}
                onChange={(ev) =>
                    dispatchFilters(setSortBy(Number(ev.target.value)))
                }
            >
                <option value={SORT_OPTION.DEFAULT}>Por defecto</option>
                <option value={SORT_OPTION.DATE_DESC}>Descendente</option>
            </select>
            <select
                defaultValue={filterBy}
                onChange={(ev) =>
                    dispatchFilters(setFilterBy(Number(ev.target.value)))
                }
            >
                <option value={FILTERS_OPTION.DAY}>Dia</option>
                <option value={FILTERS_OPTION.DEFAULT}>Semanal</option>
                <option value={FILTERS_OPTION.MONTH}>Mes</option>
                <option value={FILTERS_OPTION.ALL}>Todos</option>
            </select>
            <Button onClick={setCreateForm}> Crear </Button>
        </div>
    )
}

export default WorkoutFilters
