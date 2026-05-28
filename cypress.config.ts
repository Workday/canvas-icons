import {installPlugin} from '@chromatic-com/cypress';
import {defineConfig} from 'cypress';

// Required by @chromatic-com/cypress so it can attach to the Electron browser
// via CDP. Set here so we don't have to prefix every `yarn cy:*` invocation.
process.env.ELECTRON_EXTRA_LAUNCH_ARGS ??= '--remote-debugging-port=9222';

export default defineConfig({
  projectId: 'u8mm8z',
  env: {
    disableAutoSnapshot: true,
  },
  retries: {
    runMode: 2,
  },
  e2e: {
    baseUrl: 'http://localhost:4173',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    numTestsKeptInMemory: 0,
    setupNodeEvents(on, config) {
      installPlugin(on, config);
    },
  },
});
