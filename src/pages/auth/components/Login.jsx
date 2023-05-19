import { HttpStatusCode } from '@constant/HttpStatusCode'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/components/buttons/Button'
import InputText from '../../../components/ui/components/form/InputText'
import { NODE_ENV } from '../../../config/common'
import { setError, setIsLoading, setNewAuth } from '../libs/actions/auth.action'
import { useAuthContext } from '../libs/context/auth.context'
import { getRedirectPath } from '../libs/helpers/redirectPath.helper'
import { loginService } from '../libs/services/auth.service'

const isDevMode = NODE_ENV === 'dev'

const Login = () => {
    const { loading, error, dispatchAuth } = useAuthContext()

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
        dispatchAuth(setIsLoading())

        try {
            const { data, status, error } = await loginService(credential)

            if (status !== HttpStatusCode.OK) {
                throw JSON.stringify(error.message)
            }

            dispatchAuth(setNewAuth(data.access_token))

            navigate(getRedirectPath())
        } catch (error) {
            const { message, statusCode } = JSON.parse(error)

            const errorMessages = {
                400: 'Formato inválido',
                409: 'Credenciales inválidas',
            }

            const msg = errorMessages[statusCode] || message

            dispatchAuth(setError(msg))
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

            <Button type='submit' onClick={handleSubmit} loading={loading}>
                Iniciar sesión
            </Button>
        </form>
    )
}

export default Login
