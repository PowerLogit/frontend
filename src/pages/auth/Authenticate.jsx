import Button from '@ui/components/buttons/Button'
import { useState } from 'react'
import style from './Authenticate.module.css'
import Login from './components/login/Login'
import Register from './components/register/Register'

const Authenticate = () => {
    const [formVariant, setFormVariant] = useState('login')

    const authPage = formVariant === 'login' ? <Login /> : <Register />

    const kindRendered = (state) =>
        formVariant === state ? 'secondary' : 'primary'

    return (
        <div className={style.wrapper}>
            <div className={style.wrapperButton}>
                <Button
                    onClick={() => setFormVariant('login')}
                    kind={kindRendered('login')}
                >
                    Iniciar sesión
                </Button>
                <Button
                    onClick={() => setFormVariant('register')}
                    kind={kindRendered('register')}
                >
                    Registrarse
                </Button>
            </div>
            {authPage}
        </div>
    )
}

export default Authenticate
