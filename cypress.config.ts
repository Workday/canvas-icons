import {installPlugin} from '@chromatic-com/cypress';
import {defineConfig} from 'cypress';

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
