import { useRef, useState } from 'react'
import { toast } from 'sonner'

import Modal from '../../../../components/Modal'
import Button from '../../../../components/ui/components/buttons/Button'
import InputText from '../../../../components/ui/components/form/InputText'
import PencilIcon from '../../../../components/ui/svg/PencilIcon'
import useAvatar from '../../../../hooks/useAvatar'
import { setNewAuth } from '../../../auth/libs/actions/auth.action'
import { useAuthContext } from '../../../auth/libs/context/auth.context'
import useUserProfile from '../../libs/hooks/useUserProfile'
import {
    udpateAvatarService,
    udpateProfileService,
} from '../../libs/services/user.service'

const UserProfile = () => {
    const { dispatchAuth, user } = useAuthContext()

    const { data, isLoading, form, isFormInvalid, handleInput, setters } =
        useUserProfile()

    const { avatar, avatarAlt } = useAvatar(user)

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const inputAvatarPhoto = useRef(null)

    const { setReset, setName, setSurname, setUsername, setEmail } = setters

    if (isLoading || !avatar)
        return <div className='mx-auto text-center'>Cargando...</div>
    const rolesFormat = getRoles(data.role)

    const onHandleSubmitAvatar = async (ev) =>
        handleSubmitAvatar(ev, dispatchAuth, () => setShowModal(false))

    const onHandleSubmitProfile = async (ev) =>
        handleSubmitProfile(ev, form, setIsSubmitting, dispatchAuth)

    const handleButtonClick = () => {
        inputAvatarPhoto.current.click()
    }

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-4xl text-center font-bold mb-2'>Perfil</h2>
            <div className='relative w-36 h-36 mx-auto'>
                <img
                    className='w-36 h-36 rounded-full shadow-lg'
                    src={avatar}
                    alt={avatarAlt}
                />
                <button
                    type='button'
                    className='absolute top-0 right-0 transform -translate-y-1/2 w-3.5 h-3.5'
                    onClick={() => setShowModal(true)}
                >
                    <PencilIcon />
                </button>
                {showModal && (
                    <Modal
                        title='Cambiar foto de perfil'
                        closeModal={() => setShowModal(false)}
                    >
                        <form
                            className='p-5 flex flex-col gap-4 max-w-xs'
                            onSubmit={onHandleSubmitAvatar}
                        >
                            <input
                                type='file'
                                name='avatar'
                                accept='image/*'
                                ref={inputAvatarPhoto}
                                className='hidden'
                            />
                            <Button kind='outline' onClick={handleButtonClick}>
                                Seleccionar imagen
                            </Button>

                            <Button type='submit'>Enviar</Button>
                        </form>
                    </Modal>
                )}
            </div>
            <form
                onSubmit={onHandleSubmitProfile}
                className='flex flex-col gap-6'
            >
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

const handleSubmitAvatar = async (ev, dispatchAuth, closeModal) => {
    ev.preventDefault()

    const file = ev.target.avatar.files[0]
    console.log(file)

    const formData = new FormData()
    formData.append('file', file)

    const { data, status } = await udpateAvatarService(formData)

    if (status === 201) {
        dispatchAuth(setNewAuth(data.access_token))
        toast.success('¡Foto de perfil actualizada exitosamente!')
        closeModal()
    } else {
        toast.error(
            'Ha ocurrido un error al actualizar la foto de perfil. Por favor, inténtalo de nuevo.'
        )
    }
}

const handleSubmitProfile = async (ev, form, setIsSubmitting, dispatchAuth) => {
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
