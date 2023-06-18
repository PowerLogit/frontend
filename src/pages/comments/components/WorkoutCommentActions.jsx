import { Dropdown } from 'flowbite-react'
import { useTranslation } from 'react-i18next'

import Modal from '../../../components/Modal'
import PencilIcon from '../../../components/ui/svg/PencilIcon'
import ThreeDotsIcon from '../../../components/ui/svg/ThreeDotsIcon'
import TrashIcon from '../../../components/ui/svg/TrashIcon'
import useWorkoutCommentActions from '../libs/hooks/useWorkoutCommentActions'

const WorkoutCommentActions = ({ comment, settersComment }) => {
    const { t } = useTranslation()

    const { modalContent, setEditForm, setDeleteForm, resetModalContent } =
        useWorkoutCommentActions(comment, settersComment)

    return (
        <>
            <Modal title={modalContent.title} closeModal={resetModalContent}>
                {modalContent.body}
            </Modal>

            <Dropdown arrowIcon={false} inline={true} label={<ThreeDotsIcon />}>
                <Dropdown.Item icon={PencilIcon} onClick={setEditForm}>
                    <span className='pl-2'>
                        {t('workouts.comments.card.actions.edit')}
                    </span>
                </Dropdown.Item>
                <Dropdown.Item icon={TrashIcon} onClick={setDeleteForm}>
                    <span className='pl-2'>
                        {t('workouts.comments.card.actions.delete')}
                    </span>
                </Dropdown.Item>
            </Dropdown>
        </>
    )
}

export default WorkoutCommentActions
