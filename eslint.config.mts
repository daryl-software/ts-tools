import { usingSchema } from './codegen.ts';
import { getEslintConfig } from '@daryl-software/ts-tools/config/eslint-vue.mts';
import graphqlPlugin from '@graphql-eslint/eslint-plugin';

export default getEslintConfig(`${import.meta.dirname}/tsconfig.json`, [
    {
        languageOptions: {
            globals: {
                NodeJS: true,
                VITEST: 'readonly',
            },
        },
        rules: {
            complexity: ['error', 25],
            'one-var': 'error',
            'no-console': 'error',
            'import/group-exports': 'warn',
            'vue/html-button-has-type': 'off',
            'vue/no-template-target-blank': 'off',
            'vue/require-default-prop': 'off',
            'tailwindcss/no-custom-classname': 'off',
            'vue/no-undef-components': 'off',
        },
    },
    { ignores: ['src/generated/apollo-helpers.ts', 'vue-tools/**/*', 'dist/**/*', 'node_modules/**/*'] },
    {
        files: usingSchema.documents as string[],
        languageOptions: {
            parser: graphqlPlugin.parser,
            parserOptions: {
                graphQLConfig: {
                    schema: usingSchema.schema,
                    documents: usingSchema.documents,
                },
            },
        },
        plugins: {
            '@graphql-eslint': graphqlPlugin,
        },
        rules: {
            ...graphqlPlugin.configs['flat/operations-recommended'].rules,
            '@graphql-eslint/require-selections': 'off',
            '@graphql-eslint/naming-convention': 'off',
            '@graphql-eslint/selection-set-depth': ['error', { maxDepth: 9 }],
            '@graphql-eslint/known-directives': 'off', // enable when @defer is supported
        },
    },
    // fails with multiple projects
    // {
    //     files: gqlConfig.projects.gitlab.documents,
    //     languageOptions: {
    //         parser: graphqlPlugin.parser,
    //         parserOptions: {
    //             graphQLConfig: {
    //                 schema: gqlConfig.projects.gitlab.schema,
    //                 documents: gqlConfig.projects.gitlab.documents,
    //             },
    //         },
    //     },
    //     plugins: {
    //         '@graphql-eslint': graphqlPlugin,
    //     },
    //     rules: {
    //         ...graphqlPlugin.configs['flat/operations-recommended'].rules,
    //         '@graphql-eslint/naming-convention': 'off',
    //         '@graphql-eslint/selection-set-depth': ['error', { maxDepth: 9 }],
    //     },
    // },
    {
        files: ['tools/*'],
        rules: {
            'no-console': 'off',
        },
    },
    {
        files: ['src/generated/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off', // todo use @daryl-software/ts-tools/tools/remove-unused-vars.ts to fix
            '@typescript-eslint/no-empty-object-type': 'off',
            'one-var': 'off',
            'import/group-exports': 'off',
        },
    },
]);
