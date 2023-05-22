import { useState } from 'react'

import Button from '../../components/ui/components/buttons/Button'
import Select from '../../components/ui/components/form/Select'
import { FILTERS_OPTION } from '../workout/libs/constant/workoutDateFilterOption'

const Preferences = () => {
    const [settings, setSettings] = useState(INITIAL_STATE)

    const setResetSettings = () => setSettings(INITIAL_STATE)

    const handleChange = (ev) => {
        setSettings({
            ...settings,
            [ev.target.name]: ev.target.value,
        })
    }

    const isInitialValues = settings.filterBy === filterByDefault

    return (
        <div className=''>
            <h1 className='text-4xl font-bold mb-6'> Ajustes </h1>
            <form
                onSubmit={(ev) => handleSubmit(ev, settings, setResetSettings)}
                className='max-w-xl'
            >
                <Select
                    label='Filtro workout por defecto'
                    name='filterBy'
                    value={settings.filterBy}
                    onChange={handleChange}
                    className={'w-64 mb-8'}
                >
                    <option value={FILTERS_OPTION.DAY}>Dia</option>
                    <option value={FILTERS_OPTION.DEFAULT}>Semanal</option>
                    <option value={FILTERS_OPTION.MONTH}>Mes</option>
                    <option value={FILTERS_OPTION.ALL}>Todos</option>
                </Select>
                <div className='flex gap-4'>
                    <Button kind='outline' onClick={setResetSettings}>
                        Cancelar
                    </Button>
                    <Button type='submit' disabled={isInitialValues}>
                        Actualizar
                    </Button>
                </div>
            </form>
        </div>
    )
}

const handleSubmit = async (ev, settings) => {
    ev.preventDefault()

    localStorage.setItem('filterDefault', settings.filterBy)
}

const filterByDefault =
    localStorage.getItem('filterDefault') || FILTERS_OPTION.DEFAULT

const INITIAL_STATE = {
    filterBy: filterByDefault,
}

export default Preferences
