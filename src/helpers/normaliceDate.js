export const normalizeDateUTC = (date, language = 'es') => {
    language = language === 'es' ? 'es-ES' : 'en-EN'

    const newDate = new Date(date).toLocaleString(language, {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    return newDate.charAt(0).toUpperCase() + newDate.slice(1)
}

export const normalizeDateISO = (date) => {
    const newDate = new Date(date).toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })

    return newDate.split('/').reverse().join('-')
}

export const formatDateAgo = (date, t) => {
    const currentDate = new Date()
    const diff = Math.abs(currentDate - date)

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (seconds < 60) {
        return t('common.formatDateAgo.seconds', { seconds })
    } else if (minutes < 60) {
        return t('common.formatDateAgo.minutes', { minutes })
    } else if (hours < 24) {
        return t('common.formatDateAgo.hours', { hours })
    } else if (days < 30) {
        return t('common.formatDateAgo.days', { days })
    } else if (months < 12) {
        return t('common.formatDateAgo.months', { months })
    } else {
        return t('common.formatDateAgo.years', { years })
    }
}

export const getFirstDayOfWeek = () => {
    const firstDayOfWeek = new Date()
    const dayOfWeek = firstDayOfWeek.getDay() - 1

    const diff =
        firstDayOfWeek.getDate() - dayOfWeek + (dayOfWeek === -1 ? -6 : 1)

    firstDayOfWeek.setDate(diff)
    firstDayOfWeek.setHours(0, 0, 0, 0)

    return firstDayOfWeek.toISOString().slice(0, 10)
}

export const getLastDayOfWeek = () => {
    const lastDayOfWeek = new Date()
    const dayOfWeek = lastDayOfWeek.getDay()

    const diff = 6 - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)

    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + diff)
    lastDayOfWeek.setHours(23, 59, 59, 999)

    return lastDayOfWeek.toISOString().slice(0, 10)
}
