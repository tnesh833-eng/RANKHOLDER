import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT ?? '5173';
const port = Number(rawPort);
const basePath = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/app.html': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/landing.html': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: () => '/index.html',
      },
      '/admin.html': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/learn.html': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/college-search.html': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/app.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/backend.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/style.css': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/theme.css': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/growup.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/growup_styles.css': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/navbar.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/lld-code.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/college-search.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/crypto-utils.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/github.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/integrations.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/reveal.js': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/3d_avatar.jpg': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
      '/Rank.png': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
