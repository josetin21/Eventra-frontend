import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
        host: true,
        port: 5173,
        https: {
            key: fs.readFileSync("certs/172.20.10.2+2-key.pem"),
            cert: fs.readFileSync("certs/172.20.10.2+2.pem"),
        },
    },
})
