import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// HashRouter is used so GitHub Pages works without extra server config.
// If you later use a custom domain or project site with proper 404 handling,
// you can switch to BrowserRouter and set base: '/Dreamcobots-Grok-Revolutionary/'
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
