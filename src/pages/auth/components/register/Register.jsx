import Button from '@ui/components/buttons/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'uuid-random'
import { useAuthContext } from '../../libs/context/auth.context'
import style from './Register.module.css'

const Register = () => {
    const { register, loading, error, setterAuth } = useAuthContext()
    const navigate = useNavigate()

    const [credential, setCredential] = useState({
        id: uuid(),
        name: '',
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        register(credential, navigate, setterAuth)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.form}>
                <label>Name:</label>
                <input
                    type='text'
                    name='name'
                    onChange={handleChange}
                    value={credential.name}
                />

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
                    {loading ? 'Loading...' : 'Register'}
                </Button>
            </div>
        </div>
    )
}

export default Register
