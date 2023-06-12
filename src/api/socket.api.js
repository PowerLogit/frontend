import { io } from 'socket.io-client'

export const connectSocket = (token) => {
    return io('http://127.0.0.1:3201/private-chat', {
        extraHeaders: {
            Authorization: `Bearer ${token}`,
        },
    })
}
