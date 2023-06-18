import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import InputText from '../../../../components/ui/components/form/InputText'
import { getRoleFormat } from '../../../../helpers/roleFormat'
import { setNewAuth } from '../../../auth/libs/actions/auth.action'
import { useAuthContext } from '../../../auth/libs/context/auth.context'
import useUserProfile from '../../libs/hooks/useUserProfile'
import { udpateProfileService } from '../../libs/services/user.service'
import UserAvatarModal from './UserAvatarModal'

const UserProfile = () => {
    const { t, i18n } = useTranslation()
    const { dispatchAuth } = useAuthContext()

    const { data, isLoading, form, isFormInvalid, handleInput, setters } =
        useUserProfile()

    const [isSubmitting, setIsSubmitting] = useState(false)

    if (isLoading)
        return (
            <div className='mx-auto text-center'>
                {t('settings.profile.myProfile.loading')}
            </div>
        )

    const rolesFormat = getRoles(data.role, t, i18n.language)
    const { setReset, setName, setSurname, setUsername, setEmail } = setters

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, form, setIsSubmitting, dispatchAuth, t)

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-4xl text-center font-bold mb-2'>
                {t('settings.profile.myProfile.title')}
            </h2>
            <UserAvatarModal />
            <form onSubmit={onHandleSubmit} className='flex flex-col gap-6'>
                <div className='w-full flex gap-4'>
                    <InputText
                        label={t('settings.profile.myProfile.form.name')}
                        value={form.name.value}
                        error={form.name.error}
                        onChange={handleInput(setName)}
                    />
                    <InputText
                        label={t('settings.profile.myProfile.form.surname')}
                        value={form.surname.value}
                        error={form.surname.error}
                        onChange={handleInput(setSurname)}
                    />
                </div>
                <div>
                    <InputText
                        label={t('settings.profile.myProfile.form.username')}
                        value={form.username.value}
                        error={form.username.error}
                        onChange={handleInput(setUsername)}
                    />
                </div>
                <div>
                    <InputText
                        label={t('settings.profile.myProfile.form.email')}
                        value={form.email.value}
                        error={form.email.error}
                        onChange={handleInput(setEmail)}
                    />
                </div>
                <div>
                    <InputText
                        label={t('settings.profile.myProfile.form.roles')}
                        value={rolesFormat}
                        disabled
                    />
                </div>
                <div className='flex gap-4'>
                    <Button
                        kind='outline'
                        loading={isSubmitting}
                        onClick={setReset}
                        className='w-full'
                    >
                        {t('settings.profile.myProfile.form.buttons.cancel')}
                    </Button>
                    <Button
                        type='submit'
                        loading={isSubmitting}
                        disabled={isFormInvalid}
                        className='w-full'
                    >
                        {t('settings.profile.myProfile.form.buttons.save')}
                    </Button>
                </div>
            </form>
        </div>
    )
}

const handleSubmit = async (ev, form, setIsSubmitting, dispatchAuth, t) => {
    ev.preventDefault()
    setIsSubmitting(true)

    const payload = {
        name: form.name.value,
        surname: form.surname.value,
        username: form.username.value,
        email: form.email.value,
    }

    const { data, status } = await udpateProfileService(payload)

    if (status === 200) {
        dispatchAuth(setNewAuth(data.access_token))
        toast.success(t('settings.profile.myProfile.form.toast.success'))
    } else {
        toast.error(t('settings.profile.myProfile.form.toast.error'))
    }

    setIsSubmitting(false)
}

const getRoles = (roles, t, language) => {
    if (!roles.length) return t('settings.profile.myProfile.noRoles')

    return getRoleFormat(roles, language)
}

export default UserProfile
