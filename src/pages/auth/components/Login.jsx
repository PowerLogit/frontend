import { HttpStatusCode } from '@constant/HttpStatusCode'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../../components/ui/components/buttons/Button'
import InputText from '../../../components/ui/components/form/InputText'
import { setError, setNewAuth } from '../libs/actions/auth.action'
import { setEmail, setPassword } from '../libs/actions/form.action'
import { useAuthContext } from '../libs/context/auth.context'
import useLoginform from '../libs/hooks/useLoginform'
import { loginService } from '../libs/services/auth.service'

const Login = () => {
    const navigate = useNavigate()

    const { error, dispatchAuth } = useAuthContext()
    const { form, isFormValid, handleChange } = useLoginform()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, form, dispatchAuth, setIsSubmitting, navigate)

    return (
        <form className='space-y-4 md:space-y-6'>
            <InputText
                type='email'
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
                loading={isSubmitting}
                disabled={isFormValid}
            >
                Iniciar sesión
            </Button>
        </form>
    )
}

const handleSubmit = async (
    ev,
    credential,
    dispatchAuth,
    setIsSubmitting,
    navigate
) => {
    ev.preventDefault()

    setIsSubmitting(true)

    try {
        const { data, status, error } = await loginService(credential)

        if (status !== HttpStatusCode.OK) {
            throw JSON.stringify(error.message)
        }

        dispatchAuth(setNewAuth(data.access_token))

        navigate('/')
    } catch (error) {
        const { message, statusCode } = JSON.parse(error)

        const errorMessages = {
            400: 'Formato inválido',
            409: 'Credenciales inválidas',
        }

        const msg = errorMessages[statusCode] || message

        dispatchAuth(setError(msg))
    }

    setIsSubmitting(false)
}

export default Login
