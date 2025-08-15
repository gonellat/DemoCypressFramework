// @ts-check
/**
 * Build a Cucumber HTML report from JSON output (ESM-friendly).
 * Works great on Windows with Cypress + @badeball/cypress-cucumber-preprocessor.
 *
 * Usage (after your Cypress run writes JSON):
 *   node ./cucumber-html-report.mjs
 *
 * Notes:
 * - `multiple-cucumber-html-reporter` is CommonJS; we load it via createRequire.
 * - `reportPath` must be a DIRECTORY; the tool writes an index.html inside it.
 */

import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

// CJS dependency loaded from ESM:
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const report = require('multiple-cucumber-html-reporter');

/** --------------------------------------------
 * Configurable bits (edit to match your project)
 * ---------------------------------------------*/

/**
 * Absolute path to the folder containing Cucumber JSON results produced by
 * your Cucumber preprocessor.
 * Change this if your JSON goes somewhere else.
 */
const JSON_DIR = path.resolve(process.cwd(), 'cypress', 'CucumberReport');

/**
 * Absolute path to the output folder for the HTML report.
 * The reporter will create an index.html inside this folder.
 */
const REPORT_DIR = path.resolve(process.cwd(), 'cypress', 'CucumberReport');

/** A friendly title for the report tab and header. */
const REPORT_NAME = 'Cypress Cucumber Report (ESM)';

/** Optional metadata for the report header (overridable via env). */
const PROJECT_NAME = process.env.PROJECT_NAME || 'My Project';
const RELEASE = process.env.RELEASE || 'local';
const CYCLE = process.env.CYCLE || 'dev';

/** Optional browser metadata for the report header. */
const BROWSER_NAME = process.env.BROWSER_NAME || 'Chrome';
const BROWSER_VERSION = process.env.BROWSER_VERSION || 'stable';

/** --------------------------------------------
 * Helpers
 * ---------------------------------------------*/

/**
 * Ensure a directory exists (mkdir -p).
 * @param {string} dir
 * @returns {void}
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Format a date to a readable string for the report's customData.
 * @param {Date} d
 * @returns {string}
 */
function prettyDate(d) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/** --------------------------------------------
 * Main
 * ---------------------------------------------*/

(function main() {
  ensureDir(JSON_DIR);
  ensureDir(REPORT_DIR);

  const now = new Date();

  // Host/OS info for the metadata block
  const platformName = os.platform(); // 'win32', 'darwin', 'linux'
  const platformVersion = os.release(); // e.g., '10.0.22631'
  const device = os.hostname() || 'Local machine';

  report.generate({
    jsonDir: JSON_DIR,
    reportPath: REPORT_DIR, // IMPORTANT: directory, not a file path
    pageTitle: REPORT_NAME,
    reportName: REPORT_NAME,
    displayDuration: true,
    disableLog: false,

    metadata: {
      browser: { name: BROWSER_NAME, version: BROWSER_VERSION },
      device,
      platform: { name: platformName, version: platformVersion },
    },

    customData: {
      title: 'Run Info',
      data: [
        { label: 'Project', value: PROJECT_NAME },
        { label: 'Release', value: RELEASE },
        { label: 'Cycle', value: CYCLE },
        { label: 'Execution Time', value: prettyDate(now) },
      ],
    },
  });

  // Friendly pointer for CI or local runs
  // eslint-disable-next-line no-console
  console.log(`✅ Cucumber HTML report created at: ${REPORT_DIR}${path.sep}index.html`);
})();
