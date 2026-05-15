import nxEslintPlugin from '@nx/eslint-plugin';
import jsoncParser from 'jsonc-eslint-parser';

import rootConfig from '../../eslint.config.mjs';

export default [
  ...rootConfig,
  {
    files: ['**/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      '@nx': {
        rules: nxEslintPlugin.rules,
      },
    },
    rules: {
      '@nx/dependency-checks': 'error',
    },
  },
  {
    files: ['package.json', 'executors.json'],
    rules: {
      '@nx/nx-plugin-checks': 'error',
    },
  },
];
