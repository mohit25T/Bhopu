import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [
      "apexitworld.com",
      "www.apexitworld.com",
      "bhopu-ao6r.onrender.com",
      "localhost",
      "127.0.0.1"
    ]
  }
})
