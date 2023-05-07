import { HttpStatusCode } from '@constant/HttpStatusCode'
import { setBearer } from '@helpers/bearer.helper'
import Button from '@ui/components/buttons/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    setIsAuth,
    setIsNotAuth,
    setNewAuth,
} from '../../libs/actions/auth.action'
import { useAuthContext } from '../../libs/context/auth.context'
import { getRedirectPath } from '../../libs/helpers/redirectPath.helper'
import { loginService, profileService } from '../../libs/services/auth.service'
import style from './Login.module.css'

const Login = () => {
    const { loading, error, dispatchAuth } = useAuthContext()
    const navigate = useNavigate()

    const [credential, setCredential] = useState({
        email: 'usuario@gmail.com',
        password: 'Admin1',
    })

    const handleChange = (ev) => {
        setCredential({
            ...credential,
            [ev.target.name]: ev.target.value,
        })
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()

        try {
            const { data, status, error } = await loginService(credential)

            if (status !== HttpStatusCode.OK) {
                throw new Error(JSON.stringify(error.message))
            }

            const { access_token } = data

            setBearer(access_token)
            dispatchAuth(setNewAuth(access_token))

            navigate(getRedirectPath())
        } catch (error) {
            const { message } = JSON.parse(error.message)
            dispatchAuth(setIsNotAuth(message))
        }
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
