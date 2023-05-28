import { Dropdown } from 'flowbite-react'

import PlusUserIcon from '../ui/svg/PlusUserIcon'
import UserMinusIcon from '../ui/svg/UserMinusIcon'

const DropdownNotificationCard = ({ user }) => {
    return (
        <Dropdown.Item>
            {user.name} {user.surname}
            <PlusUserIcon className='h-6 w-6 text-green-400 hover:text-green-500 mx-2' />
            <UserMinusIcon className='h-6 w-6 text-red-600 hover:text-red-700' />
        </Dropdown.Item>
    )
}

export default DropdownNotificationCard
