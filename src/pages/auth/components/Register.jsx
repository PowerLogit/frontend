import { HttpStatusCode } from '@constant/HttpStatusCode'
import { useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/components/buttons/Button'
import InputText from '../../../components/ui/components/form/InputText'
import { extractValuesFromForm } from '../../../helpers/extractValuesFromForm'
import { setError, setNewAuth } from '../libs/actions/auth.action'
import {
    setEmail,
    setName,
    setPassword,
    setSurname,
    setUsername,
} from '../libs/actions/register.action'
import { useAuthContext } from '../libs/context/auth.context'
import { getRedirectPath } from '../libs/helpers/redirectPath.helper'
import useRegisterForm from '../libs/hooks/useRegisterForm'
import { loginService, registerService } from '../libs/services/auth.service'

const Register = () => {
    const navigate = useNavigate()

    const { loading, error, dispatchAuth } = useAuthContext()
    const { form, isFormValid, handleChange } = useRegisterForm()

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, form, dispatchAuth, navigate)

    return (
        <form className='space-y-4 md:space-y-6'>
            <InputText
                label='Nombre de usuario'
                placeholder='username'
                value={form.username.value}
                error={form.username.error}
                onChange={handleChange(setUsername)}
            />

            <InputText
                label='Nombre'
                placeholder='name'
                value={form.name.value}
                error={form.name.error}
                onChange={handleChange(setName)}
            />

            <InputText
                label='Apellido'
                placeholder='surname'
                value={form.surname.value}
                error={form.surname.error}
                onChange={handleChange(setSurname)}
            />

            <InputText
                name='email'
                label='Email'
                placeholder='name@company.com'
                value={form.email.value}
                error={form.email.error}
                onChange={handleChange(setEmail)}
            />

            <InputText
                type='password'
                label='Contraseña'
                placeholder='••••••••'
                value={form.password.value}
                error={form.password.error}
                onChange={handleChange(setPassword)}
            />

            {error && (
                <p className='m-0 text-sm text-red-600 dark:text-red-500'>
                    {error}
                </p>
            )}

            <Button
                type='submit'
                onClick={onHandleSubmit}
                loading={loading}
                disabled={isFormValid}
            >
                Registrarse
            </Button>
        </form>
    )
}

const handleSubmit = async (ev, form, dispatchAuth, navigate) => {
    ev.preventDefault()

    try {
        const formValues = extractValuesFromForm(form)
        const newUser = { ...formValues, id: crypto.randomUUID() }

        console.log(newUser)

        const { status, error } = await registerService(newUser)

        if (status !== HttpStatusCode.CREATED) {
            throw error.message
        }

        const loginCredentials = {
            email: newUser.email,
            password: newUser.password,
        }

        const login = await loginService(loginCredentials)

        if (login.status !== HttpStatusCode.OK) {
            throw login.error.message
        }

        const { access_token } = login.data

        dispatchAuth(setNewAuth(access_token))

        navigate(getRedirectPath())
    } catch (error) {
        const { message } = error

        dispatchAuth(setError(message.join(', ')))
    }
}

export default Register
