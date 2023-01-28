module.exports = {
	extends: [
		// By extending from a plugin config, we can get recommended rules without having to add them manually.
		'eslint:recommended',
		'react-app',
		'plugin:react-hooks/recommended',
		// "plugin:react/recommended"
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
		// indent: ['error', 4],
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-multiple-empty-lines': ['error', {'max': 2, 'maxEOF': 0}],
		'no-trailing-spaces': 'error',
		'eol-last': ['error', 'always'],
		'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		// 'no-extra-boolean-cast': ['error', {'enforceForLogicalOperands': true}]
		'no-extra-boolean-cast': 'warn'
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
