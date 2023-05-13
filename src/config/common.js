const { VITE_URL_BACKEND, VITE_NODE_ENV } = import.meta.env

export const URL_BACKEND = VITE_URL_BACKEND || 'http://127.0.0.1:3100'
export const NODE_ENV = VITE_NODE_ENV || 'production'
