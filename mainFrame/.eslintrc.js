module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': ['error', 'never', { js: 'always' }],
    },
    overrides: [
        {
            files: [
                '**/*.spec.js',
                '**/*.spec.jsx',
            ],
            env: {
                jest: true,
            },
        },
    ],
    ignorePatterns: ['/dist', '/temp', '/out'],
};
