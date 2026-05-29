import {installPlugin} from '@chromatic-com/cypress';
import {defineConfig} from 'cypress';

// Enable Chromatic visual snapshots only in CI (or when explicitly opted in).
// Locally we skip the plugin so `yarn cy:run` doesn't try to attach to Electron
// via CDP and fail with a connection error.
const enableChromatic = !!process.env.CI || process.env.CHROMATIC === 'true';

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
      if (enableChromatic) {
        installPlugin(on, config);
      } else {
        // The Chromatic support file unconditionally calls
        // `cy.task('prepareArchives', ...)` in before/afterEach hooks.
        // Stub it locally so tests don't fail with an unregistered-task error.
        on('task', {
          prepareArchives: () => null,
        });
      }
    },
  },
});
