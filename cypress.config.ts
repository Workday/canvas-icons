import {defineConfig} from 'cypress';

export default defineConfig({
  retries: {
    runMode: 2,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
