import { MOVEMENT_APPROX } from '../libs/constant/movement'
import BarPlates from './BarPlates'

const BarApprox = ({ form, numPlates }) => {
    const listApproximations = {
        [MOVEMENT_APPROX.SQ_VOLUMEN]: [30, 54, 80, 90, 100],
        [MOVEMENT_APPROX.SQ_PEAKING]: [25, 42, 60, 71, 82, 89, 94, 100],
        [MOVEMENT_APPROX.BP_VOLUMEN]: [47, 67, 80, 86, 93, 100],
        [MOVEMENT_APPROX.BP_PEAKING]: [25, 45, 58, 70, 82, 89, 95, 100],
        [MOVEMENT_APPROX.DL_VOLUMEN]: [25, 44, 62, 78, 90, 100],
        [MOVEMENT_APPROX.DL_PEAKING]: [22, 38, 54, 71, 85, 93, 100],
    }

    const approximations = listApproximations[form.approx].reverse()
    return (
        <div className='max-w-sm mx-auto mt-6 flex flex-wrap justify-center gap-8'>
            {approximations.map((approx, index) => (
                <BarPlates
                    key={index}
                    weightBar={form.bar}
                    weightTotal={parseFloat((form.total * approx) / 100)}
                    numPlates={numPlates}
                />
            ))}
        </div>
    )
}

export default BarApprox
