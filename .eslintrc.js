module.exports = {
  env: {
    browser: true,
    es2021: true,
    meteor: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/no-unresolved': ['error', { ignore: ['^meteor/', '^/'] }],
    'max-len': ['error', { code: 256 }],
    'no-underscore-dangle': ['error', { allow: ['_id', '_lastSessionId'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
};
