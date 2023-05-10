import Button from '@ui/components/buttons/Button'
import { useContext } from 'react'

import Select from '../../../components/ui/components/form/Select'
import { setFilterBy, setSortBy } from '../libs/actions/filters.action'
import { FILTERS_OPTION } from '../libs/constant/workoutDateFilterOption'
import { WORKOUT_FORM } from '../libs/constant/workoutForm'
import { SORT_OPTION } from '../libs/constant/workoutSortOption'
import { WorkoutFormsContext } from '../libs/context/WorkoutForms.context'

const WorkoutFilters = ({ sortBy, filterBy, dispatchFilters }) => {
    const { currentForm, setCreateForm } = useContext(WorkoutFormsContext)

    if (currentForm !== WORKOUT_FORM.FILTERS) return null

    const handleInputChange = (setValue) => (ev) => {
        dispatchFilters(setValue(Number(ev.target.value)))
    }

    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6'>
            <Select
                className='col-span-1'
                defaultValue={sortBy}
                onChange={handleInputChange(setSortBy)}
            >
                <option value={SORT_OPTION.DEFAULT}>Por defecto</option>
                <option value={SORT_OPTION.DATE_DESC}>Descendente</option>
            </Select>
            <Select
                className='col-span-1'
                defaultValue={filterBy}
                onChange={handleInputChange(setFilterBy)}
            >
                <option value={FILTERS_OPTION.DAY}>Dia</option>
                <option value={FILTERS_OPTION.DEFAULT}>Semanal</option>
                <option value={FILTERS_OPTION.MONTH}>Mes</option>
                <option value={FILTERS_OPTION.ALL}>Todos</option>
            </Select>
            <Button
                className='col-span-2 sm:col-span-1'
                onClick={setCreateForm}
            >
                Crear
            </Button>
        </div>
    )
}

export default WorkoutFilters
