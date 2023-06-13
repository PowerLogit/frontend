import { useRef } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import { setNewAuth } from '../../../auth/libs/actions/auth.action'
import { useAuthContext } from '../../../auth/libs/context/auth.context'
import { udpateAvatarService } from '../../libs/services/user.service'

const UserAvatarForm = ({ closeModal }) => {
    const { dispatchAuth } = useAuthContext()

    const inputAvatarPhoto = useRef(null)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, dispatchAuth, closeModal)

    const handleButtonClick = () => {
        inputAvatarPhoto.current.click()
    }

    return (
        <form
            className='p-5 flex flex-col gap-4 max-w-xs'
            onSubmit={onHandleSubmit}
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

            <Button type='submit'>Actualizar</Button>
        </form>
    )
}

export default UserAvatarForm

const handleSubmit = async (ev, dispatchAuth, closeModal) => {
    ev.preventDefault()

    const file = ev.target.avatar.files[0]

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
