import { useState } from 'react'

import InputText from '../../../components/ui/components/form/InputText'
import BarPlates from './BarPlates'

const CalcAprox = () => {
    const [form, setForm] = useState({
        bar: 20,
        total: 0,
    })

    const handleChange = (ev) => {
        setForm({
            ...form,
            [ev.target.name]: ev.target.value,
        })
    }

    const approximations = [100, 90, 80, 54, 30]

    return (
        <div>
            <div className='max-w-sm mx-auto mt-6 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <form className='space-y-4 md:space-y-6'>
                        <InputText
                            type='number'
                            name='bar'
                            label='Peso de la barra'
                            placeholder='20'
                            onChange={handleChange}
                            value={form.bar}
                        />

                        <InputText
                            type='number'
                            name='total'
                            label='Peso total'
                            placeholder='666'
                            onChange={handleChange}
                            value={form.total}
                        />
                    </form>
                </div>
            </div>

            <div className='max-w-sm mx-auto mt-6 flex flex-wrap justify-center gap-8'>
                {approximations.map((approx, index) => (
                    <BarPlates
                        key={index}
                        weightBar={form.bar}
                        weightTotal={parseFloat((form.total * approx) / 100)}
                    />
                ))}
            </div>
        </div>
    )
}

export default CalcAprox
