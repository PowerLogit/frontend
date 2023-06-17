import { useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/components/buttons/Button'
import useAvatar from '../../../hooks/useAvatar'

const AthletesListCard = ({ athlete }) => {
    const { avatar, avatarAlt } = useAvatar(athlete)
    const navigate = useNavigate()

    const { id, name, surname, username } = athlete

    const openWorkouts = () => {
        navigate(`/athlete/${id}/${username}`)
    }

    const openChat = () => {
        navigate(`/athlete-chat/${id}/${username}`)
    }

    return (
        <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center p-10'>
                <img
                    className='w-24 h-24 mb-3 rounded-full shadow-lg'
                    src={avatar}
                    alt={avatarAlt}
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white text-center'>
                    {name} {surname}
                </h5>
                <h5 className='mb-4 text-md text-gray-900 dark:text-white text-center'>
                    @{username}
                </h5>
                <div className='w-full flex flex-col gap-4'>
                    <Button
                        className='w-full'
                        kind='outline'
                        onClick={openWorkouts}
                    >
                        Workouts
                    </Button>
                    <Button className='w-full' onClick={openChat}>
                        Chat
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AthletesListCard
