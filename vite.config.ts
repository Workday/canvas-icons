import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';

const workspaceRoot = resolve(__dirname);

export default defineConfig({
  plugins: [react({})],
  root: resolve(workspaceRoot, 'cypress-app'),
  resolve: {
    alias: {
      '@workday/canvas-tokens-web': resolve(
        workspaceRoot,
        'node_modules/@workday/canvas-tokens-web'
      ),
    },
  },
  server: {
    port: 4173,
    strictPort: true,
    fs: {
      allow: [workspaceRoot],
    },
  },
});
