# DemoCypressFramework

This is a personal Cypress-based test automation framework designed as a go-to project for learning, prototyping, and adapting into real-world applications. It follows modern testing practices and includes modular, reusable structures.

![Cypress E2E Tests](https://github.com/gonellat/DemoCypressFramework/actions/workflows/cypress-e2e.yml/badge.svg)

## 🚀 Getting Started

### Prerequisites

- Node.js (https://nodejs.org/) (LTS recommended)
- npm (comes with Node.js)
- Git
- VSCode (optional, but recommended)

### Install Dependencies

```bash
npm install
```

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

---

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
cypress/
├── e2e/
│   ├── pages/                  # Page Object Model classes
│   │   ├── BasePage.js         # Shared helper methods (visit, click, type)
│   │   └── [OtherPages].js
│   └── tests/
│       └── ui/                 # UI-focused test specs (e.g. demoTest.cy.js)
├── fixtures/                   # Static test data (JSON)
├── support/
│   ├── commands.js             # Custom Cypress commands (cy.captureStep, etc.)
│   ├── commands.d.ts           # IntelliSense typings for custom commands
│   └── e2e.js                  # Global test setup and hooks
env/
├── .env.local                  # Local environment variables (e.g. CYPRESS_url)
cypress.config.js               # Cypress + plugin config
package.json                    # Project metadata + scripts
scripts/                        # 🆕 CLI scripts for locators, etc.
```

---

## 📦 Features (in progress)

- ✅ Cypress test runner (headed/headless/GUI)
- ✅ GitHub Actions pipeline with matrix browser support
- ✅ Multi-browser support (Chrome + Edge)
- ✅ Custom commands: `cy.captureStep()`, `cy.clearSession()`, `cy.logStep()`
- ✅ Page Object Model with shared `BasePage`
- ✅ Dynamic `.env` file loading with environment validation
- ✅ Faker-based test data generation
- ✅ Type-safe command IntelliSense via `commands.d.ts`
- ✅ Mochawesome HTML + JSON reporting
- ✅ Shared linting config with ESLint 9 (Flat Config)
- ✅ Prettier integration for consistent code formatting
- ✅ Custom ESLint rule to detect commented-out code
- ✅ **CLI utility to auto-generate Page Object files from a web page** (see below)

---

## ⚙️ Locator Extractor Utility

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
npm run cypress:open                # Launch Cypress Test Runner UI
npm run test:headed                 # Run tests in Chrome (headed)
npm run test:edge                   # Run tests in Edge (headed)
npm run test:parallel:browsers      # Chrome + Edge parallel run
npm run merge:reports               # Merge Mochawesome JSONs into HTML report
npm run clean:report                # Remove extra screenshots/videos copied into report folder
npm run test:headed:clean           # "npm run test:headed && npm run clean:report"
npm run lint                        # Lint all project files
npm run lint:fix                    # Auto-fix lint errors where possible
npm run format                      # Format code using Prettier
npm run fix:all                     # Lint, format, and stage code (for pre-commit)
```

---

## 🧹 Linting, Formatting & Code Quality

This project uses a fully configured ESLint 9 Flat Config setup with:

- `eslint-plugin-cypress`
- `eslint-plugin-jsdoc`
- `eslint-plugin-prettier`
- A local custom plugin: `eslint-plugin-no-commented-code`
- Prettier integration with auto-fix on save in VS Code

### 🧠 Custom Rule: no-commented-code

Flags any code that’s been commented out (e.g., `// const x = 1;`) to keep the test files clean and readable.

### 🛠 Editor Setup

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

Husky hooks live in the `.husky/` folder and are triggered automatically by Git.

---

## 📄 Reporting

- 📊 Mochawesome HTML reports auto-generated
- 🎥 Screenshots and videos included on failures
- 💬 Step-level logs using `cy.captureStep()`

---

## 🧾 Configuration Files Overview

- `.nvmrc`: Specifies the Node.js version (used with tools like `nvm`) to ensure devs and CI use Node 22.
- `.prettierrc`: Defines formatting rules used by Prettier (e.g., tab width, quotes, line endings).
- `commitlint.config.js`: Enforces conventional commit message formats to keep Git history clean.
- `eslint-plugins/`: Local directory for custom ESLint rules like `no-commented-code`, allowing enforcement of project-specific style or behavior.

---

## 📖 Learning Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Kitchen Sink Example](https://github.com/cypress-io/cypress-example-kitchensink)
- [Test Automation University – Cypress Course](https://testautomationu.applitools.com/cypress-tutorial/)

---

## 🔧 To Do / Future Enhancements

- ⬜ Docker container for local or CI use
- ⬜ Environment fallback chaining (.env → .env.local)
- ⬜ Visual testing integration (e.g., Percy or Happo)
- ⬜ API testing layer with shared fixtures
- ⬜ Page factory or test data builders with Faker
- ⬜ Component Testing

---

## 🐞 Debugging Help

📖 See the [DEBUGGING.md](./DEBUGGING.md) guide for step-by-step techniques:

- Pausing tests to inspect
- Accessing Cypress `$` and jQuery helpers
- Chrome DevTools integration
- `debugger` usage, and more

---

## 👤 Author

Tim Gonella  
[GitHub Profile](https://github.com/gonellat)
