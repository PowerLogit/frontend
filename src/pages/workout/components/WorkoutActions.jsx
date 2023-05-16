import { Dropdown } from 'flowbite-react'
import { useState } from 'react'

import Modal from '../../../components/Modal'
import PencilIcon from '../../../components/ui/svg/PencilIcon'
import ThreeDotsIcon from '../../../components/ui/svg/ThreeDotsIcon'
import TrashIcon from '../../../components/ui/svg/TrashIcon'
import WorkoutDeleteForm from './forms/WorkoutDeleteForm'
import WorkoutEditForm from './forms/WorkoutEditForm'
import { Link } from 'react-router-dom'

const WorkoutActions = ({ workout }) => {
    const { modalContent, setEditForm, setDeleteForm, resetModalContent } =
        useModal(workout)

    return (
        <>
            <Modal title={modalContent.title} closeModal={resetModalContent}>
                {modalContent.body}
            </Modal>

            <Dropdown arrowIcon={false} inline={true} label={<ThreeDotsIcon />}>
                <Dropdown.Item icon={PencilIcon} onClick={setEditForm}>
                    <span className='pl-2'>Editar</span>
                </Dropdown.Item>
                <Dropdown.Item icon={TrashIcon} onClick={setDeleteForm}>
                    <span className='pl-2'>Eliminar</span>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to={`/calc/${workout.weight}`}>Discos</Link>
                </Dropdown.Item>
            </Dropdown>
        </>
    )
}

const useModal = (workout) => {
    const [modalContent, setModalContent] = useState(initialStateModal)

    const setEditForm = () => {
        setModalContent({
            title: 'Editar workout',
            body: (
                <WorkoutEditForm
                    currentWorkout={workout}
                    closeModal={resetModalContent}
                />
            ),
        })
    }

    const setDeleteForm = () => {
        setModalContent({
            title: 'Eliminar workout',
            body: (
                <WorkoutDeleteForm
                    currentWorkout={workout}
                    closeModal={resetModalContent}
                />
            ),
        })
    }

    const resetModalContent = () => {
        setModalContent(initialStateModal)
    }

    return { modalContent, setEditForm, setDeleteForm, resetModalContent }
}

const initialStateModal = {
    title: '',
    body: null,
}

export default WorkoutActions
