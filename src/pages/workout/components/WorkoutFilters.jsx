import { useState } from 'react'

import Modal from '../../../components/Modal'
import Button from '../../../components/ui/components/buttons/Button'
import InputText from '../../../components/ui/components/form/InputText'
import Select from '../../../components/ui/components/form/Select'
import {
    setAthlete,
    setCoach,
    setEndDate,
    setSortBy,
    setStartDate,
} from '../libs/actions/filters.action'
import { SORT_OPTION } from '../libs/constant/workoutSortOption'
import WorkoutCreateForm from './forms/WorkoutCreateForm'
import { Dropdown } from 'flowbite-react'
import InputCheckbox from '../../../components/ui/components/form/InputCheckbox'
import FilterIcon from '../../../components/ui/svg/FilterIcon'

const WorkoutFilters = ({ filters, dispatchFilters }) => {
    const [showModal, setShowModal] = useState(false)

    const handleStringChange = (setValue) => (ev) => {
        dispatchFilters(setValue(ev.target.value))
    }

    const handleNumberChange = (setValue) => (ev) => {
        dispatchFilters(setValue(Number(ev.target.value)))
    }

    const { sortBy, startDate, endDate, athlete, coach } = filters

    return (
        <>
            <Modal
                title={'Crear un nuevo workout'}
                closeModal={() => setShowModal(false)}
            >
                {showModal && (
                    <WorkoutCreateForm closeModal={() => setShowModal(false)} />
                )}
            </Modal>
            <div className='w-full mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 items-end'>
                <Select
                    label='Ordenar'
                    defaultValue={sortBy}
                    onChange={handleNumberChange(setSortBy)}
                >
                    <option value={SORT_OPTION.DEFAULT}>Por defecto</option>
                    <option value={SORT_OPTION.DATE_DESC}>Descendente</option>
                </Select>
                <InputText
                    type='date'
                    label='Seleccionar fecha de inicio'
                    value={startDate}
                    onChange={handleStringChange(setStartDate)}
                />
                <InputText
                    type='date'
                    label='Seleccionar fecha de fin'
                    value={endDate}
                    onChange={handleStringChange(setEndDate)}
                />
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    dismissOnClick={false}
                    label={
                        <div className='w-full flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
                            <FilterIcon />
                            <span>Filtros</span>
                        </div>
                    }
                >
                    <Dropdown.Item>
                        <InputCheckbox
                            label='Atleta'
                            name='Atleta'
                            value={athlete}
                            checked={athlete}
                            onChange={handleStringChange(setAthlete)}
                            className='!flex-row-reverse !justify-start	'
                        />
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <InputCheckbox
                            label='Entrenador'
                            name='Entrenador'
                            value={coach}
                            checked={coach}
                            onChange={handleStringChange(setCoach)}
                            className='!flex-row-reverse !justify-start'
                        />
                    </Dropdown.Item>
                </Dropdown>
                <Button onClick={() => setShowModal(true)}>Crear</Button>
            </div>
        </>
    )
}

export default WorkoutFilters
