// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// load .env file using dotenv
import dotenv from 'dotenv';
dotenv.config();

console.log('API URL:', process.env.VITE_API_URL);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false
      }
    }
  }
})
