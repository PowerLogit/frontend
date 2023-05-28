import { Dropdown } from 'flowbite-react'
import { useState } from 'react'

import PlusUserIcon from '../ui/svg/PlusUserIcon'
import UserMinusIcon from '../ui/svg/UserMinusIcon'

const DropdownNotificationCard = ({ user, onSuccess, handlers }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleAccept = async () =>
        handlers.handleAccept(user.id, setIsSubmitting, onSuccess)

    const onHandleReject = async () =>
        handlers.handleReject(user.id, setIsSubmitting, onSuccess)
    return (
        <Dropdown.Item>
            {user.name} {user.surname}
            {isSubmitting ? (
                'Cargando...'
            ) : (
                <>
                    <PlusUserIcon
                        onClick={onHandleAccept}
                        className='h-6 w-6 text-green-400 hover:text-green-500 mx-2'
                    />
                    <UserMinusIcon
                        onClick={onHandleReject}
                        className='h-6 w-6 text-red-600 hover:text-red-700'
                    />
                </>
            )}
        </Dropdown.Item>
    )
}

export default DropdownNotificationCard
