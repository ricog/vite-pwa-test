import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        '**/*.config.{ts,js,mjs}',
        '**/test/**',
        '**/*.test.{ts,tsx}',
        'src/vite-env.d.ts',
        '**/*.{css,scss,sass,less}',
        '**/*.{svg,png,jpg,jpeg,gif,webp,ico}',
        '**/assets/**',
      ],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
})
