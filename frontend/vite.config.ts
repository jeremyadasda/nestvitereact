import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Or any other port you prefer for frontend dev
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy API requests to your NestJS backend
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS
      },
    },
  },
});
