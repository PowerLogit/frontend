const MessageOtherChat = (message) => {
    const { text, date } = message
    const dateFormatted = new Date(date).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })

    return (
        <li className='flex justify-start'>
            <div className='relative max-w-sm px-4 py-2 bg-blue-600 text-white rounded shadow break-words'>
                <p className='block'>{text}</p>
                <p className='text-xs'>{dateFormatted}</p>
            </div>
        </li>
    )
}

export default MessageOtherChat
