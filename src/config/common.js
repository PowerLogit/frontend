const { VITE_URL_BACKEND } = import.meta.env

export const URL_BACKEND = VITE_URL_BACKEND || 'http://127.0.0.1:3100'
