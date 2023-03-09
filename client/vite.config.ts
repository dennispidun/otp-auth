import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../auth/public',
    emptyOutDir: true
  },
  plugins: [react()],
})
