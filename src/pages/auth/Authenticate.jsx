import style from './Authenticate.module.css'
import { useState } from 'react'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Button from '@ui/components/buttons/Button'

const Authenticate = () => {
    const [formVariant, setFormVariant] = useState('login')

    const authPage = formVariant === 'login' ? <Login /> : <Register />

    return (
        <div className={style.wrapper}>
            <div className={style.wrapperButton}>
                <Button
                    onClick={() => setFormVariant('login')}
                    kind={formVariant === 'login' ? 'secondary' : 'primary'}
                >
                    Iniciar sesión
                </Button>
                <Button
                    onClick={() => setFormVariant('register')}
                    kind={formVariant === 'register' ? 'secondary' : 'primary'}
                >
                    Registrarse
                </Button>
            </div>
            {authPage}
        </div>
    )
}

export default Authenticate
