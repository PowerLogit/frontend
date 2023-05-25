import UserPassword from './UserPassword'
import UserProfile from './UserProfile'
import UserToCoach from './UserToCoach'

const Profile = () => {
    return (
        <div className='mx-auto'>
            <h1 className='text-4xl text-center font-bold mb-8'>MI CUENTA</h1>
            <div className='flex flex-col xl:flex-row gap-12 mb-6'>
                <UserProfile />
                <UserPassword />
            </div>
            <div>
                <UserToCoach />
            </div>
        </div>
    )
}
export default Profile
