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

export const validateSets = (name) => {
    if (!REGEX.SETS.test(name)) return 'Longitud entre 1 y 2 numeros'
}

export const validateReps = (name) => {
    if (!REGEX.REPS.test(name)) return 'Longitud entre 1 y 3 numeros'
}

export const validateWeight = (name) => {
    if (!REGEX.WEIGHT.test(name)) return 'Longitud 1 y 4 numeros'
}
