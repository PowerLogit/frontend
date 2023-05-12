import usePlates from '../libs/hooks/usePlates'
import Plate from './Plate'

const BarPlates = ({ weightBar, weightTotal, numPlates }) => {
    const plates = usePlates(weightBar, weightTotal, numPlates)

    return (
        <div className='flex items-center gap-1'>
            {plates.map((plate, index) => (
                <Plate key={index} discSize={plate} />
            ))}
        </div>
    )
}

export default BarPlates
