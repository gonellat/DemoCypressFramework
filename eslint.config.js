import js from "@eslint/js";
import cypress from "eslint-plugin-cypress";
import jsdoc from "eslint-plugin-jsdoc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import noCommentedCodePlugin from "./eslint-plugins/eslint-plugin-no-commented-code/index.js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    ignores: [
      "node_modules/",
      "cypress/videos/",
      "cypress/screenshots/",
      "cypress/reports/", // ✅ Exclude all reports (HTML, JSON, etc.)
    ],
    plugins: {
      cypress,
      jsdoc,
      prettier: eslintPluginPrettier,
      "no-commented-code": noCommentedCodePlugin,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
      "jsdoc/require-param": "warn",
      "jsdoc/require-returns": "warn",
      "prettier/prettier": "warn",
      "no-commented-code/no-commented-code": "warn",
    },
  },
];
