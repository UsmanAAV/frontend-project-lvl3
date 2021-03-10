module.exports = {
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
  },
  plugins: ['cypress', 'prettier'],
};
