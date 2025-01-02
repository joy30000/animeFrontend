import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // Bind to 0.0.0.0 for external access
    port: process.env.PORT || 3000, // Use the environment port or a fallback port
  },
  plugins: [react()],
})
