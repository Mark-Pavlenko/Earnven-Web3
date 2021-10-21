module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'airbnb',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  rules: {
    'react/no-direct-mutation-state': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/no-deprecated': 'off',
    'react/jsx-key': 'off',
    'react/prop-types': 'off',
    'no-extra-boolean-cast': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': ['error', { endOfLine: 'lf' }],
    'no-console': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
    },
  },
};
