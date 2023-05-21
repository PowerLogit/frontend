import { Dropdown } from 'flowbite-react'

import Modal from '../../../components/Modal'
import useWorkoutCommentActions from '../libs/hooks/useWorkoutCommentActions'
import ThreeDotsIcon from '../../../components/ui/svg/ThreeDotsIcon'
import TrashIcon from '../../../components/ui/svg/TrashIcon'

const WorkoutCommentActions = ({ comment, removeComment }) => {
    const { modalContent, setDeleteForm, resetModalContent } =
        useWorkoutCommentActions(comment, removeComment)

    return (
        <>
            <Modal title={modalContent.title} closeModal={resetModalContent}>
                {modalContent.body}
            </Modal>

            <Dropdown arrowIcon={false} inline={true} label={<ThreeDotsIcon />}>
                <Dropdown.Item icon={TrashIcon} onClick={setDeleteForm}>
                    <span className='pl-2'>Eliminar</span>
                </Dropdown.Item>
            </Dropdown>
        </>
    )
}

export default WorkoutCommentActions
