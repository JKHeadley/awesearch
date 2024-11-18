// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
            search: ['./src/pages/SearchPage.tsx'],
            details: ['./src/pages/DetailsPage.tsx'],
            keywords: ['./src/pages/KeywordsToolsPage.tsx'],
            other: [
              './src/pages/AboutPage.tsx',
              './src/pages/SiteMapPage.tsx',
              './src/pages/ConcatePage.tsx',
              './src/pages/NotFoundPage.tsx',
              './src/pages/PrivacyPolicyPage.tsx',
              './src/pages/TermsOfServicePage.tsx'
            ]
          }
        }
      },
      sourcemap: true,
      // Add chunk size warnings
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', '@chakra-ui/react']
    }
  }
})
