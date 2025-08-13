/***********************************************************************************
 * Cypress Configuration File (ESM version)
 * Modern ES Module format with environment-specific .env loading and plugin support
 ***********************************************************************************/

import { defineConfig } from "cypress";
import fs from "fs";
import { addMatchImageSnapshotPlugin } from "cypress-image-snapshot/plugin";

/**
 * Load .env.{envName} file into Cypress.env()
 *
 * @param {string} envName - The environment to load (e.g., local, stage, prod)
 * @returns {Object} - Parsed environment variables from file
 */
async function getEnvConfig(envName) {
  const dotenv = (await import("dotenv")).default;
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
  defaultCommandTimeout: 6000,
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: { runMode: 0 },
  projectId: "ProjectExample",
  env: {
    configEnv: "local",
    url: "https://example.cypress.io/",
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },

  e2e: {
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",

    async setupNodeEvents(on, config) {
      const environment = config.env.configEnv || "local";
      const loadedEnv = getEnvConfig(environment);

      config.env = {
        ...config.env,
        ...loadedEnv,
      };

      console.log(`🔧 Loading config for environment: ${environment}`);
      console.log(`🔧 Loaded URL: ${config.env.url}`);

      config.baseUrl = config.env.url;
      validateEnvKeys(config.env, ["url"]);

      addMatchImageSnapshotPlugin(on, config);

      const mochawesome = await import("cypress-mochawesome-reporter/plugin");
      mochawesome.default(on);

      return config;
    },

    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    supportFile: "cypress/support/e2e.js",
  },
});
