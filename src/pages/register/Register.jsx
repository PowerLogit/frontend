import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import style from './register.module.css'
import uuid from 'uuid-random'

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
            <div className={style.box}>
                <div className={style.form}>
                    <h1>Register</h1>

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

                    <button
                        type='submit'
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Register'}
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

export default Register
