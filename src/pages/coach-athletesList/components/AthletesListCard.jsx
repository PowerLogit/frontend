import { Link } from 'react-router-dom'

import { getAvatar } from '../../../helpers/uiAvatars'

const AthletesListCard = ({ athlete }) => {
    const { id, name, surname, username } = athlete

    const avatarImg = getAvatar(name, surname)

    return (
        <div className='w-full max-w-sm bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 hover:dark:bg-gray-700 dark:border-gray-700'>
            <Link
                to={`/athlete/${id}`}
                className='flex flex-col items-center p-10'
            >
                <img
                    className='w-24 h-24 mb-3 rounded-full shadow-lg'
                    src={avatarImg}
                    alt={name + ' image'}
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white text-center'>
                    {name} {surname}
                </h5>
                <h5 className='mb-4 text-md text-gray-900 dark:text-white text-center'>
                    @{username}
                </h5>
            </Link>
        </div>
    )
}

export default AthletesListCard
