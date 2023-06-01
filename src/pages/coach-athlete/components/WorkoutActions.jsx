import { Dropdown } from 'flowbite-react'
import { Link, useLocation } from 'react-router-dom'

import Modal from '../../../components/Modal'
import PencilIcon from '../../../components/ui/svg/PencilIcon'
import ThreeDotsIcon from '../../../components/ui/svg/ThreeDotsIcon'
import TrashIcon from '../../../components/ui/svg/TrashIcon'
import useWorkoutActions from '../libs/hooks/useWorkoutActions'

const WorkoutActions = ({ workout }) => {
    const { modalContent, setEditForm, setDeleteForm, resetModalContent } =
        useWorkoutActions(workout)

    const location = useLocation()
    const showComments = location.pathname.includes('/athlete')

    return (
        <>
            <Modal title={modalContent.title} closeModal={resetModalContent}>
                {modalContent.body}
            </Modal>

            <Dropdown arrowIcon={false} inline={true} label={<ThreeDotsIcon />}>
                {showComments && (
                    <Dropdown.Item icon={PencilIcon} onClick={setEditForm}>
                        <span className='pl-2'>Editar</span>
                    </Dropdown.Item>
                )}
                {showComments && (
                    <Dropdown.Item icon={TrashIcon} onClick={setDeleteForm}>
                        <span className='pl-2'>Eliminar</span>
                    </Dropdown.Item>
                )}
                {showComments && (
                    <Dropdown.Item>
                        <Link to={`/workout/${workout.id}`}>
                            Ver comentarios
                        </Link>
                    </Dropdown.Item>
                )}
            </Dropdown>
        </>
    )
}

export default WorkoutActions
