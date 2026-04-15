import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'

const isDev = process.env.NODE_ENV !== 'production'

const httpsConfig = isDev && fs.existsSync('certs/172.20.10.2+2-key.pem')
    ? {
        key: fs.readFileSync('certs/172.20.10.2+2-key.pem'),
        cert: fs.readFileSync('certs/172.20.10.2+2.pem'),
    }
    : false

export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        https: httpsConfig,
    },
})