// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
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
        }
      },
      sourcemap: true,
      chunkSizeWarningLimit: 1000,
    },
    
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', '@chakra-ui/react']
    },

    // Define environment variables
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'process.env.VITE_GA4_MEASUREMENT_ID': JSON.stringify(env.VITE_GA4_MEASUREMENT_ID),
      // Add other environment variables as needed
    }
  }
})
