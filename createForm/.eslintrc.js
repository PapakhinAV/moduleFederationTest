module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        indent: 'off',
        'react/jsx-indent': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': ['error', 'never', { jsx: 'always' }],
    },
};
