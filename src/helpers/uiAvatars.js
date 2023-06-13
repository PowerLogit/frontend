export const getAvatar = ({ name, surname }) => {
    const avatarApiUrl = 'https://ui-avatars.com/api?size=96?format=svg'

    return !surname
        ? `${avatarApiUrl}&name=${name}`
        : `${avatarApiUrl}&name=${name}${surname}`
}
