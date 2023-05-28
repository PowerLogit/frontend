import { Dropdown } from 'flowbite-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import useAthletesRequest from '../../pages/athletesRequest/libs/hooks/useAthletesRequest'
import Bell from '../ui/svg/Bell'
import DropdownNotificationRows from './DropdownNotificationRows'

const DropdownNotification = () => {
    const [filters, setFilters] = useState(initialFilters)
    const { data, count, handlers } = useAthletesRequest(filters)

    const reloadFilters = () =>
        setFilters((prevFilters) => ({
            ...prevFilters,
            change: !prevFilters.change,
        }))

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
            <DropdownNotificationRows
                data={data}
                onSuccess={reloadFilters}
                handlers={handlers}
            />
            <Dropdown.Divider />
            <Dropdown.Item>
                <Link to={'/athletes-request'}>Ver todas las solicitudes</Link>
            </Dropdown.Item>
        </Dropdown>
    )
}

const initialFilters = {
    limit: 8,
    page: 1,
    change: false,
}

export default DropdownNotification
