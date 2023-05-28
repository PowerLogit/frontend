import { Dropdown } from 'flowbite-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import useAthletesRequest from '../../hooks/useAthletesRequest'
import Bell from '../ui/svg/Bell'

const DropdownNotification = () => {
    const [filters] = useState(initialFilters)
    const { count } = useAthletesRequest(filters)

    return (
        <Dropdown
            arrowIcon={false}
            inline={true}
            placement='bottom'
            label={<Bell active={count} />}
        >
            <Dropdown.Header>
                <div>
                    <span className='font-bold'>Notificaciones </span>
                    <span className='italic'> (coaching) </span> {count}
                </div>
            </Dropdown.Header>
            <Dropdown.Item>
                <Link to={'/athletes-request'}>Ver todas las solicitudes</Link>
            </Dropdown.Item>
        </Dropdown>
    )
}

const initialFilters = {
    limit: 5,
    page: 1,
}

export default DropdownNotification
