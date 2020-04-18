module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'react-app',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'react-hooks'],
    rules: {
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
    },
    settings: {
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
};
