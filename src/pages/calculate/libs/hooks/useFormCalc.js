import { useState } from 'react'
import { MOVEMENT_APPROX } from '../constant/movement'

const usePlatesCalculator = (initialWeight) => {
    const [form, setForm] = useState({
        bar: 20,
        total: initialWeight ?? 0,
        approx: MOVEMENT_APPROX.SQ_VOLUMEN,
    })
    const [numPlates, setNumPlates] = useState(initialStateNumPlates)

    const handleChange = (ev) => {
        const { name, value } = ev.target
        if (value < 0 || value > 999) return

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }))
    }

    const handleChangeNumPlate = (ev) => {
        const { name, value } = ev.target
        if (value < 0 || value > 99) return

        setNumPlates((prevNumPlates) => ({
            ...prevNumPlates,
            [name]: value,
        }))
    }

    const toggleCheckbox = () => {
        setNumPlates(
            numPlates.isActive
                ? { ...initialStateNumPlates, isActive: false }
                : { ...numPlates, isActive: true }
        )
    }

    return {
        form,
        numPlates,
        handleChange,
        handleChangeNumPlate,
        toggleCheckbox,
    }
}

const initialStateNumPlates = {
    isActive: false,
    plate25: 8,
    plate20: 8,
    plate15: 8,
    plate10: 8,
    plate5: 8,
    'plate2.5': 8,
    'plate1.25': 8,
}

export default usePlatesCalculator
