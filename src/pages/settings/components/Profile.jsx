import Button from '../../../components/ui/components/buttons/Button'
import InputText from '../../../components/ui/components/form/InputText'
import useProfile from '../libs/hooks/useProfile'

const Profile = () => {
    const { data, isLoading, form, isFormInvalid, handleInput, setters } =
        useProfile()

    const { setReset, setName, setSurname, setUsername, setEmail } = setters

    if (isLoading) return <div className='mx-auto text-center'>Cargando...</div>

    const roles = data.role.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    const rolesFormat = new Intl.ListFormat('es-ES').format(roles)

    return (
        <div className='flex flex-col gap-6 mx-auto'>
            <h1 className='text-4xl text-center font-bold mb-2'> MI PERFIL </h1>
            <div className='w-full flex gap-4'>
                <InputText
                    label='Nombre'
                    value={form.name.value}
                    error={form.name.error}
                    onChange={handleInput(setName)}
                    disabled
                />
                <InputText
                    label='Apellidos'
                    value={form.surname.value}
                    error={form.surname.error}
                    onChange={handleInput(setSurname)}
                    disabled
                />
            </div>
            <div>
                <InputText
                    label='Nombre de usuario'
                    value={form.username.value}
                    error={form.username.error}
                    onChange={handleInput(setUsername)}
                    disabled
                />
            </div>
            <div>
                <InputText
                    label='Correo electrónico'
                    value={form.email.value}
                    error={form.email.error}
                    onChange={handleInput(setEmail)}
                    disabled
                />
            </div>
            <div>
                <InputText label='Roles' defaultValue={rolesFormat} disabled />
            </div>
            {/*<div className='flex gap-4'>
                <Button kind='outline' onClick={setReset} className='w-full'>
                    Cancelar
                </Button>
                <Button
                    type='submit'
                    disabled={isFormInvalid}
                    className='w-full'
                >
                    Actualizar
                </Button>
            </div>*/}
        </div>
    )
}

export default Profile
