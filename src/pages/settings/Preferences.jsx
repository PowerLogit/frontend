import { FILTERS_OPTION } from '../workout/libs/constant/workoutDateFilterOption'
import Button from '@ui/components/buttons/Button'
import { useState } from 'react'
import Select from '../../components/ui/components/form/Select'

const Preferences = () => {
    const [settings, setSettings] = useState(INITIAL_STATE)

    const setFilterBy = (newFilterBy) =>
        setSettings({ ...settings, filterBy: newFilterBy })

    const setResetSettings = () => setSettings(INITIAL_STATE)

    const isInitialValues = settings.filterBy === filterByDefault

    return (
        <div className='max-w-xl mx-auto mt-6 px-5 md:px-0'>
            <h1 className='text-4xl font-bold text-center mb-4'> Ajustes </h1>
            <form
                onSubmit={(ev) => handleSubmit(ev, settings, setResetSettings)}
                className='max-w-xl'
            >
                <Select
                    label='Filtro workout por defecto'
                    name='filterBy'
                    defaultValue={settings.filterBy}
                    onChange={(ev) => setFilterBy(ev.target.value)}
                    className={'w-32'}
                >
                    <option value={FILTERS_OPTION.DAY}>Dia</option>
                    <option value={FILTERS_OPTION.DEFAULT}>Semanal</option>
                    <option value={FILTERS_OPTION.MONTH}>Mes</option>
                    <option value={FILTERS_OPTION.ALL}>Todos</option>
                </Select>
                <Button
                    type='submit'
                    disabled={isInitialValues}
                    className='mt-8'
                >
                    Guardar
                </Button>
            </form>
        </div>
    )
}

const filterByDefault =
    localStorage.getItem('filterDefault') || FILTERS_OPTION.DEFAULT

const handleSubmit = (ev, settings, setResetSettings) => {
    ev.preventDefault()

    localStorage.setItem('filterDefault', settings.filterBy)

    setResetSettings()
}

const INITIAL_STATE = {
    filterBy: filterByDefault,
}

export default Preferences
