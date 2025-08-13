# Cypress Component Testing Setup (Minimal React + Vite)

This document provides a summary of how Cypress Component Testing (CT) was set up in this project — even without a full application scaffold.

---

## 🧪 What We Did (Summary)

### ✅ 1. Created a sample **React component** for testing

File: `src/components/CheckboxSection.jsx`

This file contains a simple checkbox component written in **React**, a popular JavaScript library for building UI.

```jsx
export function CheckboxSection() {
  return (
    <fieldset>
      <legend>Choose Options</legend>
      <label>
        <input type="checkbox" name="option1" />
        Option 1
      </label>
      <label>
        <input type="checkbox" name="option2" />
        Option 2
      </label>
    </fieldset>
  );
}
```

React was used here **only to simulate component testing**, since CT needs a component framework. We're not building a full React app.

---

### ✅ 2. Created a Cypress Component Test

File: `cypress/component/CheckboxSection.cy.js`

This file tests the checkbox component:

```jsx
import { CheckboxSection } from "../../src/components/CheckboxSection";
import { mount } from "cypress/react";

describe("<CheckboxSection />", () => {
  it("should allow checking both boxes", () => {
    mount(<CheckboxSection />);
    cy.contains("Option 1").find("input").check().should("be.checked");
    cy.contains("Option 2").find("input").check().should("be.checked");
  });
});
```

---

### ✅ 3. Installed and configured **Vite**

Vite is a fast frontend build tool that Cypress uses to compile and mount your components during Component Testing.

We installed:

```bash
npm install --save-dev vite@4 @vitejs/plugin-react@4 --legacy-peer-deps
```

Then created a config file:

**File:** `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

> ⚠️ We used Vite v4 to avoid compatibility issues with Cypress’s CommonJS loader.

---

### ✅ 4. Created CT support file

**File:** `cypress/support/component.js`

```js
// cypress/support/component.js

// Registers shared Cypress commands for CT tests
import "./commands";

// Optional CT-specific setup
beforeEach(() => {
  cy.log("🧪 [CT] Running component test");
});
```

> This file runs only for Component Tests and is similar to `e2e.js`, but scoped to component-level hooks and setup.

---

### ✅ 5. Created `component-index.html`

**File:** `cypress/support/component-index.html`

This is required by Cypress’s Vite dev server to serve a base HTML document to mount your component into.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Component Test</title>
  </head>
  <body>
    <div id="__cy_root"></div>
  </body>
</html>
```

Without this file, Cypress would crash with a `ENOENT` error while running CT.

---

### ✅ 6. Enabled Component Testing in Cypress config

In `cypress.config.js`, we added:

```js
component: {
  devServer: {
    framework: 'react',
    bundler: 'vite',
  },
  specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
  supportFile: 'cypress/support/component.js',
},
```

This tells Cypress how to launch the CT dev server.

---

## ✅ Final Structure Added

```
src/
└── components/
    └── CheckboxSection.jsx

cypress/
├── component/
│   └── CheckboxSection.cy.js
├── support/
│   ├── component.js
│   └── component-index.html

vite.config.js
```

---

## 🧠 Notes

- Cypress Component Testing needs a UI framework (React, Angular, etc.) to mount components
- You do NOT need a full app — just components and Vite
- Component Testing is useful for isolating UI logic, layout, and edge cases

---
