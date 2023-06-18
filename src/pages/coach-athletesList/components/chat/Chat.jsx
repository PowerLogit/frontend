import { useAuthContext } from '@auth/libs/context/auth.context'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { connectSocket } from '../../../../api/socket.api'
import MessageOtherChat from '../../../../components/chat/MessageOtherChat'
import MessageOwnerChat from '../../../../components/chat/MessageOwnerChat'
import Button from '../../../../components/ui/components/buttons/Button'
import InputText from '../../../../components/ui/components/form/InputText'

const ChatCoach = () => {
    const { idAthlete, username } = useParams()
    const { t } = useTranslation()

    const { user, token } = useAuthContext()

    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        if (!socket && token) {
            const newSocket = connectSocket(token)
            setSocket(newSocket)
        }

        if (!socket || !user.username) {
            return
        }

        socket.emit('join-coach', idAthlete)

        socket.on('messageHistory', (messageHistory) => {
            setMessages(messageHistory)
        })

        socket.on('newMessage', (newMessage) => {
            setMessages((prev) => [...prev, newMessage])
        })

        return () => {
            socket.off('messageHistory')
            socket.off('newMessage')
        }
    }, [idAthlete, socket, token, user.username])

    if (!socket || !idAthlete || !username) return null

    const handleChange = (ev) => setNewMessage(ev.target.value)

    const sendMessage = () => {
        console.log('sendMessage')

        const message = {
            id: crypto.randomUUID(),
            to: idAthlete,
            text: newMessage,
            date: new Date(),
        }

        socket.emit('sendMessage', message)

        setNewMessage('')
    }

    const handleKeyPress = (ev) => {
        if (ev.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <div className='max-w-md mx-auto h-full'>
            <h1 className='text-4xl font-bold mt-2 mb-6 text-center'>
                @{username}
            </h1>
            <div className='flex flex-col gap-6 justify-between bg-gray-800 p-6'>
                <div className='relative w-full pr-6 overflow-y-auto h-[65vh]'>
                    <ul className='space-y-2'>
                        {!!messages.length &&
                            messages.map(({ id, from, ...restMessage }) => {
                                const MessageChat =
                                    user.username === from
                                        ? MessageOwnerChat
                                        : MessageOtherChat

                                return <MessageChat key={id} {...restMessage} />
                            })}
                    </ul>
                </div>

                <div className='w-full flex gap-4'>
                    <InputText
                        placeholder={t('myCoach.chat.placeholder')}
                        value={newMessage}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className='flex-grow'
                    />
                    <Button onClick={sendMessage} disabled={!newMessage}>
                        {t('myCoach.chat.send')}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatCoach
