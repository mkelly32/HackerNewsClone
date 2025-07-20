import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect"
      }
    }

  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {

    }
  },
  prettier,
]

