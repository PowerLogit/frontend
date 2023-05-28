import { Dropdown } from 'flowbite-react'
import { Link } from 'react-router-dom'

import Bell from '../ui/svg/Bell'
import DropdownNotificationRows from './DropdownNotificationRows'

const DropdownNotification = ({ athletesRequest }) => {
    const { data, count, onSuccess, handlers } = athletesRequest

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
                    <span className='italic'> (coaching) </span>
                    {!!count && count}
                </div>
            </Dropdown.Header>
            {!count ? (
                <Dropdown.Item>
                    <span className='italic'>Sin notificaciones</span>
                </Dropdown.Item>
            ) : (
                <>
                    <DropdownNotificationRows
                        data={data}
                        onSuccess={onSuccess}
                        handlers={handlers}
                    />
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <Link to={'/athletes-request'}>
                            Ver todas las solicitudes
                        </Link>
                    </Dropdown.Item>
                </>
            )}
        </Dropdown>
    )
}

export default DropdownNotification
