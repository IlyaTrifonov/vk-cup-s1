module.exports = {
  extends: [
    'eslint:recommended',
    'react-app',
  ],
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    indent: ['error', 2, {'ignoredNodes': ['JSXAttribute']}],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-multiple-empty-lines': ['error', {'max': 2, 'maxEOF': 0}],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'no-mixed-spaces-and-tabs': ['error'],
    'jsx-quotes': ['error', 'prefer-double'],
    'array-callback-return': ['error', { allowImplicit: true }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'react/jsx-indent-props': ['error', 'first'],
  },
};
