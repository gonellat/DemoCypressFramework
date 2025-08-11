/***********************************************************************************
 * This file is used to store any configuration specific to Cypress.
 * https://docs.cypress.io/guides/references/configuration
 * 
 * Cypress gives you the option to dynamically alter configuration options. 
 * This is helpful when running Cypress in multiple environments and on multiple developer machines.
 * https://docs.cypress.io/guides/references/configuration#Overriding-Options
 * 
 * Overriding Individual Options
 * When running Cypress from the command line you can pass a --config flag to override individual config options.
 * 
 * Specifying an Alternative Config File
 * In the Cypress CLI, you can change which config file Cypress will use with the --config-file flag.
 * 
 * https://docs.cypress.io/guides/guides/environment-variables
 * https://docs.cypress.io/api/cypress-api/env
 * Configuration options can be overridden with environment variables. 
 * export CYPRESS_VIEWPORT_WIDTH=800
 * This is especially useful in Continuous Integration or when working locally. 
 * This gives you the ability to change configuration options without modifying any code or build scripts.
 * 
 * https://docs.cypress.io/guides/references/configuration#Test-Configuration
 * Cypress provides two options to override the configuration while your test are running, 
 * Cypress.config() and suite-specific or test-specific configuration overrides.
 * 
 * Cypress.config()
 * https://docs.cypress.io/api/cypress-api/config
 * You can also override configuration values within your test using Cypress.config().
 * 
 * Test-specific Configuration
 * To apply specific Cypress configuration values to a suite or test, 
 * pass a configuration object to the test or suite function as the second argument.
 * 
 ***********************************************************************************/

// Import helper to define Cypress config
const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
const fs = require("fs");

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

module.exports = defineConfig({
    // Global settings
    defaultCommandTimeout: 6000,            // Timeout for all commands
    video: true,                             // Record video of test runs
    screenshotOnRunFailure: true,           // Capture screenshot on test failure
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: { runMode: 1 },                 // Retry once in headless mode
    projectId: "ProjectExample",             // Optional: Cypress Dashboard project ID

    // Define custom environment variables and default environment
    env: {
        configEnv: "local",                    // Used to pick .env.{env} file (can be overridden via CLI)
        url: "https://example.cypress.io/"     // Fallback URL in case no env file is used
    },

    // Configure Mochawesome reporter for HTML/JSON reporting
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
        reportDir: "cypress/reports/html",     // Output directory for reports
        overwrite: false,                      // Do not overwrite old reports
        html: true,
        json: true
    },

    // E2E test runner-specific config
    e2e: {
        /**
         * Node event hooks — allows plugins or dynamic env loading.
         * Runs before any test specs are executed.
         */
        setupNodeEvents(on, config) {
            const environment = config.env.configEnv || 'local';
            const loadedEnv = getEnvConfig(environment);

            config.env = {
                ...config.env,
                ...loadedEnv // Merge .env.{env} into Cypress.env
            };

            // Register mochawesome plugin
            require('cypress-mochawesome-reporter/plugin')(on);

            return config;
        },

        // Define the test spec pattern and support file
        specPattern: "cypress/e2e/**/*.cy.{js,ts}",
        supportFile: "cypress/support/e2e.js"
    }
});