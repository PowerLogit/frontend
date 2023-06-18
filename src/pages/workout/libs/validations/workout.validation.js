export const validateName = (name) => {
    if (!name) return 'workouts.errors.name.required'
    if (name.includes('  ')) return 'workouts.errors.name.doubleSpace'
    if (name.length > 50) return 'workouts.errors.name.max'
}

export const validateSets = (set) => {
    if (!set) return 'workouts.errors.sets.required'
    if (isNaN(set)) return 'workouts.errors.sets.number'
    if (set < 1) return 'workouts.errors.sets.min'
    if (set > 99) return 'workouts.errors.sets.max'
}

export const validateReps = (rep) => {
    if (!rep) return 'workouts.errors.reps.required'
    if (isNaN(rep)) return 'workouts.errors.reps.number'
    if (rep < 1) return 'workouts.errors.reps.min'
    if (rep > 999) return 'workouts.errors.reps.max'
}

export const validateWeight = (weight) => {
    if (!weight) return 'workouts.errors.weight.required'

    if (!/^(\d+@\d+|\d+|@\d+)$/.test(weight))
        return 'workouts.errors.weight.invalidFormat'

    const numericValue = parseInt(weight.split('@')[0])
    if (!!numericValue && numericValue < 1) return 'workouts.errors.weight.min'
    if (!!numericValue && numericValue > 1999)
        return 'workouts.errors.weight.max'
}
