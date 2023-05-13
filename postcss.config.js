import { NODE_ENV } from './src/config/common'

export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...(NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
}
