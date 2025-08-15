# 🛠 Cypress Debugging Guide

This guide covers four practical ways to debug Cypress tests effectively. Whether you're inspecting DOM elements, tracking variables, or stepping through code, these options will help you stay productive and efficient.

---

## 🧭 Option 1: `cy.pause()` — Pause Test Execution in the Cypress UI

Use `cy.pause()` to pause a test mid-execution and inspect everything inside the Cypress Test Runner.

```js
it('should pause for inspection', () => {
  cy.visit('/');
  cy.get('#username').type('tim');

  cy.pause(); // Pauses test here

  cy.get('#password').type('secret');
});
```

### 🔍 What You Can Do During Pause:

- Hover over commands in the Cypress Command Log
- Inspect the app in the Test Runner
- Open Chrome DevTools (F12 or right-click → Inspect)
- Run manual commands in the DevTools Console

### 📋 Useful Manual Commands in DevTools Console

| Command                                               | Description                                     |
| ----------------------------------------------------- | ----------------------------------------------- |
| `Cypress.$("input")`                                  | Returns all `<input>` elements via jQuery       |
| `Cypress.$("#username").val()`                        | Gets the value of the input field               |
| `Cypress.$("form").attr("action")`                    | Returns the `action` attribute of a form        |
| `Cypress.$(".btn").length`                            | Counts the number of elements with `.btn` class |
| `Cypress.$("#login").css("outline", "2px solid red")` | Visually highlights an element                  |
| `Cypress._.isEmpty([])`                               | Uses Lodash to check if array is empty          |
| `Cypress._.keys({ name: "Tim" })`                     | Returns object keys via Lodash                  |

### ⚠️ Note About the 🎯 Selector Playground

The Selector Playground (target icon in the top-right of the Test Runner) **does not work while the test is paused** using `cy.pause()`.

If you want to use it:

- Use it **before** the test hits `cy.pause()`
- Or comment out `cy.pause()` temporarily and re-run the test
- Then click 🎯 and hover over page elements to copy selectors

🧠 `Cypress.$()` remains available while paused and is your best friend for DOM exploration.

---

## 🧱 Option 2: `debugger;` — Break into Chrome DevTools Debugger

Use the JavaScript `debugger` statement to pause execution and open Chrome DevTools for full variable inspection and code stepping.

```js
it('should let me inspect variables', () => {
  const user = generateUser();
  debugger; // Triggers DevTools pause
  cy.visit('/');
});
```

### ✅ How to Use:

1. Run `npx cypress open`
2. Click the spec in the Test Runner
3. DevTools will open automatically (or press F12)
4. You can now inspect variables, step through code, and set breakpoints

> 💡 Best for variable-level inspection during test development

### ⏱ Optional: Add Delay to Open DevTools Before `debugger;`

If the test is running too fast to press F12 before `debugger;` executes, add a delay like this:

```js
const { name, email, password } = generateUser();

cy.wait(2000); // Wait 2 seconds so you can press F12

debugger; // Now DevTools will catch this pause
```

This ensures you can open DevTools before `debugger;` is hit.

---

## 📝 Option 3: `cy.log()` and `console.log()` — Log for Later Review

Use logging to output info without interrupting test flow.

```js
const user = generateUser();
cy.log(`Using name: ${user.name}`);
console.log('DEBUG - full user:', user);
```

- `cy.log()` outputs to the Cypress Command Log
- `console.log()` outputs to DevTools Console (F12)

Use `cy.then()` if you want to log values from Cypress commands:

```js
cy.get('#username').then(($el) => {
  console.log('Username input element:', $el);
});
```

---

## 🧪 Option 4: `cy.then()` for Controlled Debugging

Use `cy.then()` to run custom JavaScript at specific points in the command chain.

```js
cy.get('#email').then(($email) => {
  console.log('Email value:', $email.val());
});
```

- Great for inspecting DOM state mid-test
- Works well with async Cypress behavior

You can combine it with `debugger;` if needed:

```js
cy.get('#submit').then(() => {
  debugger;
});
```

---

## ✅ Final Tip

Use `cy.pause()` to inspect the app visually, and `debugger;` or DevTools Console to explore variable state. You can mix and match these tools for powerful real-time debugging.

Let Tim know if you want to add VS Code debugger integration or full test step tracing next!
