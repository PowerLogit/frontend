/* eslint-disable react-hooks/exhaustive-deps */
import { api, sourceCancelToken } from '@api/axios.api'
import { useEffect, useState } from 'react'
import { getAvatar } from '../helpers/uiAvatars'

const useAvatar = (user) => {
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        const cancelToken = sourceCancelToken()

        fetchAvatar(user, setAvatar, cancelToken)

        return () => {
            cancelToken.cancel()

            if (avatar) {
                URL.revokeObjectURL(avatar)
            }
        }
    }, [user])

    return {
        avatar,
        avatarAlt: `Avatar ${user.username}`,
    }
}

const fetchAvatar = async (user, setAvatar, cancelToken) => {
    try {
        const { data, status } = await api({
            method: 'GET',
            url: `/users/avatar/${user.username}`,
            responseType: 'arraybuffer',
            cancelToken,
        })

        const isOk = status === 200
        if (!isOk) {
            throw new Error()
        }

        const blob = new Blob([data])
        const imageUrl = URL.createObjectURL(blob)
        setAvatar(imageUrl)
    } catch (error) {
        const avatarUrl = getAvatar(user)
        setAvatar(avatarUrl)
    }
}

export default useAvatar
