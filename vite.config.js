import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// eslint-disable-next-line no-undef
const base = process.env.NODE_ENV === 'production' ? '/numerai/' : '/'


// https://vitejs.dev/config/
export default defineConfig({
  base: base,
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
