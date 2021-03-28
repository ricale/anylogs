module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'eslint-config-prettier'
    ],
    rules: {
        'prettier/prettier': 0,
        'comma-dangle': ['error', 'always-multiline'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    },
};