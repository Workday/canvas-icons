import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: [
      '**/node_modules/**',
      'node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.cache/**',
      '.cache/**',
      '.cache/',
      'docs/**',
      'packages/canvas-icons-docs/**',
    ],
  },
  {
    files: ['**/*.{ts,tsx,jsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        browser: true,
        es6: true,
        node: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      '@typescript-eslint/naming-convention': [
        'error',
        {selector: ['class', 'interface'], format: ['PascalCase']},
      ],
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/type-annotation-spacing': 'off',
      'arrow-parens': ['off', 'as-needed'],
      'default-case': 'error',
      'dot-notation': 'error',
      'eol-last': 'off',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'linebreak-style': 'off',
      'new-parens': 'off',
      'newline-per-chained-call': 'off',
      'no-caller': 'error',
      'no-duplicate-imports': 'error',
      'no-debugger': 'error',
      'no-empty': 'error',
      'no-empty-function': 'error',
      'no-eval': 'error',
      'no-extra-semi': 'off',
      'no-fallthrough': 'error',
      'no-irregular-whitespace': 'off',
      'no-multiple-empty-lines': 'off',
      'no-new-wrappers': 'error',
      'no-param-reassign': 'error',
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': ['error'],
      'no-undef-init': 'error',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'error',
      'no-unused-labels': 'error',
      'no-use-before-define': 'off',
      'no-var': 'error',
      'prefer-const': 'off',
      'space-before-function-paren': 'off',
      curly: 'error',
      radix: 'error',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      'no-empty-function': 'off',
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: true,
        process: true,
        __dirname: true,
        __filename: true,
        Buffer: true,
        URL: true,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      'no-empty': 'error',
      'no-empty-function': 'error',
      'no-var': 'error',
      'prefer-const': 'off',
      curly: 'error',
    },
  },
  eslintConfigPrettier,
];
