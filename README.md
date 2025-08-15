# DemoCypressFramework

This is a personal Cypress-based test automation framework designed as a go-to project for learning, prototyping, and adapting into real-world applications. It follows modern testing practices and includes modular, reusable structures.

![Cypress E2E Tests](https://github.com/gonellat/DemoCypressFramework/actions/workflows/cypress-e2e.yml/badge.svg)

## 🚀 Getting Started

### Prerequisites

- Node.js ([https://nodejs.org/](https://nodejs.org/)) (LTS recommended)
- npm (comes with Node.js)
- Git
- VSCode (optional, but recommended)

### Install Dependencies

```bash
npm install
```

---

## 🗓️ Configuration Files Overview

- **.nvmrc**: Specifies the Node.js version (used with tools like nvm) to ensure devs and CI use Node 22.
- **.prettierrc**: Defines formatting rules used by Prettier (e.g., tab width, quotes, line endings).
- **commitlint.config.js**: Enforces conventional commit message formats to keep Git history clean.
- **eslint-plugins/**: Local directory for custom ESLint rules like `no-commented-code`, allowing enforcement of project-specific style or behavior.
- **ESM (ECMAScript Modules)**: This project is written using the modern ESM format:
  - All config and source files use `import` / `export` syntax instead of `require()` / `module.exports`.
  - `cypress.config.js` is written using `export default`.
  - Compatible with tools like Vite, esbuild, and Cucumber plugins that require ESM.
  - The ESM format is enabled via `"type": "module"` in `package.json`.
  - Enables top-level `await`, tree-shaking, and native browser compatibility.

---

## 🔑 Environment Config

This framework supports dynamic environment loading for different stages like `local`, `stage`, or `prod`.

### 🧪 Local Development

Environment variables are loaded from files in the `env/` folder (not committed to version control):

- `env/.env.local`
- `env/.env.stage`

These files follow the format:

```env
url=https://automationexercise.com
```

Cypress uses the `--env configEnv=local` flag to load the correct file.

### 🚀 GitHub Actions (CI)

In CI, `.env` files are not used directly.

Instead, their contents are stored securely in **GitHub Secrets**:

- `ENV_LOCAL` → used as `env/.env.local`
- `ENV_STAGE` → used as `env/.env.stage`

These are dynamically written to disk during the workflow based on the selected `configEnv`.

### 🔄 How It Works Internally

- The `cypress.config.js` file detects the environment via `config.env.configEnv`
- Then it loads the appropriate `.env` file from disk (in local dev) or from secrets (in CI)

Example:

```bash
npx cypress run --env configEnv=local
```

> 🛡️ This approach keeps the `.env` files flexible for local use and secure for CI pipelines, with no need to commit sensitive values.

---

### Run Cypress Test Runner (UI)

```bash
npx cypress open
```

### Run Tests in Headed Chrome + Edge (Parallel)

```bash
npm run test:parallel:browsers
```

### Run Tests in Headless Mode

```bash
npm run test:headed       # Chrome only
npm run test:edge         # Edge only
```

---

## 🧱 Project Structure

```
├── cypress/
│   ├── component/                    # Component test specs for Cypress Component Testing
│   ├── e2e/
│   │   ├── features/                 # Cucumber .feature files containing Gherkin scenarios
│   │   ├── step-definitions/         # Step definition files (.js/.ts) linked to Gherkin steps
│   │   ├── tests/
│   │   │   ├── ui/                   # UI E2E specs covering end-to-end user flows
│   │   │   ├── api/                  # API specs for backend endpoint validation
│   │   ├── pages/                    # Page Object Model (POM) classes for UI elements & actions
│   │   └── utils/                    # Test utilities (faker data, generators, formatters, etc.)
│   ├── fixtures/                     # Static test data in JSON or other formats
│   ├── helpers/
│   │   ├── api/                      # API helper functions for request/response handling
│   │   ├── ui/                       # UI helper functions for reusable DOM interactions
│   ├── support/
│   │   ├── commands.js               # Custom Cypress commands registered via Cypress.Commands API
│   │   ├── e2e.js                    # Global E2E support setup (runs before all E2E tests)
│   │   ├── component.js              # Global Component Testing setup
│   │   └── pageFactory.js            # Page factory to dynamically load POM classes
│   └── reports/                      # Test reports (HTML, JUnit, JSON, etc.)
├── docker/
│   ├── Dockerfile                    # Docker image definition for running Cypress in container
│   ├── docker-compose.yml            # Multi-container Docker setup (e.g., Cypress + app + services)
│   └── scripts/                      # Shell scripts for Docker build/run automation
├── types/
│   └── cypress-commands.d.ts         # TypeScript IntelliSense for custom Cypress commands
├── env/                              # Environment variable files (.env.local, .env.stage, etc.)
├── package.json                      # Project dependencies, scripts, and metadata
├── cypress.config.js                 # Cypress configuration file (ESM format)
├── tsconfig.json                     # TypeScript configuration for Cypress + project files
├── multi-reporter-config.json        # Config for Cypress multi-reporter (e.g., mochawesome, junit)
└── README.md                         # Project overview, setup instructions, and usage guide

```

---

## 📦 Features

- ✅ Cypress test runner (headed/headless/GUI)
- ✅ GitHub Actions pipeline with matrix browser support
- ✅ Multi-browser support (Chrome + Edge)
- ✅ Custom commands: `cy.captureStep()`, `cy.clearSession()`, `cy.logStep()`
- ✅ Dynamic `.env` file loading with environment validation
- ✅ Faker-based test data generation
- ✅ Type-safe command IntelliSense via `commands.d.ts`
- ✅ ESLint 9 Flat Config + Prettier + custom rules
- ✅ Mochawesome HTML + JSON reporting
- ✅ Shared linting config with ESLint 9 (Flat Config)
- ✅ Prettier integration for consistent code formatting
- ✅ Custom ESLint rule to detect commented-out code
- ✅ Page Object Model with Page Factory and BaseTest to centralize setup/teardown and remove boilerplate from every test file
- ✅ Visual regression testing with cy.visualSnapshot() and threshold support
- ✅ Component Testing support using Cypress + Vite + React
- ✅ API testing support with shared fixtures and helper methods
- ✅ Dockerized test runner with baked-in config and CLI override support
- ✅ **Cucumber BDD** with \`.feature\` + step definitions
- ✅ **CLI utility to auto-generate Page Object files from a web page** (see below)

---

## 🤩 Base Test Layer (`withBaseTest.js`)

This framework includes a lightweight test wrapper called `withBaseTest()` that simulates a **base test class**, similar to traditional Selenium or JUnit setups — but Cypress-native.

### 📍 Location

`cypress/e2e/tests/ui/withBaseTest.js`

### 🔍 What It Does

- Injects all Page Object instances (lazily loaded via `Pages`) into your test scope
- Applies shared `beforeEach` and `afterEach` logic (e.g., page reset, setup, teardown)
- Supports optional flags like `options.login` for role-based or authenticated test setup

### 🧪 Example Usage

```js
import { withBaseTest } from './withBaseTest';
import { generateUser } from '../../utils/userGenerator';

describe('Demo Account Signup Test', () => {
  withBaseTest((Pages) => {
    it('should create an account successfully', () => {
      const { name, email, password } = generateUser();

      Pages.homePage.visit();
      Pages.homePage.clickSignupLogin();
      Pages.loginSignupPage.fillSignupForm(name, email);
      Pages.accountInfoPage.fillAccountDetails(password);
      Pages.accountInfoPage.submitForm();
      Pages.accountInfoPage.verifyAccountCreated();
    });
  });
});
```

---

## 🔧 Locator Extractor Utility

You can auto-generate a Page Object from any page (public or authenticated!) using a custom script:

### 📄 Example

```bash
node scripts/locator-extractor-links.js https://testautomationu.applitools.com/learningpaths.html --style=cypress --out=cypress/pages/LearningPathsPage.js
```

### ✅ Output Includes:

- `get linkName()` methods using `cy.contains()` or `cy.get()`
- `clickLinkName()`, `typeFieldName(value)`, `selectDropdownName(option)` helper methods
- JSDoc-style comments for all methods

### ✅ Supports:

- Links, buttons, dropdowns, inputs
- Duplicate handling and naming sanitization (e.g. `2 More` → `twoMore()`)
- Cleaner method naming and grouped actions

🔹 All generated files are clean and follow Cypress or Playwright styles depending on the `--style` flag.

---

## 💻 Available Scripts

```bash

Command                                       Description
--------------------------------------------  ---------------------------------------------
npm test                                      Run all Cypress tests headless
npm run test:chrome                           Run E2E tests in Chrome (headed)
npm run test:edge                             Run E2E tests in Edge (headed)
npm run test:headed                           Run E2E tests in Chrome headed with local env
npm run test:headed:clean                     Run headed tests then clean reports
npm run test:parallel:browsers                Run Chrome + Edge in parallel
npm run test:api                              Run API tests only
npm run lint                                  Lint JS/TS files
npm run lint:fix                              Auto-fix lint errors
npm run format                                Format code with Prettier
npm run fix:all                               Lint fix + format
npm run merge:reports                         Merge mochawesome reports
npm run report:open                           Generate and open HTML report
npm run report:full                           Merge + open HTML report
npm run clean:report                          Clean old reports
npm run debug:cucumber                        Open Cypress with cucumber debug logs
docker-compose up                             Run tests in Docker
docker build -t cypress-tests .               Build Cypress Docker image
```

---

## 🥒 Cucumber BDD

se [\`@badeball/cypress-cucumber-preprocessor\`](https://github.com/badeball/cypress-cucumber-preprocessor) for Gherkin syntax.

**Feature file:** \`cypress/e2e/features/contact.feature\`
\`\`\`gherkin
Feature: Contact Page
Scenario: Open home page
Given I open the home page
\`\`\`

**Step definition:** \`cypress/e2e/step-definitions/home.steps.js\`
\`\`\`js
import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the home page", () => {
cy.visit("https://automationexercise.com");
});
\`\`\`

Configuration in \`package.json\`:
\`\`\`json
"cypress-cucumber-preprocessor": {
"stepDefinitions": "cypress/e2e/step-definitions/\*_/_.{js,ts}"
}
\`\`\`

---

## 👁️ Visual Regression Testing (`cypress-image-snapshot`)

This framework includes **pixel-perfect visual regression testing** powered by [`cypress-image-snapshot`](https://github.com/jaredpalmer/cypress-image-snapshot).

### 🔍 What It Does

- Captures screenshots during test runs
- Compares them to baseline images
- Highlights visual diffs in PRs or CI failures
- Prevents unintentional layout/styling regressions

### 📆 Snapshot Paths

- Baseline snapshots: `cypress/snapshots/`
- Visual diffs: `cypress/snapshots/__diff_output__/`

### ⚙️ Global Threshold

Set in `cypress/support/e2e.js`:

```js
addMatchImageSnapshotCommand({
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
});
```

### 🧪 Example Test

```js
import { withBaseTest } from './withBaseTest';

describe('Visual Test: Home Page', () => {
  withBaseTest((Pages) => {
    it('should visually match the homepage layout', () => {
      Pages.homePage.visit();
      cy.visualSnapshot('home-page');
    });
  });
});
```

### ⚡ Toggle Snapshot Assertions

To disable visual snapshot assertions temporarily:

```bash
npx cypress run --env configEnv=local,visualTesting=false
```

---

## 🔧 Custom Command: `cy.visualSnapshot()`

This project provides a clean helper to manage visual testing:

```js
cy.visualSnapshot(name, options?)
```

- Wraps `cy.matchImageSnapshot()`
- Skips snapshot if `Cypress.env("visualTesting") === false`

### Example:

```js
cy.visualSnapshot('dashboard', {
  failureThreshold: 0.005,
  failureThresholdType: 'percent',
});
```

---

## Linting Formatting & Code Quality

This project uses a fully configured ESLint 9 Flat Config setup with:

- `eslint-plugin-cypress`
- `eslint-plugin-jsdoc`
- `eslint-plugin-prettier`
- A local custom plugin: `eslint-plugin-no-commented-code`
- Prettier integration with auto-fix on save in VS Code

### 🧠 Custom Rule: no-commented-code

Flags any code that’s been commented out (e.g., `// const x = 1;`) to keep the test files clean and readable.

### 🛠️ Editor Setup

In `.vscode/settings.json`:

```json
{
  "eslint.validate": ["javascript", "javascriptreact"],
  "eslint.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "always"
  },
  "editor.formatOnSave": true,
  "prettier.requireConfig": true
}
```

🚀 Live linting in Problems tab + auto-fix on save

---

### 🐶 Git Hooks with Husky

This project uses **[Husky](https://typicode.github.io/husky)** to manage Git hooks.

**What it does:**

- Automatically runs checks (like `lint`, `format`, or tests) **before you commit code**
- Prevents bad code or unformatted files from getting into the repo

**Example Git hook:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run fix:all
```

✅ This runs `npm run fix:all` every time you commit, which:

- Lints the code
- Formats it with Prettier
- Stages cleaned files for commit

---

## 📄 Reporting

- 📊 Mochawesome HTML reports auto-generated
- 🎥 Screenshots and videos included on failures
- 💬 Step-level logs using `cy.captureStep()`

To generate and view the full HTML test report after any test run:
npm run report:full

---

## 🐳 Running Tests in Docker

This project includes a Dockerfile and docker-compose.yml for running Cypress in a fully isolated environment.

✅ Build the image

```bash
docker-compose build
```

✅ Run all tests

```bash
docker-compose run cypress
```

✅ Run a specific test file

```bash
docker-compose run cypress --spec cypress/e2e/tests/api/userApiTest.cy.js
```

Reports, screenshots, and videos will be written to your local machine (cypress/reports/, etc.) automatically via volume mounts.
You do not need to install Node or Cypress locally to run tests — just Docker.

## You will need them to run report generation

### 🔒 Environment Isolation Policy

Each environment (`local`, `stage`, `prod`) is defined by a single `.env.{env}` file:

- Only one env file is loaded at a time
- No merging or fallback chaining is used (e.g., `.env.stage` + `.env.stage.local`)

This ensures:

- 💡 Predictable config per environment
- 🧪 Accurate staging/prod test conditions
- 🔐 No risk of local overrides silently leaking into CI

> If you need to override values locally, use `--env configEnv=local` and create your own `.env.local` file instead.

---

## 🗓️ Configuration Files Overview

| File                           | Purpose                                                                |
| ------------------------------ | ---------------------------------------------------------------------- |
| \`cypress.config.js\`          | Main Cypress ESM config with Cucumber, esbuild, image snapshot plugins |
| \`tsconfig.json\`              | JS type-checking & loads \`types/\` for IntelliSense                   |
| \`multi-reporter-config.json\` | Config for multiple reporters (mochawesome, cucumber JSON)             |
| \`.prettierrc\`                | Prettier formatting rules                                              |
| \`.eslint.config.js\`          | ESLint flat config                                                     |
| \`.husky/\`                    | Git hooks                                                              |
| \`types/\`                     | Custom command type definitions                                        |
| \`env/.env.\*\`                | Environment variables per stage                                        |

---

## 📖 Learning Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Kitchen Sink Example](https://github.com/cypress-io/cypress-example-kitchensink)
- [Test Automation University – Cypress Course](https://testautomationu.applitools.com/cypress-tutorial/)

---

## 🔧 To Do / Future Enhancements

- ⬜ Api mocking
- ⬜ Dealing with controls

---

## 🚾 Debugging Help

📖 See the [DEBUGGING.md](./DEBUGGING.md) guide for step-by-step techniques:

- Pausing tests to inspect
- Accessing Cypress `$` and jQuery helpers
- Chrome DevTools integration
- `debugger` usage, and more

---

## 👤 Author

Tim Gonella
[GitHub Profile](https://github.com/gonellat)
