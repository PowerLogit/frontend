import { Dropdown } from 'flowbite-react'

import Modal from '../../../components/Modal'
import useWorkoutCommentActions from '../libs/hooks/useWorkoutCommentActions'
import ThreeDotsIcon from '../../../components/ui/svg/ThreeDotsIcon'
import TrashIcon from '../../../components/ui/svg/TrashIcon'
import PencilIcon from '../../../components/ui/svg/PencilIcon'

const WorkoutCommentActions = ({ comment, settersComment }) => {
    const { modalContent, setEditForm, setDeleteForm, resetModalContent } =
        useWorkoutCommentActions(comment, settersComment)

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
            </Dropdown>
        </>
    )
}

export default WorkoutCommentActions
