import next from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      next,
      react,
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
    },
    rules: {
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
];
