/*eslint no-undef: "off"*/

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@api',
                replacement: path.resolve(__dirname, 'src/api'),
            },
            {
                find: '@components',
                replacement: path.resolve(__dirname, 'src/components'),
            },
            {
                find: '@ui',
                replacement: path.resolve(__dirname, 'src/components/ui'),
            },
            {
                find: '@config',
                replacement: path.resolve(__dirname, 'src/config'),
            },
            {
                find: '@constant',
                replacement: path.resolve(__dirname, 'src/constant'),
            },
            {
                find: '@helpers',
                replacement: path.resolve(__dirname, 'src/helpers'),
            },
            {
                find: '@context',
                replacement: path.resolve(__dirname, 'src/context'),
            },
            {
                find: '@hooks',
                replacement: path.resolve(__dirname, 'src/hooks'),
            },
            {
                find: '@auth',
                replacement: path.resolve(__dirname, 'src/pages/auth'),
            },
            {
                find: '@workout',
                replacement: path.resolve(__dirname, 'src/pages/workout'),
            },
        ],
    },
})
