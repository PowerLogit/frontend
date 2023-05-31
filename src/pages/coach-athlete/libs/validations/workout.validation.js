const REGEX = {
    NAME: /^[a-zA-Z ]{1,50}$/,
    SETS: /^[0-9]{1,2}$/,
    REPS: /^[0-9]{1,3}$/,
    WEIGHT: /^[0-9]{1,4}$/,
}

export const validateName = (name) => {
    if (name.includes('  ')) return 'No puede contener doble espacio'
    if (!REGEX.NAME.test(name)) return 'Longitud entre 1 y 50 caracteres'
}

export const validateSets = (set) => {
    if (!REGEX.SETS.test(set)) return 'Valor entre 1 y 99'
    if (set < 1) return 'Series minimas 1'
}

export const validateReps = (rep) => {
    if (!REGEX.REPS.test(rep)) return 'Valor entre 1 y 999'
    if (rep < 1) return 'Repes minimas 1'
}

export const validateWeight = (weight) => {
    if (!REGEX.WEIGHT.test(weight)) return 'Valor entre 1 y 1500'
    if (weight < 1) return 'Peso minimo 1kg'
    if (weight > 1500) return 'Peso maximo 1500kg'
}
