import { Dropdown } from 'flowbite-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import Modal from '../../../components/Modal'
import PencilIcon from '../../../components/ui/svg/PencilIcon'
import ThreeDotsIcon from '../../../components/ui/svg/ThreeDotsIcon'
import TrashIcon from '../../../components/ui/svg/TrashIcon'
import useWorkoutActions from '../libs/hooks/useWorkoutActions'

const WorkoutActions = ({ workout }) => {
    const { t } = useTranslation()
    const location = useLocation()

    const {
        modalContent,
        setEditForm,
        setDeleteForm,
        setIsComplete,
        resetModalContent,
    } = useWorkoutActions(workout)

    const showComment = location.pathname === '/workouts'
    const showButton = showComment && !workout.coach

    return (
        <>
            <Modal title={modalContent.title} closeModal={resetModalContent}>
                {modalContent.body}
            </Modal>

            <Dropdown arrowIcon={false} inline={true} label={<ThreeDotsIcon />}>
                {showButton && (
                    <Dropdown.Item icon={PencilIcon} onClick={setEditForm}>
                        <span className='pl-2'>
                            {t('workouts.card.actions.edit')}
                        </span>
                    </Dropdown.Item>
                )}
                {showButton && (
                    <Dropdown.Item icon={TrashIcon} onClick={setDeleteForm}>
                        <span className='pl-2'>
                            {t('workouts.card.actions.delete')}
                        </span>
                    </Dropdown.Item>
                )}
                <Dropdown.Item>
                    <Link to={`/calc/${workout.weight}`}>
                        {t('workouts.card.actions.plates')}
                    </Link>
                </Dropdown.Item>
                {!workout.isCompleted && (
                    <Dropdown.Item onClick={setIsComplete}>
                        {t('workouts.card.actions.completed')}
                    </Dropdown.Item>
                )}
                {showComment && (
                    <Dropdown.Item>
                        <Link to={`/workout/${workout.id}`}>
                            {t('workouts.card.actions.comments')}
                        </Link>
                    </Dropdown.Item>
                )}
            </Dropdown>
        </>
    )
}

export default WorkoutActions
