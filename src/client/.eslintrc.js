module.exports = {
    extends: [
        // By extending from a plugin config, we can get recommended rules without having to add them manually.
        "eslint:recommended",
        "react-app"
    ],
    settings: {
        react: {
            version: "detect",
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
        indent: ["error", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"]
    },
};
