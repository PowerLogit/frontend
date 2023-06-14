import React, { useState } from 'react'

import Modal from '../../../../components/Modal'
import PencilIcon from '../../../../components/ui/svg/PencilIcon'
import useAvatar from '../../../../hooks/useAvatar'
import { useAuthContext } from '../../../auth/libs/context/auth.context'
import UserAvatarForm from './UserAvatarForm'

const UserAvatarModal = () => {
    const { user } = useAuthContext()
    const { avatar, avatarAlt } = useAvatar(user)

    const [showModal, setShowModal] = useState(false)

    const closeModal = () => setShowModal(false)

    return (
        <div className='relative w-36 h-36 mx-auto'>
            <img
                className='w-36 h-36 rounded-full shadow-lg'
                src={avatar}
                alt={avatarAlt}
            />
            <button
                type='button'
                className='absolute top-0 right-0 transform -translate-y-1/2 w-3.5 h-3.5'
                onClick={() => setShowModal(true)}
            >
                <PencilIcon />
            </button>
            {showModal && (
                <Modal title='Cambiar foto de perfil' closeModal={closeModal}>
                    <UserAvatarForm closeModal={closeModal} />
                </Modal>
            )}
        </div>
    )
}

export default UserAvatarModal
