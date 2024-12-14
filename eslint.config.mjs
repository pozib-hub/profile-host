import globals from "globals"
import { fixupPluginRules } from "@eslint/compat"
import esLint from '@eslint/js'
import tsLint from "typescript-eslint"
import tsParser from "@typescript-eslint/parser"
import airbnbPlugin from "eslint-config-airbnb"
import reactPlugin from "eslint-plugin-react"
import storybookPlugin from "eslint-plugin-storybook"
import i18nextPlugin from 'eslint-plugin-i18next'
import hooksPlugin from "eslint-plugin-react-hooks"
import pozibPlugin from "eslint-plugin-pozib-plugin"
import eslintConfigPrettier from "eslint-config-prettier"

const jsRules = {
  camelcase: ['off', { properties: 'never' }],
  semi: ['error', 'never'],
  'no-shadow': 'off',
  'no-underscore-dangle': 'off',
  'max-len': ['error', { code: 100, ignoreComments: true }],
  'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
  'no-plusplus': 'off',
  'no-param-reassign': 'off',
}

const tsRules = {
  "@typescript-eslint/no-unused-vars": "warn",
  "@typescript-eslint/no-explicit-any": "warn"
}

const importRules = {
  'import/no-unresolved': 'off',
  'import/prefer-default-export': 'off',
  'import/extensions': 'off',
  'import/no-extraneous-dependencies': 'off',
  "pozib-plugin/path-checker": ['error', { alias: "@" }],
  "pozib-plugin/public-api-imports": [
    'error',
    {
      alias: "@",
      testFilesPatterns: ['**/*.test.*', '**/*.story.*', '**/StoreDecorator.tsx']
    }
  ],
  "pozib-plugin/layer-imports": [
    'error',
    {
      alias: "@",
      testFilesPatterns: ['**/StoreProvider']
    }
  ],
}

const reactRules = {
  'react/require-default-props': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/jsx-props-no-spreading': 'warn',
  'react/function-component-definition': 'off',
  'react/prop-types': 'off',
  'react/jsx-filename-extension': [
    2,
    { extensions: ['.js', '.jsx', '.tsx'] },
  ],
  'jsx-a11y/click-events-have-key-events': 'off',
  "react/display-name": "off",
  "react/jsx-max-props-per-line": ["error", { maximum: 4 }]
}

const reactHookRules = {
  'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
  'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
}

const i18nextRules = {
  'i18next/no-literal-string': [
    'error',
    {
      markupOnly: true,
      ignoreattribute: ['data-testid', 'to'],
    }],
}

export default [
  esLint.configs.recommended,
  ...tsLint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  eslintConfigPrettier,
  { files: ["**/*.{js,ts,jsx}"] },
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        __IS_DEV__: true,
        PartialDeep: 'readonly',
      }
    }
  },
  {
    plugins: {
      react: reactPlugin,
      airbnb: airbnbPlugin,
      storybook: storybookPlugin,
      i18next: i18nextPlugin,
      "react-hooks": fixupPluginRules(hooksPlugin),
      "pozib-plugin": pozibPlugin
    },
  },
  {
    rules: {
      ...jsRules,
      ...tsRules,
      ...importRules,
      ...reactHookRules,
      ...reactRules,
      ...i18nextRules,
    }
  },
  {
    // overrides
    files: ['**/src/**/*.{test,stories}.{ts,tsx}', '**/assets/icons/svg/*'],
    rules: {
      'max-len': 'off',
      'i18next/no-literal-string': 'off',
    },
  },
  {
    ignores: [
      "build",
      "!node_modules/",
      "node_modules/*",
      "storybook-static/*",
      "extractedTranslations/*",
      "loki/*"
    ]
  }
]





// v8
// module.exports = {
//   env: {
//       browser: true,
//       es2021: true,
//       jest: true,
//   },
//   extends: [
//       'plugin:react/recommended',
//       'airbnb',
//       'plugin:i18next/recommended',
//       'plugin:storybook/recommended',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//       ecmaFeatures: {
//           jsx: true,
//       },
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//   },
//   plugins: [
//       'react',
//       '@typescript-eslint',
//       'i18next',
//       'react-hooks',
//   ],
//   rules: {
//       camelcase: ['off', { properties: 'never' }],
//       'linebreak-style': ['error', 'windows'],
//       'react/jsx-indent': [2, 4],
//       'react/jsx-indent-props': [2, 4],
//       indent: ['error', 4],
//       'react/jsx-filename-extension': [
//           2,
//           { extensions: ['.js', '.jsx', '.tsx'] },
//       ],
//       'import/no-unresolved': 'off',
//       'import/prefer-default-export': 'off',
//       'no-unused-vars': 'warn',
//       'react/require-default-props': 'off',
//       'react/react-in-jsx-scope': 'off',
//       'react/jsx-props-no-spreading': 'warn',
//       'react/function-component-definition': 'off',
//       'jsx-a11y/click-events-have-key-events': 'off',
//       'no-shadow': 'off',
//       'import/extensions': 'off',
//       'import/no-extraneous-dependencies': 'off',
//       'no-underscore-dangle': 'off',
//       // 'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
//       semi: ['error', 'never'],
//       'max-len': ['error', { code: 100, ignoreComments: true }],
//       'no-plusplus': 'off',
//       'i18next/no-literal-string': [
//           'error',
//           {
//               markupOnly: true,
//               ignoreattribute: ['data-testid', 'to'],
//           }],
//       'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
//       'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
//   },
//   globals: {
//       __IS_DEV__: true,
//   },
//   overrides: [
//       {
//           files: ['**/src/**/*.{test,stories}.{ts,tsx}', ''],
//           rules: {
//               'i18next/no-literal-string': 'off',
//               'max-len': 'off',
//           },
//       },
//   ],
// }











// {
//   files: ['**/*.{ts,tsx,js}'],
//   // files: ["**/*.ts"],
//   // plugins: {
//   //   react,
//   //   airbnb,
//   //   storybook,
//   //   // i18next,
//   //   "react-hooks": hooks
//   // },
//   languageOptions: {
//     // ecmaVersion: 2021,
//     // sourceType: "module",
//     // parser: tsParser,
//     // jest: true,
//     globals: {
//       ...globals.browser,
//       ...globals.node,
//       ...globals.es2021,
//       __IS_DEV__: true,
//       PartialDeep: 'readonly',
//     }
//   },
//   // env: {
//   //     browser: true,
//   //     es2021: true,
//   //     jest: true,
//   // },
//   // parser: '@typescript-eslint/parser',
//   // parserOptions: {
//   //     ecmaFeatures: {
//   //         jsx: true,
//   //     },
//   //     ecmaVersion: 'latest',
//   //     sourceType: 'module',
//   // },
//   // extends: [
//   //     'plugin:react/recommended',
//   //     'airbnb',
//   //     'plugin:i18next/recommended',
//   //     'plugin:storybook/recommended',
//   //     // 'plugin:@conarti/feature-sliced/rules',
//   // ],
//   // plugins: [
//   //     'react',
//   //     '@typescript-eslint',
//   //     'i18next',
//   //     'react-hooks',
//   // ],
//   rules: {
//     camelcase: ['off', { properties: 'never' }],
//     // 'linebreak-style': ['error', 'windows'],
//     // 'react/jsx-indent': [2, 4],
//     // 'react/jsx-indent-props': [2, 4],
//     // indent: ['error', 4],
//     // 'react/jsx-filename-extension': [
//     //     2,
//     //     { extensions: ['.js', '.jsx', '.tsx'] },
//     // ],
//     'import/no-unresolved': 'off',
//     'import/prefer-default-export': 'off',
//     'no-unused-vars': 'warn',
//     // 'react/require-default-props': 'off',
//     // 'react/react-in-jsx-scope': 'off',
//     // 'react/jsx-props-no-spreading': 'warn',
//     // 'react/function-component-definition': 'off',
//     // 'jsx-a11y/click-events-have-key-events': 'off',
//     // 'no-shadow': 'off',
//     'import/extensions': 'off',
//     'import/no-extraneous-dependencies': 'off',
//     // 'no-underscore-dangle': 'off',
//     // 'react/prop-types': 'off',
//     // // 'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
//     // semi: ['error', 'never'],
//     // 'max-len': ['error', { code: 100, ignoreComments: true }],
//     // 'no-plusplus': 'off',
//     // 'no-param-reassign': 'off',
//     // 'i18next/no-literal-string': [
//     //     'error',
//     //     {
//     //         markupOnly: true,
//     //         ignoreattribute: ['data-testid', 'to'],
//     //     }],
//     // 'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
//     // 'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
//   },
//   // globals: {
//   //     __IS_DEV__: true,
//   //     PartialDeep: 'readonly',
//   // },
//   // overrides: [
//   //     {
//   //         files: ['**/src/**/*.{test,stories}.{ts,tsx}', ''],
//   //         rules: {
//   //             'i18next/no-literal-string': 'off',
//   //             'max-len': 'off',
//   //         },
//   //     },
//   // ],
// }
