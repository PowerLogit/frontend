import { Avatar, Dropdown } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'

import { dropdownHeaderPages } from '../../constant/headerPages'
import { removeBearer } from '../../helpers/bearer.helper'
import useAvatar from '../../hooks/useAvatar'
import { setIsNotAuth } from '../../pages/auth/libs/actions/auth.action'

const DropdownHeader = ({ dispatchAuth, user }) => {
    const { avatar } = useAvatar(user)
    const navigate = useNavigate()

    const handleLogOut = () => {
        removeBearer()
        dispatchAuth(setIsNotAuth())
        navigate('/')
    }

    const roles = user?.role.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    const rolesFormat = new Intl.ListFormat('es-ES').format(roles)

    return (
        <>
            <Dropdown
                arrowIcon={true}
                inline={true}
                label={
                    <>
                        <Avatar
                            alt='User settings'
                            img={avatar}
                            rounded={true}
                        />
                        <span className='ml-3 text-sm font-medium'>
                            {user?.username}
                        </span>
                    </>
                }
            >
                <Dropdown.Header>
                    <div className='font-medium '>{rolesFormat}</div>
                    <div className='truncate'>{user?.email}</div>
                </Dropdown.Header>
                {dropdownHeaderPages.map(({ title, url }, index) => (
                    <Dropdown.Item key={index}>
                        <Link to={url}>{title}</Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleLogOut()}>
                    Cerrar sesión
                </Dropdown.Item>
            </Dropdown>
        </>
    )
}

export default DropdownHeader
