import { HttpStatusCode } from '@constant/HttpStatusCode'
import { setBearer } from '@helpers/bearer.helper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputText from '../../../../components/ui/components/form/InputText'
import { setIsNotAuth, setNewAuth } from '../../libs/actions/auth.action'
import { useAuthContext } from '../../libs/context/auth.context'
import { getRedirectPath } from '../../libs/helpers/redirectPath.helper'
import { loginService, registerService } from '../../libs/services/auth.service'

const Register = () => {
    const { dispatchAuth } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const navigate = useNavigate()

    const [credential, setCredential] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
    })

    const handleChange = (ev) => {
        console.log(ev)

        setCredential({
            ...credential,
            [ev.target.name]: ev.target.value,
        })
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        setIsLoading(true)

        try {
            const newUser = { ...credential, id: crypto.randomUUID() }

            const { status, error } = await registerService(newUser)

            if (status !== HttpStatusCode.CREATED)
                throw new Error(JSON.stringify(error.message))

            const loginCredentials = {
                email: credential.email,
                password: credential.password,
            }

            const login = await loginService(loginCredentials)

            if (login.status !== HttpStatusCode.OK) {
                throw new Error(JSON.stringify(login.error.message))
            }

            const { access_token } = login.data

            setBearer(access_token)
            dispatchAuth(setNewAuth(access_token))

            navigate(getRedirectPath())

            navigate(getRedirectPath())
        } catch (error) {
            const { message } = JSON.parse(error.message)

            setError(message.join(', '))
            dispatchAuth(setIsNotAuth(message))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form className='space-y-4 md:space-y-6'>
            <InputText
                name='username'
                label='Nombre de usuario'
                placeholder='username'
                onChange={handleChange}
                value={credential.username}
            />

            <InputText
                name='name'
                label='Nombre'
                placeholder='name'
                onChange={handleChange}
                value={credential.name}
            />

            <InputText
                name='surname'
                label='Apellido'
                placeholder='surname'
                onChange={handleChange}
                value={credential.surname}
            />

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
                {isLoading ? 'Cargando...' : 'Registrarse'}
            </button>
        </form>
    )
}

export default Register
