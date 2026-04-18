import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Explicitly disable fast refresh if it's causing issues in some environments
      fastRefresh: process.env.NODE_ENV === 'test' ? false : true 
    })
  ],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 5173,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 10000,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
