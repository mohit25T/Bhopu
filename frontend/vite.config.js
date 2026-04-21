import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Only enable Fast Refresh in development mode
      fastRefresh: mode === 'development'
    })
  ],
  server: {
    host: "0.0.0.0",
    allowedHosts: [
      "apexitworld.com",
      "www.apexitworld.com",
      "erp-1-et0w.onrender.com",
      "bhopu-ao6r.onrender.com",
      "localhost",
      "127.0.0.1"
    ]
  }
}))
