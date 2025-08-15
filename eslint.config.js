// @ts-check
/**
 * Flat ESLint config tuned for:
 * - Windows CRLF line endings
 * - ESM + Cypress + Cucumber + Prettier
 * - Deprecated API detection (TS files only)
 * - Clean JSDoc and import hygiene
 */

import js from '@eslint/js';
import cypressPlugin from 'eslint-plugin-cypress';
import importPlugin from 'eslint-plugin-import';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import prettierPlugin from 'eslint-plugin-prettier';
import deprecationPlugin from 'eslint-plugin-deprecation';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

import noCommentedCodePlugin from './eslint-plugins/eslint-plugin-no-commented-code/index.js';

// Base recommended
const baseRecommended = js.configs.recommended;

// Plugin casts for @ts-check
const cypress = /** @type {import('eslint').ESLint.Plugin} */ (
  /** @type {unknown} */ (cypressPlugin)
);
const jsdoc = /** @type {import('eslint').ESLint.Plugin} */ (/** @type {unknown} */ (jsdocPlugin));
const prettier = /** @type {import('eslint').ESLint.Plugin} */ (
  /** @type {unknown} */ (prettierPlugin)
);
const pluginImport = /** @type {import('eslint').ESLint.Plugin} */ (
  /** @type {unknown} */ (importPlugin)
);
const noCommentedCode = /** @type {import('eslint').ESLint.Plugin} */ (
  /** @type {unknown} */ (noCommentedCodePlugin)
);
const deprecation = /** @type {import('eslint').ESLint.Plugin} */ (
  /** @type {unknown} */ (deprecationPlugin)
);

export default [
  // Global ignores
  {
    ignores: [
      '**/*.d.ts',
      'node_modules/',
      'cypress/videos/',
      'cypress/screenshots/',
      'cypress/reports/',
      'dist/',
      'coverage/',
    ],
  },

  baseRecommended,

  // Main JS/TS config (no TS parser here)
  {
    files: ['**/*.{js,ts}'],
    plugins: {
      cypress,
      jsdoc,
      prettier,
      import: pluginImport,
      'no-commented-code': noCommentedCode,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
      },
    },
    rules: {
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'off',
      semi: ['error', 'always'],
      quotes: 'off',
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
            FunctionDeclaration: false,
            ArrowFunctionExpression: false,
          },
        },
      ],
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',
      'import/no-unresolved': 'off',
      'import/order': [
        'warn',
        {
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
        },
      ],
      'no-commented-code/no-commented-code': 'warn',
    },
  },

  // TS-only block with deprecation checks
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    plugins: { deprecation },
    rules: {
      'deprecation/deprecation': 'warn',
    },
  },

  // Cypress-specific refinements
  {
    files: [
      'cypress/**/*.cy.{js,ts}',
      'cypress/**/tests/**/*.{js,ts}',
      'cypress/e2e/**/*.{js,ts}',
      'cypress/component/**/*.{js,ts}',
      'cypress/support/**/*.{js,ts}',
      'cypress/step-definitions/**/*.{js,ts}',
    ],
    plugins: { cypress },
    rules: {
      'cypress/no-unnecessary-waiting': 'warn',
    },
  },
];
