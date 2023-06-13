module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: [
    'react-refresh',
    'hexagonal-architecture',
    'testing-library',
    'jest-dom',
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-console': 'error',
  },
  overrides: [
    {
      files: ['./src/modules/**/*.ts'],
      rules: {
        'hexagonal-architecture/enforce': ['error'],
      },
    },
  ],
}
