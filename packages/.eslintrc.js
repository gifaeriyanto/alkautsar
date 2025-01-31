/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'custom/next',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: ['*.sh'],
  rules: {
    'import/no-cycle': 'off',
    'react/jsx-sort-props': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'eol-last': ['error', 'always'],
    'turbo/no-undeclared-env-vars': 'off',
    camelcase: 'off',
  },
}
