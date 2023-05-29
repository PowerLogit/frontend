export const normalizeDateUTC = (date) => {
    const newDate = new Date(date).toLocaleString('es-ES', {
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

export const formatDate = (date) => {
    const currentDate = new Date()
    const diff = Math.abs(currentDate - date)

    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(months / 12)

    if (seconds < 60) {
        return `hace ${seconds} segundos`
    } else if (minutes < 60) {
        return `hace ${minutes} minutos`
    } else if (hours < 24) {
        return `hace ${hours} horas`
    } else if (days < 30) {
        return `hace ${days} días`
    } else if (months < 12) {
        return `hace ${months} meses`
    } else {
        return `hace ${years} años`
    }
}

export const getFirstDayOfWeek = () => {
    const firstDayOfWeek = new Date()
    const dayOfWeek = firstDayOfWeek.getDay()

    const diff =
        firstDayOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)

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
