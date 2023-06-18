export const getRoleFormat = (role, language) => {
    language = language === 'es' ? 'es-ES' : 'en-EN'

    const roles = role.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    const roleFormat = new Intl.ListFormat(language).format(roles)

    return roleFormat
}
