import { useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../components/ui/components/buttons/Button'
import InputText from '../../../components/ui/components/form/InputText'
import { setNewAuth } from '../../auth/libs/actions/auth.action'
import { useAuthContext } from '../../auth/libs/context/auth.context'
import useProfile from '../libs/hooks/useProfile'
import { udpateProfileService } from '../libs/services/profile.service'

const Profile = () => {
    const { data, isLoading, form, isFormInvalid, handleInput, setters } =
        useProfile()

    const { dispatchAuth } = useAuthContext()

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { setReset, setName, setSurname, setUsername, setEmail } = setters

    if (isLoading) return <div className='mx-auto text-center'>Cargando...</div>

    const roles = data.role.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    const rolesFormat = new Intl.ListFormat('es-ES').format(roles)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, form, setIsSubmitting, dispatchAuth)

    return (
        <form onSubmit={onHandleSubmit} className='flex flex-col gap-6 mx-auto'>
            <h1 className='text-4xl text-center font-bold mb-2'> MI PERFIL </h1>
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
                <InputText label='Roles' defaultValue={rolesFormat} disabled />
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

export default Profile
