/***********************************************************************************
 * Cypress Configuration File (ESM version)
 * Modern ES Module format with environment-specific .env loading and plugin support
 ***********************************************************************************/

import { defineConfig } from 'cypress';
import dotenv from 'dotenv';
import fs from 'fs';

/**
 * Load .env.{envName} file into Cypress.env()
 * 
 * @param {string} envName - The environment to load (e.g., local, stage, prod)
 * @returns {Object} - Parsed environment variables from file
 */
function getEnvConfig(envName) {
    const envFile = `.env.${envName}`;
    if (fs.existsSync(envFile)) {
        const config = dotenv.config({ path: envFile }).parsed;
        return config;
    } else {
        console.warn(`⚠️ Environment file ${envFile} not found. Falling back to default.`);
        return {};
    }
}

export default defineConfig({
    // Global settings
    defaultCommandTimeout: 6000,
    video: true,
    screenshotOnRunFailure: true,
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: { runMode: 1 },
    projectId: 'ProjectExample',

    env: {
        configEnv: 'local',
        url: 'https://example.cypress.io/'
    },

    // Reporting
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        reportDir: 'cypress/reports/html',
        overwrite: false,
        html: true,
        json: true
    },

    e2e: {
        /**
         * Node event hooks — allows plugins or dynamic env loading.
         * Runs before any test specs are executed.
         */
        async setupNodeEvents(on, config) {
            const environment = config.env.configEnv || 'local';
            const loadedEnv = getEnvConfig(environment);

            config.env = {
                ...config.env,
                ...loadedEnv
            };

            // Dynamically import the plugin (because it's CommonJS)
            const mochawesome = await import('cypress-mochawesome-reporter/plugin');
            mochawesome.default(on);

            return config;
        },

        specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
        supportFile: 'cypress/support/e2e.js'
    }
});
