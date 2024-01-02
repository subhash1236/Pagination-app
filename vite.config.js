import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Add protocol and fix the URL
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
