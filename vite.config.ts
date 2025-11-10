import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Base path - use / for Vercel (default), /carwash-website/ for GitHub Pages
// Vercel automatically handles routing, so we use / for production
const base = process.env.VITE_BASE_PATH || '/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-maps': ['leaflet', 'react-leaflet'],
          'vendor-ui': ['lucide-react'],
        },
      },
    },
  },
})
