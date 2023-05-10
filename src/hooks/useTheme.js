import { useState, useEffect } from 'react'

const initialState = localStorage.theme ?? 'dark'

const useTheme = () => {
    const [theme, setTheme] = useState(initialState)

    useEffect(() => {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add(theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return { theme, toggleTheme }
}

export default useTheme
