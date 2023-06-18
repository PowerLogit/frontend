import { useAuthContext } from '@auth/libs/context/auth.context'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from '../../../../components/Modal'
import Button from '../../../../components/ui/components/buttons/Button'
import AddCoachRole from './AddCoachRole'
import RemoveCoachRole from './RemoveCoachRole'

const UserToCoach = () => {
    const { t } = useTranslation()
    const { user } = useAuthContext()

    const isCoach = user.role.includes('coach')
    const { title, text, body } = coachMap(isCoach)

    const [modalContent, setModalContent] = useState({ title, body })

    const resetModalContent = () => {
        setModalContent(initialStateModal)
    }

    const setRemoveCoachRole = () => {
        setModalContent({
            title: t(title),
            body: <RemoveCoachRole closeModal={resetModalContent} />,
        })
    }

    const setAddCoachRole = () => {
        setModalContent({
            title: t(title),
            body: <AddCoachRole closeModal={resetModalContent} />,
        })
    }

    const openModal = isCoach ? setRemoveCoachRole : setAddCoachRole

    return (
        <div className='flex flex-col justify-center items-center gap-6 pb-1'>
            <h2 className='text-4xl font-bold'>{t(title)}</h2>
            <p className='text-center whitespace-break-spaces '>{t(text)}</p>
            <Button className='mx-auto' onClick={openModal}>
                {t(title)}
            </Button>
            <Modal title={modalContent.title} closeModal={resetModalContent}>
                {modalContent.body}
            </Modal>
        </div>
    )
}

const coachMap = (isCoach) => {
    if (isCoach)
        return {
            title: 'settings.beingCoach.remove.title',
            text: 'settings.beingCoach.remove.text',
        }

    return {
        title: 'settings.beingCoach.add.title',
        text: 'settings.beingCoach.add.text',
    }
}

const initialStateModal = {
    title: '',
    body: null,
}

export default UserToCoach
