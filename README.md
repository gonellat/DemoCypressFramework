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

```

---

## 📦 Features (in progress)

- ✅ Cypress test runner (headed/headless/GUI)
- ✅ Multi-browser support (Chrome + Edge)
- ✅ Custom commands: cy.captureStep(), cy.clearSession(), cy.logStep()
- ✅ Page Object Model with shared BasePage
- ✅ Dynamic .env file loading with environment validation
- ✅ Faker-based test data generation
- ✅ Type-safe command IntelliSense via commands.d.ts
- ✅ Mochawesome HTML + JSON reporting
- ✅ Shared linting config with ESLint 9 (Flat Config)
- ✅ Prettier integration for consistent code formatting
- ✅ Custom ESLint rule to detect commented-out code

---

## 🔑 Environment Config

Supports dynamic environment loading using --env configEnv=local|stage|prod.
Your .env.local file (located in /env/) should include:

```bash
url=https://automationexercise.com
```

---

## 💻 Available Scripts

```bash
npm run cypress:open                # Launch Cypress Test Runner UI
npm run test:headed                 # Run tests in Chrome (headed)
npm run test:edge                   # Run tests in Edge (headed)
npm run test:parallel:browsers      # Chrome + Edge parallel run
npm run merge:reports               # Merge Mochawesome JSONs into HTML report
npm run lint                        # Lint all project files
npm run lint:fix                    # Auto-fix lint errors where possible
npm run format                      # Format code using Prettier
npm run fix:all                     # Lint, format, and stage code (for pre-commit)
```

---

🧹 Linting, Formatting & Code Quality
This project uses a fully configured ESLint 9 Flat Config setup with:

- eslint-plugin-cypress
- eslint-plugin-jsdoc
- eslint-plugin-prettier
- A local custom plugin: eslint-plugin-no-commented-code
- Prettier integration with auto-fix on save in VS Code

🧠 Custom Rule: no-commented-code
Flags any code that’s been commented out (e.g., // const x = 1;) to keep the test files clean and readable.

🛠 Editor Setup
In .vscode/settings.json:

```bash
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

## 📄 Reporting

- 📊 Mochawesome HTML reports auto-generated
- 🎥 Screenshots and videos included on failures
- 💬 Step-level logs using cy.captureStep()

---

## 📖 Learning Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Kitchen Sink Example](https://github.com/cypress-io/cypress-example-kitchensink)
- [Test Automation University – Cypress Course](https://testautomationu.applitools.com/cypress-tutorial/)

---

## 🔧 To Do / Future Enhancements

- ⬜ Add GitHub Actions pipeline with matrix browser support
- ⬜ Docker container for local or CI use
- ⬜ Environment fallback chaining (.env → .env.local)
- ⬜ Visual testing integration (e.g., Percy or Happo)
- ⬜ API testing layer with shared fixtures
- ⬜ Page factory or test data builders with Faker

---

## 👤 Author

Tim Gonella  
[GitHub Profile](https://github.com/gonellat)
