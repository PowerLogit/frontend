import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import InputText from '../../../../components/ui/components/form/InputText'
import {
    setCurrentPassword,
    setNewPassword,
    setRepeatNewPassword,
} from '../../libs/actions/userPassword.action'
import useUserPassword from '../../libs/hooks/useUserPasswordy'
import { udpatePasswordService } from '../../libs/services/auth.service'

const UserPassword = () => {
    const { t } = useTranslation()
    const { form, isFormInvalid, setResetForm, handleInput } = useUserPassword()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, form, setIsSubmitting, t)

    return (
        <form onSubmit={onHandleSubmit} className='flex flex-col gap-6'>
            <h2 className='text-4xl text-center font-bold mb-2'>
                {t('settings.profile.password.title')}
            </h2>
            <div className='flex flex-col gap-6'>
                <InputText
                    label={t(
                        'settings.profile.password.form.currentPassword.label'
                    )}
                    placeholder={t(
                        'settings.profile.password.form.currentPassword.placeholder'
                    )}
                    type='password'
                    value={form.currentPassword.value}
                    error={t(form.currentPassword.error)}
                    onChange={handleInput(setCurrentPassword)}
                />
                <InputText
                    label={t(
                        'settings.profile.password.form.newPassword.label'
                    )}
                    placeholder={t(
                        'settings.profile.password.form.newPassword.placeholder'
                    )}
                    type='password'
                    value={form.newPassword.value}
                    error={t(form.newPassword.error)}
                    onChange={handleInput(setNewPassword)}
                />
                <InputText
                    label={t(
                        'settings.profile.password.form.repeatPassword.label'
                    )}
                    placeholder={t(
                        'settings.profile.password.form.repeatPassword.placeholder'
                    )}
                    type='password'
                    value={form.repeatNewPassword.value}
                    error={t(form.repeatNewPassword.error)}
                    onChange={handleInput(setRepeatNewPassword)}
                />
            </div>
            <div className='flex gap-4'>
                <Button
                    kind='outline'
                    loading={isSubmitting}
                    onClick={setResetForm}
                    className='w-full'
                >
                    {t('settings.profile.password.form.buttons.cancel')}
                </Button>
                <Button
                    type='submit'
                    loading={isSubmitting}
                    disabled={isFormInvalid}
                    className='w-full'
                >
                    {t('settings.profile.password.form.buttons.save')}
                </Button>
            </div>
        </form>
    )
}

const handleSubmit = async (ev, form, setIsSubmitting, t) => {
    ev.preventDefault()

    setIsSubmitting(true)

    const payload = {
        currentPassword: form.currentPassword.value,
        newPassword: form.newPassword.value,
    }

    const { status } = await udpatePasswordService(payload)

    if (status === 204) {
        toast.success(t('settings.profile.password.form.toast.success'))
    } else {
        toast.error(t('settings.profile.password.form.toast.error'))
    }

    setIsSubmitting(false)
}

export default UserPassword
