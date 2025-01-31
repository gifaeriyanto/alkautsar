module.exports = {
  root: true,
  extends: ['custom/next'],
  rules: {
    'react/jsx-sort-props': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'eol-last': ['error', 'always'],
    camelcase: 'off',
    'react/no-unstable-nested-components': [
      'warn',
      {
        allowAsProps: true,
      },
    ],
  },
}
