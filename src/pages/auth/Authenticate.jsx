import { useState } from 'react'

import Login from './components/login/Login'
import Register from './components/register/Register'
import { setResetError } from './libs/actions/auth.action'
import { AUTH } from './libs/constant/authOption'
import { useAuthContext } from './libs/context/auth.context'

const Authenticate = () => {
    const { dispatchAuth } = useAuthContext()

    const [formVariant, setFormVariant] = useState(AUTH.LOGIN)

    const authPage = formVariant === AUTH.LOGIN ? <Login /> : <Register />

    const kindRendered = (state) =>
        formVariant !== state
            ? 'w-full text-dark dark:text-white hover:text-white border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-primary-500 dark:hover:bg-primary-500 dark:focus:ring-primary-800'
            : 'w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'

    const pageRendered = (formVariant) => {
        dispatchAuth(setResetError())
        setFormVariant(formVariant)
    }

    return (
        <div className='flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0 sm:max-w-md mt-5 gap-8'>
            <div className='flex flex-row gap-4 w-full'>
                <button
                    type='button'
                    className={kindRendered(AUTH.LOGIN)}
                    onClick={() => pageRendered(AUTH.LOGIN)}
                >
                    Iniciar sesión
                </button>
                <button
                    type='button'
                    className={kindRendered(AUTH.REGISTER)}
                    onClick={() => pageRendered(AUTH.REGISTER)}
                >
                    Registrarse
                </button>
            </div>
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    {authPage}
                </div>
            </div>
        </div>
    )
}

export default Authenticate
