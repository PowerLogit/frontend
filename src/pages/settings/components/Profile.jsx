import UserPassword from './UserPassword'
import UserProfile from './UserProfile'

const Profile = () => {
    return (
        <div className='mx-auto'>
            <h1 className='text-4xl text-center font-bold mb-6'>MI CUENTA</h1>
            <div className='flex flex-col xl:flex-row gap-12'>
                <UserProfile />
                <UserPassword />
            </div>
        </div>
    )
}
export default Profile
