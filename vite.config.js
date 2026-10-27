import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 주소: https://zzasg961-svg.github.io/my-portfolio/
  base: '/my-portfolio/',
})
