const Plate = ({ discSize }) => {
    const plateStyle = plateStyles[discSize] || {}

    return <div className={`${plateStyle} border`}></div>
}

const plateStyles = {
    [25]: 'w-4 h-60 bg-plate25 border-red-900',
    [20]: 'w-4 h-60 bg-plate20 border-blue-900',
    [15]: 'w-4 h-52 bg-plate15 border-amber-600',
    [10]: 'w-4 h-44 bg-plate10 border-emerald-700',
    [5]: 'w-4 h-36 bg-plate5 border-coolGray-50',
    [2.5]: 'w-4 h-28 bg-plate2.5 border-gray-900',
    [1.25]: 'w-4 h-20 bg-plate1.25 border-gray-600',
}

export default Plate
