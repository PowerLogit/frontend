import Button from '@ui/components/buttons/Button'
import { useState } from 'react'
import style from './Authenticate.module.css'
import Login from './components/login/Login'
import Register from './components/register/Register'
import { setResetError } from './libs/actions/auth.action'
import { AUTH } from './libs/constant/authOption'
import { useAuthContext } from './libs/context/auth.context'

const Authenticate = () => {
    const { dispatchAuth } = useAuthContext()

    const [formVariant, setFormVariant] = useState(AUTH.LOGIN)

    const authPage = formVariant === AUTH.LOGIN ? <Login /> : <Register />

    const kindRendered = (state) =>
        formVariant === state ? 'secondary' : 'primary'

    const pageRendered = (formVariant) => {
        dispatchAuth(setResetError())
        setFormVariant(formVariant)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.wrapperButton}>
                <Button
                    onClick={() => pageRendered(AUTH.LOGIN)}
                    kind={kindRendered(AUTH.LOGIN)}
                >
                    Iniciar sesión
                </Button>
                <Button
                    onClick={() => pageRendered(AUTH.REGISTER)}
                    kind={kindRendered(AUTH.REGISTER)}
                >
                    Registrarse
                </Button>
            </div>
            {authPage}
        </div>
    )
}

export default Authenticate
