import { useAuthContext } from '@auth/libs/context/auth.context'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from '../../../../components/Modal'
import Button from '../../../../components/ui/components/buttons/Button'
import AddAthleteRole from './AddAthleteRole'
import RemoveAthleteRole from './RemoveAthleteRole'

const UserToAthlete = () => {
    const { t } = useTranslation()
    const { user } = useAuthContext()

    const isAthlete = user.role.includes('athlete')
    const { title, text, body } = athleteMap(isAthlete)

    const [modalContent, setModalContent] = useState({ title, body })

    const resetModalContent = () => {
        setModalContent(initialStateModal)
    }

    const setRemoveAthleteRole = () => {
        setModalContent({
            title: t(title),
            body: <RemoveAthleteRole closeModal={resetModalContent} />,
        })
    }

    const setAddAthleteRole = () => {
        setModalContent({
            title: t(title),
            body: <AddAthleteRole closeModal={resetModalContent} />,
        })
    }

    const openModal = isAthlete ? setRemoveAthleteRole : setAddAthleteRole

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

const athleteMap = (isAthlete) => {
    if (isAthlete)
        return {
            title: 'settings.beingAthlete.remove.title',
            text: 'settings.beingAthlete.remove.text',
        }

    return {
        title: 'settings.beingAthlete.add.title',
        text: 'settings.beingAthlete.add.text',
    }
}

const initialStateModal = {
    title: '',
    body: null,
}

export default UserToAthlete
