import { io } from 'socket.io-client'
import { NODE_ENV, URL_BACKEND } from '../config/common'

export const connectSocket = (token) => {
    const method = NODE_ENV === 'production' ? 'https' : 'http'
    const URI_WEBSOCKET = URL_BACKEND.replace(method, 'ws')

    return io(URI_WEBSOCKET, {
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        },
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 10,
    })
}
