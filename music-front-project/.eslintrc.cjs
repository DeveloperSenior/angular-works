/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    esversion: 6,
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    }
}