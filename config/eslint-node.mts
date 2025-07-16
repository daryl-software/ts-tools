import eslint from '@eslint/js';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import eslintUnused from 'eslint-plugin-unused-imports';
import eslintNode from 'eslint-plugin-n';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error - no types
import pluginPromise from 'eslint-plugin-promise';
import eslintPluginYml from 'eslint-plugin-yml';
import json from '@eslint/json';
import { type ConfigArray } from 'typescript-eslint';
import vitestConfig from "./eslint-rules/vitest.ts";

type NonTypedPlugin = { configs: Record<string, ConfigArray[number]> };

export function getEslintConfig(tsConfigJSONFile: string, extra?: ConfigArray): ConfigArray {
    return tseslint.config([
        eslint.configs.recommended,
        ...eslintPluginYml.configs['flat/recommended'],
        eslintNode.configs['flat/mixed-esm-and-cjs'],
        {
            files: ['**/*.json'],
            ignores: ['package-lock.json'],
            language: 'json/json',
            ...json.configs.recommended,
            rules: {
                'no-irregular-whitespace': 'off',
            },
        },
        (pluginPromise as NonTypedPlugin).configs['flat/recommended'],
        {
            ignores: ['**/.nvm/**/*', '**/.pm2/**/*', '**/.pnpm-store/**/*', '**/pnpm-lock.yaml', '**/coverage/**/*', '**/ecosystem.config.js', 'i18next-scanner.config.js'],
        },
        {
            plugins: {
                import: importPlugin,
                'unused-imports': eslintUnused,
            },
        },
        {
            rules: {
                'promise/always-return': 'off',
                'promise/no-nesting': 'off',
                'promise/no-callback-in-promise': 'off',
                'promise/no-multiple-resolved': 'error',
                complexity: ['error', 25],
                'no-dupe-class-members': 'off',
                'no-empty-pattern': 'off',
                'array-callback-return': 'error',
                'arrow-body-style': ['error', 'as-needed'],
                'block-scoped-var': 'error',
                'eol-last': 'error',
                'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
                'no-await-in-loop': 'warn',
                'no-console': 'warn',
                'no-constructor-return': 'error',
                'no-debugger': 'error',
                'no-extra-boolean-cast': 'error',
                'no-implicit-coercion': 'error',
                'no-loop-func': 'error',
                'no-promise-executor-return': 'error',
                'no-restricted-properties': ['error'],
                'no-sequences': 'error',
                'no-template-curly-in-string': 'error',
                'no-throw-literal': 'error',
                'no-trailing-spaces': 'error',
                'no-unmodified-loop-condition': 'error',
                'no-unreachable-loop': 'error',
                'no-unused-expressions': ['error'],
                'no-unused-vars': 'error',
                'no-useless-concat': 'error',
                'no-useless-return': 'error',
                'no-var': 'error',
                'object-shorthand': 'error',
                'prefer-arrow-callback': 'error',
                'prefer-const': 'error',
                'prefer-destructuring': 'warn',
                'prefer-numeric-literals': 'error',
                'prefer-regex-literals': 'error',
                'prefer-template': 'error',
                'require-atomic-updates': 'warn',
                'require-await': 'warn',
                'unused-imports/no-unused-imports': 'error',
                curly: ['error', 'all'],
                eqeqeq: 'error',
            },
        },
        {
            files: ['**/*.cjs', '**/*.js'],
            rules: {
                'no-undef': 'off',
            },
        },
        {
            files: ['**/*.ts', '**/*.mts'],
            extends: [...tseslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.strictTypeChecked],
            plugins: {
                '@typescript-eslint': tseslint.plugin,
            },
            languageOptions: {
                parser: tseslint.parser,
                parserOptions: {
                    project: tsConfigJSONFile,
                },
            },
            rules: {
                // previous
                '@typescript-eslint/array-type': 'error',
                '@typescript-eslint/consistent-indexed-object-style': 'error',
                // '@typescript-eslint/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true, exceptAfterOverload: true }],
                '@typescript-eslint/member-ordering': ['error', { default: ['signature', 'field', 'public-static-field', 'static-field', 'constructor', 'method'] }],
                '@typescript-eslint/no-confusing-non-null-assertion': 'error',
                '@typescript-eslint/no-confusing-void-expression': 'error',
                '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }],
                '@typescript-eslint/no-shadow': 'error',
                // '@typescript-eslint/no-throw-literal': 'error',
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
                '@typescript-eslint/no-unnecessary-qualifier': 'error',
                '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
                '@typescript-eslint/no-unsafe-argument': 'warn',
                '@typescript-eslint/no-unsafe-assignment': 'warn',
                '@typescript-eslint/no-unsafe-call': 'warn',
                '@typescript-eslint/no-unsafe-member-access': 'warn',
                '@typescript-eslint/no-unsafe-return': 'warn',
                '@typescript-eslint/no-unused-vars': 'error',
                '@typescript-eslint/prefer-includes': 'error',
                '@typescript-eslint/prefer-string-starts-ends-with': 'error',
                '@typescript-eslint/return-await': 'error',
                '@typescript-eslint/switch-exhaustiveness-check': [
                    'error',
                    {
                        considerDefaultExhaustiveForUnions: true,
                    },
                ],
                '@typescript-eslint/no-deprecated': 'warn',
                'no-constant-binary-expression': 'error',
                '@typescript-eslint/promise-function-async': 'error',
                // 'node/no-extraneous-import': ['error'],
                // OFF
                '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
                '@typescript-eslint/camelcase': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-namespace': 'off',
                'lines-between-class-members': 'off',
                '@typescript-eslint/require-await': 'off',
                '@typescript-eslint/restrict-template-expressions': 'off',
                '@typescript-eslint/no-dynamic-delete': 'off',
                'node/no-empty-function': 'off',
                'node/no-missing-import': 'off',
                'node/no-missing-require': 'off',
                'node/no-unsupported-features/es-syntax': 'off',
                'node/shebang': 'off',
                'no-restricted-syntax': [
                    'warn',
                    {
                        selector: 'TSEnumDeclaration',
                        message: 'Use const instead of enums. (https://www.totaltypescript.com/why-i-dont-like-typescript-enums)',
                    },
                    {
                        selector: 'CallExpression[callee.property.name="warn"][arguments.0.type="TemplateLiteral"]',
                        message: 'Calling logger.warn with template literals is not allowed use 2nd parameter for better logs aggregation.',
                    },
                    {
                        selector: 'CallExpression[callee.property.name="error"][arguments.0.type="TemplateLiteral"]',
                        message: 'Calling logger.error with template literals is not allowed use 2nd parameter for better logs aggregation.',
                    },
                    {
                        selector: 'CallExpression[callee.property.name="info"][arguments.0.type="TemplateLiteral"]',
                        message: 'Calling logger.info with template literals is not allowed use 2nd parameter for better logs aggregation.',
                    },
                    {
                        selector: 'CallExpression[callee.property.name="debug"][arguments.0.type="TemplateLiteral"]',
                        message: 'Calling logger.debug with template literals is not allowed use 2nd parameter for better logs aggregation.',
                    },
                ],
                // BUG ?
                '@typescript-eslint/no-unnecessary-condition': 'off',
                '@typescript-eslint/prefer-literal-enum-member': 'warn',
                '@typescript-eslint/prefer-promise-reject-errors': 'warn',
                '@typescript-eslint/no-extraneous-class': 'warn',
            },
        },
        ...vitestConfig,
        {
            // IN TESTS FILES
            files: ['tests/**/*.ts', 'tools/**/*.ts', '**/*.spec.ts', '**/spec.ts'],
            rules: {
                'no-console': 'off',
                'n/no-process-exit': 'off',
                '@typescript-eslint/no-unused-expressions': 'off',
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/no-empty-function': 'off',
                '@typescript-eslint/unbound-method': 'warn',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-enum-comparison': 'off',
                '@typescript-eslint/no-unsafe-assignment': 'off',
                '@typescript-eslint/no-misused-promises': 'warn',
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                complexity: 'warn',
            },
        },
        eslintPrettier,
        {
            rules: {
                quotes: ['error', 'single', { avoidEscape: true }],
            },
        },
      ...(extra ?? [])
    ] as ConfigArray);
}
