import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  server: {
    port: 8000,
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
