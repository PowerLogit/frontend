// import { useAuthContext } from '../../auth/libs/context/auth.context'
import UserPassword from './UserPassword'
import UserProfile from './UserProfile'

const Profile = () => {
    // const { dispatchAuth } = useAuthContext()

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
