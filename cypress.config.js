/***********************************************************************************
 * Cypress Configuration File (ESM version)
 * Modern ES Module format with environment-specific .env loading and plugin support
 * Happens before tests run
 ***********************************************************************************/

import { defineConfig } from "cypress";
import dotenv from "dotenv";
import fs from "fs";

/**
 * Load .env.{envName} file into Cypress.env()
 *
 * @param {string} envName - The environment to load (e.g., local, stage, prod)
 * @returns {Object} - Parsed environment variables from file
 */
function getEnvConfig(envName) {
  const envFile = `env/.env.${envName}`;
  if (fs.existsSync(envFile)) {
    console.log(`🔧 Loading env from: ${envFile}`);
    const config = dotenv.config({ path: envFile }).parsed;
    return config;
  } else {
    console.warn(`⚠️ Environment file ${envFile} not found. Falling back to default.`);
    return {};
  }
}

/**
 * Validate that all required environment variables are present.
 * @param {Object} env - The merged Cypress environment object
 * @param {string[]} requiredKeys - List of required keys to check
 */
function validateEnvKeys(env, requiredKeys = []) {
  const missingKeys = requiredKeys.filter((key) => !env[key]);

  if (missingKeys.length > 0) {
    throw new Error(`❌ Missing required environment variable(s): ${missingKeys.join(", ")}`);
  }
}

export default defineConfig({
  // 👉 Default timeout for all Cypress commands (e.g., cy.get, cy.click)
  defaultCommandTimeout: 6000,

  // 🎥 Enables video recording for test runs (especially useful in CI)
  video: true,

  // 📸 Automatically capture a screenshot when a test fails
  screenshotOnRunFailure: true,

  // 🖥 Set default viewport dimensions for tests
  viewportWidth: 1920,
  viewportHeight: 1080,

  // 🔁 Retry failed tests once in headless (runMode) mode
  retries: { runMode: 0 },

  // 📊 Cypress Dashboard project ID (used for analytics + reporting)
  projectId: "ProjectExample",

  // 🌐 Custom environment variables (can be overridden via CLI or CI)
  env: {
    // Used to load .env.{env} file dynamically (e.g., local, stage, prod)
    configEnv: "local",

    // Base URL fallback if no .env is used
    url: "https://example.cypress.io/",

    // ✅ Enables spec filtering via grep (e.g., @smoke, @signup)
    grepFilterSpecs: true,

    // 🚫 Prevents execution of filtered-out specs (no "skipped" messages)
    grepOmitFiltered: true,
  },

  // Reporting
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    /**
     * 🌱 Node event hooks for setting up plugins and custom env loading
     * This runs once before any test specs are executed
     * @param {Function} on - Cypress event hook handler
     * @param {object} config - Cypress configuration object
     * @returns {Promise<object>} Updated Cypress config
     */
    async setupNodeEvents(on, config) {
      // 📦 Determine the environment to load (e.g., 'local', 'stage', 'prod')
      const environment = config.env.configEnv || "local";

      // 📄 Load variables from corresponding .env.{environment} file
      const loadedEnv = getEnvConfig(environment);

      // 🧬 Merge loaded .env variables into Cypress environment
      config.env = {
        ...config.env,
        ...loadedEnv,
      };

      console.log(`🔧 Loading config for environment: ${environment}`);
      console.log(`🔧 Loaded URL: ${config.env.url}`);

      // ✅ Set baseUrl from env.url
      config.baseUrl = config.env.url;

      // ✅ Validate required env keys before proceeding
      validateEnvKeys(config.env, ["url"]); // Add more keys as needed

      // 🧩 Dynamically import the Mochawesome plugin (CommonJS module inside ESM project)
      const mochawesome = await import("cypress-mochawesome-reporter/plugin");
      mochawesome.default(on);

      // 🧰 Return the updated config to Cypress
      return config;
    },

    // 📁 Location of test specs (recursive pattern)
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",

    // 🔗 Path to the support file (global test hooks, commands, etc.)
    supportFile: "cypress/support/e2e.js",
  },
});
