import { Avatar, Dropdown } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'

import { dropdownHeaderPages } from '../../constant/headerPages'
import { removeBearer } from '../../helpers/bearer.helper'
import useAvatar from '../../hooks/useAvatar'
import { setIsNotAuth } from '../../pages/auth/libs/actions/auth.action'
import { useTranslation } from 'react-i18next'
import { getRoleFormat } from '../../helpers/roleFormat'

const DropdownHeader = ({ dispatchAuth, user }) => {
    const { t, i18n } = useTranslation()

    const { avatar } = useAvatar(user)
    const navigate = useNavigate()

    const handleLogOut = () => {
        removeBearer()
        dispatchAuth(setIsNotAuth())
        navigate('/')
    }

    const rolesFormat = getRoleFormat(user.role, i18n.language)

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
                        <Link to={url}>{t(title)}</Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => handleLogOut()}>
                    {t('header.auth.logout')}
                </Dropdown.Item>
            </Dropdown>
        </>
    )
}

export default DropdownHeader
