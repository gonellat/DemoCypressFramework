# DemoCypressFramework

This is a personal Cypress-based test automation framework designed as a go-to project for learning, prototyping, and adapting into real-world applications. It follows modern testing practices and includes modular, reusable structures.

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm
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

### Run All Tests (Headless)
```bash
npx cypress run
```

---

## 🧱 Project Structure

```
cypress/
├── e2e/               # Test specs
├── pageObjects/       # Page objects (optional for structure)
├── fixtures/          # Test data
├── support/
│   ├── commands.js    # Custom reusable commands
│   └── e2e.js         # Global setup
cypress.config.js      # Cypress configuration
package.json           # Project dependencies and scripts
```

---

## 📦 Features (in progress)

- ✅ Cypress setup with example tests
- ✅ JSON-based test data using fixtures
- ⬜ Page Object Model structure
- ⬜ Custom commands (`cy.login()`, `cy.customClick()`)
- ⬜ CI integration (GitHub Actions)
- ⬜ Reporting (Cypress Dashboard or Mochawesome)
- ⬜ Docker support for local runs
- ⬜ SonarQube / linting integration
- ⬜ XML/Excel test data (exploratory)
- ⬜ Logging and debug output

---

## 💻 Useful Commands

```bash
npx cypress run                 # Run all tests headless
npx cypress open                # Launch Cypress Test Runner
```

---

## 📖 Learning Resources

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Kitchen Sink Example](https://github.com/cypress-io/cypress-example-kitchensink)
- [Test Automation University – Cypress Course](https://testautomationu.applitools.com/cypress-tutorial/)

---

## 🔧 To Do / Future Enhancements

- Integrate POM structure and utilities
- Add cross-browser testing support
- Create reusable test utility functions
- Set up test result reporting
- Build Docker-compatible test execution

---

## 👤 Author

Tim Gonella  
[GitHub Profile](https://github.com/your-username) *(update with your GitHub link)*
