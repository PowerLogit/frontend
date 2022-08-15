import { useContext, useState } from 'react'
import style from './Register.module.css'
import uuid from 'uuid-random'
import { AuthContext } from '../../../../context/auth.context'
import Button from '../../../../components/ui/components/buttons/Button'

const Register = () => {
    const { register, loading, error } = useContext(AuthContext)

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

        register(credential)
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
                    {loading ? 'Loading...' : 'Login'}
                </Button>
            </div>
        </div>
    )
}

export default Register
