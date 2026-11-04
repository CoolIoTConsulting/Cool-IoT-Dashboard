import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' makes the built site work from any sub-path (GitHub Pages project
// sites live at https://<user>.github.io/<repo>/).
export default defineConfig({
  base: './',
  plugins: [react()],
})
