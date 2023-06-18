export const extractValuesFromForm = (form) => {
    return Object.keys(form).reduce((result, key) => {
        result[key] = form[key].value
        return result
    }, {})
}
