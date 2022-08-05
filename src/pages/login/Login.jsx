import { useContext, useState } from 'react'
import style from './login.module.css'
import { AuthContext } from '../../context/auth.context'

const Login = () => {
    const { login, loading, error } = useContext(AuthContext)

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

        login(credential)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <div className={style.form}>
                    <h1>Login</h1>

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

                    <button
                        type='submit'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </div>
                <div className={style.img}>
                    <img
                        src='https://sc01.alicdn.com/kf/H289eaf13768442f8b7865309a649ab37x.jpg'
                        alt=''
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
