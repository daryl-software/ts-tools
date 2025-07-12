export default {
    singleQuote: true,
    trailingComma: 'es5',
    tabWidth: 4,
    bracketSpacing: true,
    printWidth: 200,
    arrowParens: 'always',
    overrides: [
        {
            files: ['*.json', '*.yml', '*.yaml'],
            options: {
                singleQuote: false,
                tabWidth: 2,
            },
        },
    ],
};
