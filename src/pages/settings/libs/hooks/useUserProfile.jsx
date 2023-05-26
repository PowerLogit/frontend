import { sourceCancelToken } from '@api/axios.api'
import { useEffect, useState } from 'react'

import { useAuthContext } from '../../../auth/libs/context/auth.context'
import { getProfileService } from '../services/user.service'

const useUserProfile = () => {
    const auth = useAuthContext()

    const [profile, setProfile] = useState(INITIAL_STATE)
    const [form, setForm] = useState(null)

    const setData = (data) => {
        setProfile({
            data,
            loading: false,
            error: null,
        })
    }

    const setLoading = () =>
        setProfile((prevProfile) => ({ ...prevProfile, loading: true }))

    const setError = (newError) =>
        setProfile({ data: null, loading: false, error: newError })

    const setReset = () => setForm(getInitialState(profile.data))

    const handleInput = (setValue) => (ev) => {
        setForm(setValue(ev.target.value))
    }

    useEffect(() => {
        const cancelToken = sourceCancelToken()

        if (auth.token) {
            const setters = { setData, setLoading, setError, setForm }

            loadProfile(auth.token, setters, cancelToken)
        }

        return () => cancelToken.cancel()
    }, [auth.token])

    const isFormInvalid =
        isInitialValues(form, profile.data) ||
        !form?.name.value ||
        form?.name.error ||
        !form?.surname.value ||
        form?.surname.error ||
        !form?.username.value ||
        form?.username.error ||
        !form?.email.value ||
        form?.email.error

    const isRequired = (text) => {
        if (!text.length) return 'Campo requerido'
    }

    const setName = (value) => {
        const error = isRequired(value)

        return {
            ...form,
            name: { value, error },
        }
    }

    const setSurname = (value) => {
        const error = isRequired(value)

        return {
            ...form,
            surname: { value, error },
        }
    }

    const setUsername = (value) => {
        const error = isRequired(value)

        return {
            ...form,
            username: { value, error },
        }
    }

    const setEmail = (value) => {
        const error = isRequired(value)

        return {
            ...form,
            email: { value, error },
        }
    }

    return {
        data: profile.data,
        isLoading: profile.isLoading,
        error: profile.error,
        form,
        isFormInvalid,
        handleInput,
        setters: { setReset, setName, setSurname, setUsername, setEmail },
    }
}

const INITIAL_STATE = {
    data: null,
    isLoading: true,
    error: null,
}

const loadProfile = async (bearer, setters, signal) => {
    setters.setLoading()

    const { data, error, isAborted } = await getProfileService(bearer, signal)

    if (isAborted) return
    else if (data) {
        setters.setData(data)

        setters.setForm(getInitialState(data))
    } else setters.setError(error)
}

const getInitialState = (profile) => ({
    name: {
        value: profile.name,
        error: undefined,
    },
    surname: {
        value: profile.surname,
        error: undefined,
    },
    username: {
        value: profile.username,
        error: undefined,
    },
    email: {
        value: profile.email,
        error: undefined,
    },
})

const isInitialValues = (form, profile) =>
    form?.name.value === profile?.name &&
    form?.surname.value === profile?.surname &&
    form?.username.value === profile?.username &&
    form?.email.value === profile?.email

export default useUserProfile
