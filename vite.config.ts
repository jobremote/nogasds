/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], exclude: ['src/**/*.test.tsx', 'src/**/*.stories.tsx', 'src/test', 'src/docs'], entryRoot: 'src' }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'NogasDS',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'nogasds.js' : 'nogasds.cjs'),
      cssFileName: 'nogasds',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
  },
});
