import { useRef, useState } from 'react'
import { toast } from 'sonner'

import Button from '../../../../components/ui/components/buttons/Button'
import { setNewAuth } from '../../../auth/libs/actions/auth.action'
import { useAuthContext } from '../../../auth/libs/context/auth.context'
import { udpateAvatarService } from '../../libs/services/user.service'
import { readFileAsDataURL } from '../../../../helpers/readFileAsDataURL'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
const MAX_FILE_SIZE = 128 * 1024 // 128KB

const UserAvatarForm = ({ closeModal }) => {
    const { dispatchAuth } = useAuthContext()

    const [previewImage, setPreviewImage] = useState(null)
    const inputAvatarPhoto = useRef(null)

    const hasError = !previewImage || !!previewImage.error

    const onHandleChange = async (ev) => handleChange(ev, setPreviewImage)

    const onHandleSubmit = async (ev) =>
        handleSubmit(ev, dispatchAuth, closeModal)

    const onHandleButtonClick = () => {
        inputAvatarPhoto.current.click()
    }

    return (
        <form
            className='p-5 flex flex-col gap-4 w-full'
            onSubmit={onHandleSubmit}
        >
            <input
                type='file'
                name='avatar'
                accept={ALLOWED_MIME_TYPES.join(',')}
                ref={inputAvatarPhoto}
                onChange={onHandleChange}
                className='hidden'
            />

            {previewImage?.src && (
                <div className='mx-auto'>
                    <img
                        src={previewImage.src}
                        alt='Preview'
                        className='w-36 h-36 rounded-full shadow-lg mb-4'
                    />
                    <p className='text-center text-white'>
                        {previewImage.name}
                    </p>
                </div>
            )}

            {previewImage?.error && (
                <p className='text-red-500 text-center'>{previewImage.error}</p>
            )}

            <div className='flex flex-col min-[380px]:flex-row justify-center gap-4'>
                <Button kind='outline' onClick={onHandleButtonClick}>
                    Seleccionar imagen
                </Button>

                <Button type='submit' disabled={hasError}>
                    Actualizar
                </Button>
            </div>
        </form>
    )
}

export default UserAvatarForm

const handleChange = async (ev, setPreviewImage) => {
    const file = ev.target.files[0]

    if (!file) {
        return setPreviewImage(null)
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        return setPreviewImage({
            error: `El tipo de archivo ${file.type} no esta soportado. Solo jpeg, jpg, png, gif`,
        })
    }

    if (file.size > MAX_FILE_SIZE) {
        return setPreviewImage({
            error: 'El tamaño del archivo es demasiado grande. El tamaño máximo es de 128KB',
        })
    }

    try {
        const fileDataUrl = await readFileAsDataURL(file)
        setPreviewImage({
            src: fileDataUrl,
            name: file.name,
        })
    } catch (error) {
        toast.error(
            'Ha ocurrido un error al leer el archivo. Por favor, inténtalo de nuevo.'
        )
        return setPreviewImage(null)
    }
}

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
