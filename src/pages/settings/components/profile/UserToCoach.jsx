import { useAuthContext } from '@auth/libs/context/auth.context'
import { useState } from 'react'

import Modal from '../../../../components/Modal'
import Button from '../../../../components/ui/components/buttons/Button'
import AddCoachRole from './AddCoachRole'
import RemoveCoachRole from './RemoveCoachRole'

const UserToCoach = () => {
    const { user } = useAuthContext()

    const isCoach = user.role.includes('coach')
    const { title, text, body } = coachMap(isCoach)

    const [modalContent, setModalContent] = useState({ title, body })

    const resetModalContent = () => {
        setModalContent(initialStateModal)
    }

    const setRemoveCoachRole = () => {
        setModalContent({
            title: 'Dejar de ser Entrenador',
            body: <RemoveCoachRole closeModal={resetModalContent} />,
        })
    }

    const setAddCoachRole = () => {
        setModalContent({
            title: 'Convertirse en Entrenador',
            body: <AddCoachRole closeModal={resetModalContent} />,
        })
    }

    const openModal = isCoach ? setRemoveCoachRole : setAddCoachRole

    return (
        <div className='flex flex-col justify-center items-center gap-6 pb-1'>
            <h2 className='text-4xl font-bold'>{title}</h2>
            <p className='text-center whitespace-break-spaces '>{text}</p>
            <Button className='mx-auto' onClick={openModal}>
                {title}
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
            title: 'Dejar de ser Entrenador',
            text: 'Entendemos que las circunstancias pueden cambiar y que es posible que ya no desees ejercer como entrenador en PowerLog. Si has decidido dejar de ser entrenador, queremos asegurarnos de que estás tomando la decisión correcta. \nAl dejar de ser entrenador, perderás la capacidad de crear programas de entrenamiento personalizados, así como de brindar apoyo y orientación a los atletas. \nSi estás seguro de que deseas dejar de ser entrenador, haz clic en el botón "Dejar de ser Entrenador" a continuación.',
        }

    return {
        title: 'Convertirse en Entrenador',
        text: '¡Gracias por tu interés en convertirte en entrenador! Al hacerlo, tendrás la oportunidad de compartir tus conocimientos y experiencia con otros atletas, ayudándoles a alcanzar sus metas y mejorar su desempeño en el powerlifting. \nAl convertirte en entrenador, podrás crear programas de entrenamiento personalizados, realizar un seguimiento del progreso de tus atletas y brindarles el apoyo y la orientación necesarios para alcanzar su máximo potencial. \nSi estás listo para dar el siguiente paso y convertirte en entrenador, haz clic en el botón "Convertirse en Entrenador" a continuación. ',
    }
}

const initialStateModal = {
    title: '',
    body: null,
}

export default UserToCoach
