const MessageOwnerChat = (message) => {
    const { text, date } = message
    const dateFormatted = new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })

    return (
        <li className='flex justify-end'>
            <div className='relative max-w-sm px-4 py-2 bg-gray-300 text-gray-600 rounded shadow break-words'>
                <p className='block'>{text}</p>
                <p className='text-gray-600 text-right text-xs'>
                    {dateFormatted}
                </p>
            </div>
        </li>
    )
}

export default MessageOwnerChat
