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
} from '../libs/actions/form.action'
import { useAuthContext } from '../libs/context/auth.context'
import { getRedirectPath } from '../libs/helpers/redirectPath.helper'
import useRegisterForm from '../libs/hooks/useRegisterForm'
import { loginService, registerService } from '../libs/services/auth.service'
import { useTranslation } from 'react-i18next'

const Register = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { loading, error, dispatchAuth } = useAuthContext()
    const { form, isFormValid, handleChange } = useRegisterForm()

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, form, dispatchAuth, navigate)

    return (
        <form className='space-y-4 md:space-y-6'>
            <InputText
                label={t('auth.register.username.label')}
                placeholder={t('auth.register.username.placeholder')}
                value={form.username.value}
                error={t(form.username.error)}
                onChange={handleChange(setUsername)}
            />

            <InputText
                label={t('auth.register.name.label')}
                placeholder={t('auth.register.name.placeholder')}
                value={form.name.value}
                error={t(form.name.error)}
                onChange={handleChange(setName)}
            />

            <InputText
                label={t('auth.register.surname.label')}
                placeholder={t('auth.register.surname.placeholder')}
                value={form.surname.value}
                error={t(form.surname.error)}
                onChange={handleChange(setSurname)}
            />

            <InputText
                label={t('auth.register.email.label')}
                placeholder={t('auth.register.email.placeholder')}
                value={form.email.value}
                error={t(form.email.error)}
                onChange={handleChange(setEmail)}
            />

            <InputText
                type='password'
                label={t('auth.register.password.label')}
                placeholder={t('auth.register.password.placeholder')}
                value={form.password.value}
                error={t(form.password.error)}
                onChange={handleChange(setPassword)}
            />

            {error && (
                <p className='m-0 text-sm text-red-600 dark:text-red-500'>
                    {t(error)}
                </p>
            )}

            <Button
                type='submit'
                onClick={onHandleSubmit}
                loading={loading}
                disabled={isFormValid}
            >
                {t('auth.register.title')}
            </Button>
        </form>
    )
}

const handleSubmit = async (ev, form, dispatchAuth, navigate) => {
    ev.preventDefault()

    try {
        const formValues = extractValuesFromForm(form)
        const newUser = { ...formValues, id: crypto.randomUUID() }

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
        const msg = getErrorMessages(error)

        dispatchAuth(setError(msg))
    }
}

const getErrorMessages = ({ statusCode, message }) => {
    if (statusCode === 409 && message === 'Email already exists') {
        return 'auth.register.errors.email'
    }

    if (statusCode === 409 && message === 'Username already exists') {
        return 'auth.register.errors.username'
    }

    return 'auth.login.errors.500'
}

export default Register
