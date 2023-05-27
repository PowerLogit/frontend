export const getAvatar = (name, surname) => {
    if (!surname)
        return `https://ui-avatars.com/api/?name=${name}&size=96?format=svg`

    return `https://ui-avatars.com/api/?name=${name}+${surname}&size=96?format=svg`
}
