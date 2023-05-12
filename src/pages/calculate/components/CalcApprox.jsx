import usePlatesCalculator from '../libs/hooks/useFormCalc'
import BarApprox from './BarApprox'
import FormCalc from './FormCalc'

const CalcApprox = ({ weight }) => {
    const hook = usePlatesCalculator(weight)

    return (
        <div>
            <FormCalc showApprox={true} {...hook} />

            <BarApprox form={hook.form} numPlates={hook.numPlates} />
        </div>
    )
}

export default CalcApprox
