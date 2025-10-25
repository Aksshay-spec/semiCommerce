import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/semiCommerce/', // 👈 IMPORTANT: your repo name here
})
