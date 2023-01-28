module.exports = {
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    'eslint:recommended',
    'react-app',
    // 'plugin:react-hooks/recommended',
    // "plugin:react/recommended"
  ],
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    // Tells eslint how to resolve imports
    // 'import/resolver': {
    // 	node: {
    // 		paths: ['src'],
    // 		extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 	},
    // },
  },
  rules: {
    // Add your own rules here to override ones from the extended configs.
    // indent: ['error', 2],
    // indent: ['error', 2, { 'ignoredNodes': ['JSXElement *', 'JSXElement']}],

    indent: ['error', 2, {'ignoredNodes': ['JSXAttribute']}],
    // indent: ['error', 2, { 'ignoredNodes': ['JSXAttribute', 'JSXSpreadAttribute']}],

    // 'react/jsx-indent': [1, 2, {checkAttributes: false}],
    // 'react/jsx-indent': [1, 2, {checkAttributes: true}],
    // indent: ['error', 'tab'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-multiple-empty-lines': ['error', {'max': 2, 'maxEOF': 0}],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    // 'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'no-mixed-spaces-and-tabs': ['error'],
    // // 'no-extra-boolean-cast': ['error', {'enforceForLogicalOperands': true}]
    // 'no-extra-boolean-cast': 'warn'
    'jsx-quotes': ['error', 'prefer-double'],

    // 'react/jsx-closing-bracket-location': [1, {selfClosing: 'after-props', nonEmpty: 'after-props'}],

    'react/jsx-indent-props': ['error', 'first'],

    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }],
    'array-callback-return': ['error', { allowImplicit: true }],
  },
};
/*
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
*/
