module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
    overrides: [
        {
            files: '*.graphql',
            options: {
                printWidth: 80,
            },
        },
    ],
};
