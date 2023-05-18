import { HttpStatusCode } from '@constant/HttpStatusCode'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/components/buttons/Button'
import InputText from '../../../components/ui/components/form/InputText'
import { setError, setNewAuth } from '../libs/actions/auth.action'
import { useAuthContext } from '../libs/context/auth.context'
import { getRedirectPath } from '../libs/helpers/redirectPath.helper'
import { loginService, registerService } from '../libs/services/auth.service'

const Register = () => {
    const { loading, error, dispatchAuth } = useAuthContext()
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

    const isFormRequired =
        !credential.username ||
        !credential.email ||
        !credential.password ||
        !credential.name ||
        !credential.surname

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        try {
            const newUser = { ...credential, id: crypto.randomUUID() }

            const { status, error } = await registerService(newUser)

            if (status !== HttpStatusCode.CREATED) {
                throw JSON.stringify(error.message)
            }

            const loginCredentials = {
                email: credential.email,
                password: credential.password,
            }

            const login = await loginService(loginCredentials)

            if (login.status !== HttpStatusCode.OK) {
                throw JSON.stringify(login.error.message)
            }

            const { access_token } = login.data

            dispatchAuth(setNewAuth(access_token))

            navigate(getRedirectPath())
        } catch (error) {
            const { message } = JSON.parse(error)

            dispatchAuth(setError(message.join(', ')))
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

            <Button
                type='submit'
                onClick={handleSubmit}
                loading={loading}
                disabled={isFormRequired}
            >
                Registrarse
            </Button>
        </form>
    )
}

export default Register
