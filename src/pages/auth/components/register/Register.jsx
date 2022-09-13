import { HttpStatusCode } from '@constant/HttpStatusCode'
import { setBearer } from '@helpers/bearer.helper'
import Button from '@ui/components/buttons/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setIsNotAuth, setNewAuth } from '../../libs/actions/auth.action'
import { useAuthContext } from '../../libs/context/auth.context'
import { getRedirectPath } from '../../libs/helpers/redirectPath.helper'
import { registerService } from '../../libs/services/auth.service'
import style from './Register.module.css'

const Register = () => {
    const { loading, error, dispatchAuth } = useAuthContext()
    const navigate = useNavigate()

    const [credential, setCredential] = useState({
        id: '',
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

        try {
            const newUser = {
                id: crypto.randomUUID(),
                name: credential.name,
                email: credential.email,
                password: credential.password,
            }

            const { data, status, error } = await registerService(newUser)

            if (status !== HttpStatusCode.CREATED)
                throw new Error(error.message)

            setBearer(data)

            dispatchAuth(setNewAuth())

            navigate(getRedirectPath())
        } catch (error) {
            dispatchAuth(setIsNotAuth(error.message))
        }
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
