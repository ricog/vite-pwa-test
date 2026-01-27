import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

const isRelaxed = process.env.ESLINT_RELAXED === 'true';

export default tseslint.config([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      // Switch between basic and type-aware rules
      ...(isRelaxed
        ? [tseslint.configs.recommended]
        : [tseslint.configs.recommendedTypeChecked]
      ),
      reactRefresh.configs.vite,
      // Only include React plugins in strict mode
      ...(isRelaxed ? [] : [
        reactX.configs['recommended-typescript'],
        reactDom.configs.recommended,
      ])
    ],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      // Only add parser options for type-aware linting
      ...(isRelaxed ? {} : {
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        }
      })
    },
  },
])
