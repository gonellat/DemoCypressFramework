// locator-extractor-links.js
// Extracts UI elements into Page Object with smart naming and generates click/type/select methods

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
const url = args._[0];
const style = args.style || "cypress";
const outFile = args.out || "LearningPathsPage.js";

if (!url) {
  console.error("❌ Provide a URL: node locator-extractor-links.js http://localhost:3000");
  process.exit(1);
}

// ========== Utilities ========== //

const numberWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
];

// Escape quotes for JS string safety
const escapeText = (text) => text.replace(/'/g, "\\'").replace(/"/g, '\\"');

// Convert any string to safe camelCase method name
const sanitizeName = (str) => {
  const cleaned = str
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const parts = cleaned.split(" ");
  if (!parts[0]) return "element";
  if (/^\d+$/.test(parts[0])) {
    const num = parseInt(parts[0], 10);
    parts[0] = numberWords[num] || `num${parts[0]}`;
  }
  return parts
    .map((p, i) => (i === 0 ? p.toLowerCase() : p.charAt(0).toUpperCase() + p.slice(1)))
    .join("");
};

// Creates a Cypress or Playwright getter method
const formatGetter = (name, type, selector, description = "") => {
  const doc = `  /**\n   * ${type}${description ? `: ${description}` : ""}\n   * @returns {${style === "playwright" ? "Locator" : "Cypress.Chainable"}}\n   */`;
  const body =
    style === "playwright" ? `this.page.locator('${selector}')` : `cy.get('${selector}')`;
  return `${doc}\n  get ${name}() {\n    return ${body};\n  }`;
};

// Creates a method using contains (for links/buttons with text)
const formatContains = (name, text, element = "a") => {
  const safeText = escapeText(text);
  const doc = `  /**\n   * Clickable ${element}: ${text}\n   * Use .click() to trigger\n   * @returns {${style === "playwright" ? "Locator" : "Cypress.Chainable"}}\n   */`;
  const body =
    style === "playwright"
      ? `this.page.locator('${element}', { hasText: '${safeText}' })`
      : `cy.contains('${element}', '${safeText}')`;
  return `${doc}\n  get ${name}() {\n    return ${body};\n  }`;
};

// Creates click action method
const formatClickMethod = (getterName) => {
  const methodName = `click${getterName.charAt(0).toUpperCase() + getterName.slice(1)}`;
  const doc = `  /**\n   * Clicks the ${getterName} element\n   */`;
  return style === "playwright"
    ? `${doc}\n  async ${methodName}() {\n    await this.${getterName}.click();\n  }`
    : `${doc}\n  ${methodName}() {\n    this.${getterName}.click();\n  }`;
};

// Creates typing method for inputs
const formatTypeMethod = (getterName) => {
  const methodName = `type${getterName.charAt(0).toUpperCase() + getterName.slice(1)}`;
  const doc = `  /**\n   * Types into the ${getterName} input field\n   * @param {string} value\n   */`;
  return style === "playwright"
    ? `${doc}\n  async ${methodName}(value) {\n    await this.${getterName}.fill(value);\n  }`
    : `${doc}\n  ${methodName}(value) {\n    this.${getterName}.type(value);\n  }`;
};

// Creates method to select from dropdown
const formatSelectMethod = (getterName) => {
  const methodName = `select${getterName.charAt(0).toUpperCase() + getterName.slice(1)}`;
  const doc = `  /**\n   * Selects an option from ${getterName} dropdown\n   * @param {string} option\n   */`;
  return style === "playwright"
    ? `${doc}\n  async ${methodName}(option) {\n    await this.${getterName}.selectOption(option);\n  }`
    : `${doc}\n  ${methodName}(option) {\n    this.${getterName}.select(option);\n  }`;
};

const cleanText = (text, maxLength = 50) =>
  text.replace(/\s+/g, " ").trim().substring(0, maxLength);

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector("body");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // ========== Scrape DOM ========== //

  const { links, dropdowns, buttons, inputs } = await page.evaluate(() => {
    const clean = (text) => text?.replace(/\s+/g, " ").trim();

    const getSelector = (el) => {
      return el.id
        ? `#${el.id}`
        : el.name
          ? `[name="${el.name}"]`
          : el.className
            ? `${el.tagName.toLowerCase()}.${el.className.trim().replace(/\s+/g, ".")}`
            : el.tagName.toLowerCase();
    };

    const links = Array.from(document.querySelectorAll("a"))
      .map((el) => clean(el.innerText))
      .filter((text) => text && text.length < 80);

    const dropdowns = Array.from(document.querySelectorAll("select")).map((el) => {
      const label = clean(el.labels?.[0]?.innerText);
      const name = el.name || "";
      const id = el.id || "";
      const firstOption = clean(el.options?.[0]?.text || "dropdown");
      const selector = getSelector(el);
      const labelSource = label || name || id || `dropdown ${firstOption}`;
      return { selector, label: labelSource };
    });

    const buttons = Array.from(document.querySelectorAll("button, input[type=submit]"))
      .map((el) => clean(el.innerText || el.value))
      .filter((text) => text && text.length < 80);

    const inputs = Array.from(
      document.querySelectorAll("input[type=text], input[type=email], textarea"),
    ).map((el) => {
      const label = clean(el.labels?.[0]?.innerText);
      const name = el.name || "";
      const id = el.id || "";
      const placeholder = clean(el.placeholder || "");
      const selector = getSelector(el);
      const labelSource = label || name || id || placeholder || "inputField";
      return { selector, label: labelSource };
    });

    return { links, dropdowns, buttons, inputs };
  });

  // ========== Build Methods ========== //

  const seenTexts = new Set();
  const usedNames = new Set();
  const getters = [];
  const helpers = [];

  for (const textRaw of links) {
    const text = cleanText(textRaw);
    if (seenTexts.has(text)) continue;
    seenTexts.add(text);
    let baseName = sanitizeName(text);
    let name = baseName;
    let counter = 2;
    while (usedNames.has(name)) name = `${baseName}${counter++}`;
    usedNames.add(name);
    getters.push(formatContains(name, text, "a"));
    helpers.push(formatClickMethod(name));
  }

  for (const { selector, label } of dropdowns) {
    const text = cleanText(label);
    let baseName = sanitizeName(text);
    let name = baseName;
    let counter = 2;
    while (usedNames.has(name)) name = `${baseName}${counter++}`;
    usedNames.add(name);
    getters.push(formatGetter(name, "Dropdown", selector, "Use .select('Option')"));
    helpers.push(formatSelectMethod(name));
  }

  for (const textRaw of buttons) {
    const text = cleanText(textRaw);
    if (seenTexts.has(text)) continue;
    seenTexts.add(text);
    let baseName = sanitizeName(text);
    let name = baseName;
    let counter = 2;
    while (usedNames.has(name)) name = `${baseName}${counter++}`;
    usedNames.add(name);
    getters.push(formatContains(name, text, "button"));
    helpers.push(formatClickMethod(name));
  }

  for (const { selector, label } of inputs) {
    const text = cleanText(label);
    let baseName = sanitizeName(text);
    let name = baseName;
    let counter = 2;
    while (usedNames.has(name)) name = `${baseName}${counter++}`;
    usedNames.add(name);
    getters.push(formatGetter(name, "Input field", selector, "Use .type('value')"));
    helpers.push(formatTypeMethod(name));
  }

  // ========== Output Final Page Object ========== //

  const output = `class LearningPathsPage {\n\n${getters.join("\n\n")}\n\n  // ===== Interactions =====\n\n${helpers.join("\n\n")}\n\n}\n\nexport default LearningPathsPage;\n`;

  const outPath = path.resolve(outFile);
  const dirPath = path.dirname(outPath);
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(outPath, output);

  console.log(`✅ Learning Paths Page Object written to ${outFile}`);
  await browser.close();
};

run();
