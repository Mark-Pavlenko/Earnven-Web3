module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    'no-extra-boolean-cast': 'off',
    'react/no-direct-mutation-state': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/no-deprecated': 'off',
    'react/jsx-key': 'off',
    'react/prop-types': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
  },
};
