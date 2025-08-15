// @ts-check
/// <reference types="cypress" />

import { defineConfig } from 'cypress';
import fs from 'fs';
import cucumberPreprocessor from '@badeball/cypress-cucumber-preprocessor';
import esbuildInterop from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import imageSnapshotPlugin from 'cypress-image-snapshot/plugin';
import sqlServer from 'cypress-sql-server';

const { addCucumberPreprocessorPlugin } = cucumberPreprocessor;
const { addMatchImageSnapshotPlugin } = imageSnapshotPlugin;

/** @type {any} */
const _esb = esbuildInterop;
/** @type {(cfg: Cypress.PluginConfigOptions) => import('esbuild').Plugin} */
const createEsbuildPlugin = _esb?.createEsbuildPlugin ?? _esb;

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
  reporterOptions: {
    configFile: 'multi-reporter-config.json',
  },

  e2e: {
    experimentalStudio: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    /**
     * Node plugin setup
     * @param {Cypress.PluginEvents} on
     * @param {Cypress.PluginConfigOptions} config
     * @returns {Promise<Cypress.PluginConfigOptions>}
     */
    async setupNodeEvents(on, config) {
      /** @type {any} */
      const dbConfig = {
        userName: 'CloudSAce7e739a',
        password: 'CypressD@tabase123',
        server: 'cypressservertg.database.windows.net',
        options: {
          database: 'CypressDatabase',
          encrypt: true,
          rowCollectionOnRequestCompletion: true,
        },
      };

      const envName = config.env.configEnv || 'local';
      const loaded = await getEnvConfig(envName);

      config.env = {
        ...config.env,
        ...loaded,
        stepDefinitions: config.env.stepDefinitions || 'cypress/e2e/step-definitions',
      };

      config.baseUrl = config.env.url;
      validateEnvKeys(config.env, ['url']);

      // Register SQL Server task
      on('task', sqlServer.loadDBPlugin(dbConfig));

      // Cucumber plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Esbuild plugin
      const cucumberEsbuildPlugin = createEsbuildPlugin(config);

      on(
        'file:preprocessor',
        createBundler({
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
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js',
  },
});
