import { useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import InputText from '../../../../components/ui/components/form/InputText'
import {
    setCurrentPassword,
    setNewPassword,
    setRepeatNewPassword,
} from '../../libs/actions/userPassword.action'
import useUserPassword from '../../libs/hooks/useUserPasswordy'
import { udpatePasswordService } from '../../libs/services/user.service'

const UserPassword = () => {
    const { form, isFormInvalid, setResetForm, handleInput } = useUserPassword()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onHandleSubmit = async (ev) => handleSubmit(ev, form, setIsSubmitting)

    return (
        <form onSubmit={onHandleSubmit} className='flex flex-col gap-6'>
            <h2 className='text-4xl text-center font-bold mb-2'>
                Cambiar contraseña
            </h2>
            <div className='flex flex-col gap-6'>
                <InputText
                    label='Contraseña actual'
                    type='password'
                    value={form.currentPassword.value}
                    error={form.currentPassword.error}
                    onChange={handleInput(setCurrentPassword)}
                />
                <InputText
                    label='Nueva contraseña'
                    type='password'
                    value={form.newPassword.value}
                    error={form.newPassword.error}
                    onChange={handleInput(setNewPassword)}
                />
                <InputText
                    label='Repetir contraseña'
                    type='password'
                    value={form.repeatNewPassword.value}
                    error={form.repeatNewPassword.error}
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
                    Cancelar
                </Button>
                <Button
                    type='submit'
                    loading={isSubmitting}
                    disabled={isFormInvalid}
                    className='w-full'
                >
                    Actualizar
                </Button>
            </div>
        </form>
    )
}

const handleSubmit = async (ev, form, setIsSubmitting) => {
    ev.preventDefault()

    setIsSubmitting(true)

    const payload = {
        currentPassword: form.currentPassword.value,
        newPassword: form.newPassword.value,
    }

    const { status } = await udpatePasswordService(payload)

    if (status === 204) {
        toast.success('Contraseña actualizada exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al actualizar la contraseña. Por favor, inténtalo de nuevo.'
        )
    }

    setIsSubmitting(false)
}

export default UserPassword
