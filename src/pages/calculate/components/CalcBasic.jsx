import usePlatesCalculator from '../libs/hooks/useFormCalc'
import BarPlates from './BarPlates'
import FormCalc from './FormCalc'

const CalcBasic = ({ weight }) => {
    const { form, numPlates, ...restPlates } = usePlatesCalculator(weight)

    return (
        <div>
            <FormCalc form={form} numPlates={numPlates} {...restPlates} />

            <div className='max-w-sm mx-auto mt-6 flex justify-center'>
                <BarPlates
                    weightBar={form.bar}
                    weightTotal={form.total}
                    numPlates={numPlates}
                />
            </div>
        </div>
    )
}

export default CalcBasic
