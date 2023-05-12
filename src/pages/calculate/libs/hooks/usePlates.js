const usePlates = (weightBar, weightTotal, numPlates) => {
    const weights = [25, 20, 15, 10, 5, 2.5, 1.25]
    const plates = []

    let weightPlates = (weightTotal - weightBar) / 2

    if (weightTotal % 2 === 0) weightPlates += 0.25
    else if (weightTotal % 10 === 7) weightPlates += 0.75

    for (const weight of weights) {
        const plateKey = `plate${weight}`
        let maxPlates = Number(numPlates[plateKey])

        while (weightPlates >= weight && maxPlates > 0) {
            weightPlates -= weight
            plates.push(weight)
            maxPlates--
        }
    }

    return plates
}

export default usePlates
