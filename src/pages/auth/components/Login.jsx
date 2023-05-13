import { HttpStatusCode } from '@constant/HttpStatusCode'
import { setBearer } from '@helpers/bearer.helper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputText from '../../../components/ui/components/form/InputText'
import { NODE_ENV } from '../../../config/common'
import { setIsNotAuth, setNewAuth } from '../libs/actions/auth.action'
import { useAuthContext } from '../libs/context/auth.context'
import { getRedirectPath } from '../libs/helpers/redirectPath.helper'
import { loginService } from '../libs/services/auth.service'

const isDevMode = NODE_ENV === 'dev'

const Login = () => {
    const { dispatchAuth } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const navigate = useNavigate()

    const [credential, setCredential] = useState({
        email: isDevMode ? 'usuario@gmail.com' : '',
        password: isDevMode ? 'Admin1' : '',
    })

    const handleChange = (ev) => {
        setCredential({
            ...credential,
            [ev.target.name]: ev.target.value,
        })
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setIsLoading(true)

        try {
            const { data, status, error } = await loginService(credential)

            if (status !== HttpStatusCode.OK) {
                throw new Error(JSON.stringify(error.message))
            }

            const { access_token } = data

            setBearer(access_token)
            dispatchAuth(setNewAuth(access_token))

            navigate(getRedirectPath())
        } catch (error) {
            const { message, statusCode } = JSON.parse(error.message)

            const errorMessages = {
                400: 'Formato inválido',
                409: 'Credenciales inválidas',
            }

            const msg = errorMessages[statusCode] || message

            setError(msg)
            dispatchAuth(setIsNotAuth(msg))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className='space-y-4 md:space-y-6'>
            <InputText
                type='email'
                name='email'
                label='Email'
                placeholder='name@company.com'
                onChange={handleChange}
                value={credential.email}
            />

            <InputText
                type='password'
                name='password'
                label='Contraseña'
                placeholder='••••••••'
                onChange={handleChange}
                value={credential.password}
            />

            {error && (
                <p className='m-0 text-sm text-red-600 dark:text-red-500'>
                    {error}
                </p>
            )}

            <button
                type='submit'
                onClick={handleSubmit}
                disabled={isLoading}
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
                {isLoading ? 'Cargando...' : 'Iniciar sesión'}
            </button>
        </form>
    )
}

export default Login
