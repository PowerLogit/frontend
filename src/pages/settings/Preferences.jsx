import { FILTERS_OPTION } from '../workout/libs/constant/workoutDateFilterOption'
import Button from '@ui/components/buttons/Button'
import style from './Preferences.module.css'
import { useState } from 'react'

const Preferences = () => {
    const [settings, setSettings] = useState(INITIAL_STATE)

    const setFilterBy = (newFilterBy) =>
        setSettings({ ...settings, filterBy: newFilterBy })

    const setResetSettings = () => setSettings(INITIAL_STATE)

    const isInitialValues = settings.filterBy === filterByDefault

    return (
        <div className={style.wrapper}>
            <h1> Ajustes </h1>
            <form
                onSubmit={(ev) => handleSubmit(ev, settings, setResetSettings)}
                className={style.form}
            >
                <p>Filtro workout por defecto:</p>
                <select
                    defaultValue={settings.filterBy}
                    onChange={(ev) => setFilterBy(ev.target.value)}
                >
                    <option value={FILTERS_OPTION.DAY}>Dia</option>
                    <option value={FILTERS_OPTION.DEFAULT}>Semanal</option>
                    <option value={FILTERS_OPTION.MONTH}>Mes</option>
                    <option value={FILTERS_OPTION.ALL}>Todos</option>
                </select>
                <Button type='submit' disabled={isInitialValues}>
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
