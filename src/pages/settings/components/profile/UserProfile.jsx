import { useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import InputText from '../../../../components/ui/components/form/InputText'
import { setNewAuth } from '../../../auth/libs/actions/auth.action'
import { useAuthContext } from '../../../auth/libs/context/auth.context'
import useUserProfile from '../../libs/hooks/useUserProfile'
import { udpateProfileService } from '../../libs/services/user.service'
import UserAvatarModal from './UserAvatarModal'

const UserProfile = () => {
    const { dispatchAuth } = useAuthContext()

    const { data, isLoading, form, isFormInvalid, handleInput, setters } =
        useUserProfile()

    const [isSubmitting, setIsSubmitting] = useState(false)

    if (isLoading) return <div className='mx-auto text-center'>Cargando...</div>

    const rolesFormat = getRoles(data.role)
    const { setReset, setName, setSurname, setUsername, setEmail } = setters

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, form, setIsSubmitting, dispatchAuth)

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-4xl text-center font-bold mb-2'>Perfil</h2>
            <UserAvatarModal />
            <form onSubmit={onHandleSubmit} className='flex flex-col gap-6'>
                <div className='w-full flex gap-4'>
                    <InputText
                        label='Nombre'
                        value={form.name.value}
                        error={form.name.error}
                        onChange={handleInput(setName)}
                    />
                    <InputText
                        label='Apellidos'
                        value={form.surname.value}
                        error={form.surname.error}
                        onChange={handleInput(setSurname)}
                    />
                </div>
                <div>
                    <InputText
                        label='Nombre de usuario'
                        value={form.username.value}
                        error={form.username.error}
                        onChange={handleInput(setUsername)}
                    />
                </div>
                <div>
                    <InputText
                        label='Correo electrónico'
                        value={form.email.value}
                        error={form.email.error}
                        onChange={handleInput(setEmail)}
                    />
                </div>
                <div>
                    <InputText label='Roles' value={rolesFormat} disabled />
                </div>
                <div className='flex gap-4'>
                    <Button
                        kind='outline'
                        loading={isSubmitting}
                        onClick={setReset}
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
        </div>
    )
}

const handleSubmit = async (ev, form, setIsSubmitting, dispatchAuth) => {
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
        toast.success('¡Perfil actualizado exitosamente!')
    } else {
        toast.error(
            'Ha ocurrido un error al actualizar el perfil. Por favor, inténtalo de nuevo.'
        )
    }

    setIsSubmitting(false)
}

const getRoles = (roles) => {
    if (!roles.length) return 'Sin roles asignados'

    const rolesFormat = roles.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    return new Intl.ListFormat('es-ES').format(rolesFormat)
}

export default UserProfile
