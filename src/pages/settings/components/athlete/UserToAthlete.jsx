import { useAuthContext } from '@auth/libs/context/auth.context'
import { useState } from 'react'

import Modal from '../../../../components/Modal'
import Button from '../../../../components/ui/components/buttons/Button'
import RemoveAthleteRole from './RemoveAthleteRole'
import AddAthleteRole from './AddAthleteRole'

const UserToAthlete = () => {
    const { user } = useAuthContext()

    const isAthlete = user.role.includes('athlete')
    const { title, text, body } = athleteMap(isAthlete)

    const [modalContent, setModalContent] = useState({ title, body })

    const resetModalContent = () => {
        setModalContent(initialStateModal)
    }

    const setRemoveAthleteRole = () => {
        setModalContent({
            title: 'Dejar de ser atleta',
            body: <RemoveAthleteRole closeModal={resetModalContent} />,
        })
    }

    const setAddAthleteRole = () => {
        setModalContent({
            title: 'Convertirse en atleta',
            body: <AddAthleteRole closeModal={resetModalContent} />,
        })
    }

    const openModal = isAthlete ? setRemoveAthleteRole : setAddAthleteRole

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

const athleteMap = (isCoach) => {
    if (isCoach)
        return {
            title: 'Dejar de ser Atleta',
            text: 'Entendemos que las circunstancias pueden cambiar y que es posible que ya no desees ejercer como atleta en PowerLog. Si has decidido dejar de ser atleta, queremos asegurarnos de que estás tomando la decisión correcta. \nAl dejar de ser atleta, perderás la capacidad de crear programas de entrenamiento personalizados, así como del uso de la calculadora de discos y el poder tener un entrenador. \nSi estás seguro de que deseas dejar de ser atleta, haz clic en el botón "Dejar de ser Atleta" a continuación.',
        }

    return {
        title: 'Convertirse en Atleta',
        text: '¡Gracias por tu interés en convertirte en atleta!\nAl convertirte en atleta, podrás crear programas de entrenamiento personalizados, acceso a la calculadora de discos y aproximaciones y por su puesto poder tener un entrenador que se encarge de tu seguimiento \nSi estás listo para dar el siguiente paso y convertirte en atleta, haz clic en el botón "Convertirse en Atleta" a continuación. ',
    }
}

const initialStateModal = {
    title: '',
    body: null,
}

export default UserToAthlete
