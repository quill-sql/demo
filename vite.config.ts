import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        // date-fns-tz v2 imports private date-fns v2 paths. Keep that resolution
        // off the date-fns v3/v4 copies used by Quill and the day picker.
        find: 'date-fns/format/index.js',
        replacement: path.join(root, 'node_modules/date-fns-v2/esm/format/index.js'),
      },
      {
        find: 'date-fns/_lib',
        replacement: path.join(root, 'node_modules/date-fns-v2/esm/_lib'),
      },
      {
        find: 'date-fns/fp/_lib',
        replacement: path.join(root, 'node_modules/date-fns-v2/esm/fp/_lib'),
      },
    ],
  },
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/quill': { target: 'http://localhost:3456', changeOrigin: true },
    },
  },
});
