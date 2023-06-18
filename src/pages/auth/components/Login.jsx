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
import { extractValuesFromForm } from '../../../helpers/extractValuesFromForm'
import { useTranslation } from 'react-i18next'

const Login = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    const { error, dispatchAuth } = useAuthContext()
    const { form, isFormValid, handleChange } = useLoginform()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, form, dispatchAuth, setIsSubmitting, navigate)

    return (
        <form className='space-y-4 md:space-y-6'>
            <InputText
                type='email'
                label={t('auth.login.emailLabel')}
                placeholder={t('auth.login.emailPlaceholder')}
                value={form.email.value}
                error={t(form.email.error)}
                onChange={handleChange(setEmail)}
            />

            <InputText
                type='password'
                label={t('auth.login.passwordLabel')}
                placeholder={t('auth.login.passwordPlaceholder')}
                value={form.password.value}
                error={t(form.password.error)}
                onChange={handleChange(setPassword)}
            />

            {error && (
                <p className='m-0 text-sm text-red-600 dark:text-red-500'>
                    {t(`auth.login.errors.${error}`)}
                </p>
            )}

            <Button
                type='submit'
                onClick={onHandleSubmit}
                loading={isSubmitting}
                disabled={isFormValid}
            >
                {t('auth.login.title')}
            </Button>
        </form>
    )
}

const handleSubmit = async (
    ev,
    form,
    dispatchAuth,
    setIsSubmitting,
    navigate
) => {
    ev.preventDefault()

    setIsSubmitting(true)

    try {
        const formValues = extractValuesFromForm(form)
        const { data, status, error } = await loginService(formValues)

        if (status !== HttpStatusCode.OK) {
            throw error.message
        }

        dispatchAuth(setNewAuth(data.access_token))

        navigate('/')
    } catch (error) {
        const { statusCode } = error

        const errorMessages = {
            400: 400,
            409: 409,
        }

        const msg = errorMessages[statusCode] || 'auth.login.errors.500'

        dispatchAuth(setError(msg))
    }

    setIsSubmitting(false)
}

export default Login
