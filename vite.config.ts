import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
        format: 'es',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
    cssCodeSplit: false,
    target: 'es2015',
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
})
