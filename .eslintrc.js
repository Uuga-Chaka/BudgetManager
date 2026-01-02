const OFF = 0;
// const WARNING = 1;
const ERROR = 2;

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    '@react-native',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      typescript: {},
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    },
    'import/ignore': ['node_modules/react-native/index\\.js$'],
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import', 'react', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    // == Imports ==
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/no-named-as-default-member': 'off',
    // ==== Possible Errors & Best Practices ====
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    // 'no-unused-vars': 'off',
    'no-duplicate-imports': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    // 'consistent-return': 'error',

    // ==== React & Hooks ====
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/react-in-jsx-scope': 'off',

    // ==== TypeScript-specific ====
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-var-requires': 'off',

    // === Prettier ===
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    // 'react/jsx-first-prop-new-line': ['error', 'multiline'],
    // 'react/jsx-closing-bracket-location': [
    //   'error',
    //   {
    //     nonEmpty: 'after-props',
    //     selfClosing: 'tag-aligned'
    //   }
    // ]
  },
};
