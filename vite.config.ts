// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite'

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
  },
  
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
          search: ['./src/pages/SearchPage'],
          details: ['./src/pages/DetailsPage'],
          keywords: ['./src/pages/KeywordsToolsPage'],
          other: [
            './src/pages/AboutPage',
            './src/pages/SiteMapPage',
            './src/pages/ConcatePage',
            './src/pages/NotFoundPage',
            './src/pages/PrivacyPolicyPage',
            './src/pages/TermsOfServicePage'
          ]
        }
      },
      input: {
        main: 'index.html',
        googlefc: 'src/scripts/googlefc.js',
        adchoices: 'src/scripts/adchoices.js',
      },
    },
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@chakra-ui/react']
  },

  define: {
    'process.env': process.env
  }
})
