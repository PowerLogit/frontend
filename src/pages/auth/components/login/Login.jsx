import Button from '@ui/components/buttons/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../libs/context/auth.context'
import style from './Login.module.css'

const Login = () => {
    const { login, loading, error, setterAuth } = useAuthContext()
    const navigate = useNavigate()

    const [credential, setCredential] = useState({
        email: 'test@test.com',
        password: 'Administrador1234',
    })

    const handleChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        login(credential, navigate, setterAuth)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.form}>
                <label>Email:</label>
                <input
                    type='text'
                    name='email'
                    onChange={handleChange}
                    value={credential.email}
                />

                <label>Password:</label>
                <input
                    type='password'
                    name='password'
                    onChange={handleChange}
                    value={credential.password}
                />

                {error && <p className={style.error}>{error}</p>}

                <Button type='submit' onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </Button>
            </div>
        </div>
    )
}

export default Login
