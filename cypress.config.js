// @ts-check
/**
 * Cypress ESM config compatible with CommonJS plugins on Windows.
 * - Imports are alphabetized within the combined builtin+external group.
 * - No empty lines inside the import group (per eslint-plugin-import/order).
 */

import cucumberPreprocessor from '@badeball/cypress-cucumber-preprocessor';
import esbuildInterop from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from 'cypress';
import imageSnapshotPlugin from 'cypress-image-snapshot/plugin';
import fs from 'fs';

// CJS: default export is an object; destructure the function we need
const { addCucumberPreprocessorPlugin } = cucumberPreprocessor;

// CJS interop: the default export may be a function OR an object with { createEsbuildPlugin }.
// We cast to `any` first so VS Code stops complaining, while keeping runtime correct.
/** @type {any} */ const _esb = esbuildInterop;
/** @type {(cfg: Cypress.PluginConfigOptions) => import('esbuild').Plugin} */
const createEsbuildPlugin = _esb?.createEsbuildPlugin ?? _esb;

// CJS: default export is an object; destructure the function we need
const { addMatchImageSnapshotPlugin } = imageSnapshotPlugin;

/**
 * Load environment variables from env/.env.<envName>.
 * @param {string} envName
 * @returns {Promise<Record<string, string>>}
 */
async function getEnvConfig(envName) {
  const dotenv = (await import('dotenv')).default;
  const envFile = `env/.env.${envName}`;
  return fs.existsSync(envFile) ? (dotenv.config({ path: envFile }).parsed ?? {}) : {};
}

/**
 * Validate required environment keys.
 * @param {Record<string, any>} env
 * @param {string[]} requiredKeys
 * @returns {void}
 */
function validateEnvKeys(env, requiredKeys = []) {
  const missing = requiredKeys.filter((k) => !env[k]);
  if (missing.length) throw new Error(`Missing env vars: ${missing.join(', ')}`);
}

export default defineConfig({
  defaultCommandTimeout: 6000,
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: { runMode: 0, openMode: 0 },
  projectId: 'ProjectExample',
  env: {
    configEnv: 'local',
    url: 'https://example.cypress.io/',
    grepFilterSpecs: true,
    grepOmitFiltered: true,
    stepDefinitions: 'cypress/e2e/step-definitions/**/*.{js,ts}',
  },
  reporter: 'cypress-multi-reporters',
  reporterOptions: { configFile: 'multi-reporter-config.json' },

  e2e: {
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    /**
     * Node-side plugin setup.
     * @param {Cypress.PluginEvents} on
     * @param {Cypress.PluginConfigOptions} config
     * @returns {Promise<Cypress.PluginConfigOptions>} Resolved Cypress config
     */
    async setupNodeEvents(on, config) {
      const envName = config.env.configEnv || 'local';
      const loaded = await getEnvConfig(envName);
      config.env = {
        ...config.env,
        ...loaded,
        stepDefinitions: config.env.stepDefinitions || 'cypress/e2e/step-definitions',
      };

      config.baseUrl = config.env.url;
      validateEnvKeys(config.env, ['url']);

      // Cucumber preprocessor (must run before file:preprocessor)
      await addCucumberPreprocessorPlugin(on, config);

      // esbuild preprocessor with the Cucumber esbuild plugin
      /** @type {import('esbuild').Plugin} */
      const cucumberEsbuildPlugin = createEsbuildPlugin(config);

      on(
        'file:preprocessor',
        createBundler({
          /** @type {import('esbuild').Plugin[]} */
          plugins: [cucumberEsbuildPlugin],
        })
      );

      // Image snapshot plugin
      addMatchImageSnapshotPlugin(on, config);

      return config;
    },

    specPattern: ['cypress/e2e/**/*.feature', 'cypress/e2e/**/*.cy.{js,ts}'],
    supportFile: 'cypress/support/e2e.js',
  },

  component: {
    devServer: { framework: 'react', bundler: 'vite' },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js',
  },
});
