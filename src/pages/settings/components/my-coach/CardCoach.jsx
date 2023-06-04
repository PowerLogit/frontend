import { getAvatar } from '../../../../helpers/uiAvatars'

const CardCoach = ({ coach }) => {
    const { name, surname, username } = coach

    const avatarImg = getAvatar(name, surname)

    return (
        <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <div className='flex flex-col items-center p-10'>
                <img
                    className='w-24 h-24 mb-3 rounded-full shadow-lg'
                    src={avatarImg}
                    alt={name + ' image'}
                />
                <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                    {name} {surname}
                </h5>
                <h5 className='text-md text-gray-900 dark:text-white'>
                    @{username}
                </h5>
            </div>
        </div>
    )
}

export default CardCoach
