import {fixupPluginRules} from '@eslint/compat';
import eslintJs from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
// @ts-ignore
import reactNativePlugin from '@react-native/eslint-config';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// @ts-ignore
import reactNativeOldPlugin from 'eslint-plugin-react-native';
import tseslint from 'typescript-eslint';
import {defineConfig} from 'eslint/config';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineConfig([
  {
    name: 'eslint-plugin-react-native',
    plugins: {
      'react-native': fixupPluginRules({
        rules: reactNativeOldPlugin.rules,
      }),
    },
    rules: reactNativeOldPlugin.configs.all.rules,
  },
  {
    name: '@react-native/eslint-plugin',
    plugins: {
      '@react-native': reactNativePlugin,
    },
  },
  {
    files: ['**/*.{ts,tsx}', '**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    ignores: [
      '**/node_modules/**',
      '**/android/**',
      '**/ios/**',
      '**/assets/**',
      '**/src/assets/**',
      '**/*.json',
      '**/*.css',
      '**/*.md',
      '**/*.env*',
      '**/*.png',
      '**/*.jpg',
      '**/*.jpeg',
      '**/*.gif',
      '**/*.svg',
      '**/*.d.ts',
      '**/*.native.tsx',
      'babel.config.js',
      'metro.config.js',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/ignore': ['react-native'],
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs['recommended-typescript'],
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      testingLibrary.configs['flat/dom'],
    ],
    rules: {
      ...importPlugin.configs['recommended'].rules,
      //  Imports
      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'type', 'index'],
          pathGroups: [
            {
              pattern: 'react+(|-native)',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@app/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-native', 'type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-duplicates': ['error', {considerQueryString: true}],
      'import/no-named-as-default-member': 'off',
      'import/prefer-default-export': 'off',
      // 'import/no-default-export': 'error',

      // Possible Errors & Best Practices
      'no-console': ['warn', {allow: ['warn', 'error']}],
      'no-duplicate-imports': 'error',
      eqeqeq: ['error', 'always', {null: 'ignore'}],
      'spaced-comment': ['error', 'always', {markers: ['/']}],

      // TypeScript-specific
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {prefer: 'type-imports', fixStyle: 'inline-type-imports'},
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Rule overrides
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      // React Specific
      'react-native/no-unused-styles': 'warn',
      '@eslint-react/no-missing-key': 'warn',
      'react-native/no-raw-text': [
        'error',
        {
          skip: ['ButtonText', 'Button'],
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
]);
