import { useState } from 'react'

import Modal from '../../../components/Modal'
import Button from '../../../components/ui/components/buttons/Button'
import InputText from '../../../components/ui/components/form/InputText'
import Select from '../../../components/ui/components/form/Select'
import {
    setEndDate,
    setSortBy,
    setStartDate,
} from '../libs/actions/filters.action'
import { SORT_OPTION } from '../libs/constant/workoutSortOption'
import WorkoutCreateForm from './forms/WorkoutCreateForm'

const WorkoutFilters = ({ filters, dispatchFilters }) => {
    const [showModal, setShowModal] = useState(false)

    const handleDateChange = (setValue) => (ev) => {
        dispatchFilters(setValue(ev.target.value))
    }

    const handleInputChange = (setValue) => (ev) => {
        dispatchFilters(setValue(Number(ev.target.value)))
    }

    const { sortBy, startDate, endDate } = filters

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
            <div className='w-full mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-end'>
                <Select
                    label='Ordenar'
                    defaultValue={sortBy}
                    onChange={handleInputChange(setSortBy)}
                >
                    <option value={SORT_OPTION.DEFAULT}>Por defecto</option>
                    <option value={SORT_OPTION.DATE_DESC}>Descendente</option>
                </Select>
                <InputText
                    type='date'
                    label='Seleccionar fecha de inicio'
                    value={startDate}
                    onChange={handleDateChange(setStartDate)}
                />
                <InputText
                    type='date'
                    label='Seleccionar fecha de fin'
                    value={endDate}
                    onChange={handleDateChange(setEndDate)}
                />
                <Button onClick={() => setShowModal(true)} className='order-12'>
                    Crear
                </Button>
            </div>
        </>
    )
}

export default WorkoutFilters
