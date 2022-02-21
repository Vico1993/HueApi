module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "jest", "babel"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "tsconfig.eslint.json",
    },
    ignorePatterns: ["**/build/*", "node_modules/*"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    overrides: [
        {
            files: ["tests/**/*.spec.ts"],
            rules: {
                // you should turn the original rule off *only* for test files
                "@typescript-eslint/unbound-method": "off",
                "jest/unbound-method": "error",
            },
        },
    ],
    rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "babel/valid-typeof": 1,
        "babel/no-invalid-this": 0,
        quotes: [2, "double", { avoidEscape: true }],
    },
};
