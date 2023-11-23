/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    mode: 'production',
    outDir: 'dist', 
    rollupOptions: {
      input: 'src/main.tsx',
    },
  },
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
  },
  base: '/',
});
