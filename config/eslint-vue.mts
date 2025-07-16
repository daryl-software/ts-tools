import eslint from '@eslint/js';
import unusedImports from 'eslint-plugin-unused-imports';
import pluginVitest from '@vitest/eslint-plugin';
import pluginPlaywright from 'eslint-plugin-playwright';
import oxlint from 'eslint-plugin-oxlint';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
// @ts-expect-error - no types
import pluginPromise from 'eslint-plugin-promise';
import tseslint, { type ConfigArray } from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import vueConfig from "./eslint-rules/vue.ts";

type NonTypedPlugin = { configs: Record<string, ConfigArray[number]> };

export function getEslintConfig(tsConfigJSONFile: string, extra?: ConfigArray, withOxlint: boolean = false): ConfigArray {
    return tseslint.config([
        eslint.configs.recommended,
        (pluginPromise as NonTypedPlugin).configs['flat/recommended'],
        {
            plugins: {
                import: importPlugin,
                'unused-imports': unusedImports,
            },
            rules: {
                'promise/always-return': 'off',
                'promise/no-nesting': 'off',
                'promise/no-callback-in-promise': 'off',
                'promise/no-multiple-resolved': 'error',
                'array-callback-return': 'error',
                'arrow-body-style': ['error', 'as-needed'],
                'block-scoped-var': 'error',
                'eol-last': 'error',
                'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
                'no-await-in-loop': 'warn',
                'no-console': 'warn',
                'no-constructor-return': 'error',
                'no-debugger': 'error',
                'no-dupe-class-members': 'off',
                'no-empty-pattern': 'off',
                'no-extra-boolean-cast': 'error',
                'no-loop-func': 'error',
                'no-promise-executor-return': 'error',
                'no-restricted-properties': ['error'],
                'no-sequences': 'error',
                'no-template-curly-in-string': 'error',
                'no-throw-literal': 'off',
                'no-trailing-spaces': 'error',
                'no-unmodified-loop-condition': 'error',
                'no-unreachable-loop': 'error',
                'no-unused-vars': 'error',
                'no-unused-expressions': ['error'],
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
                complexity: 'error',
                curly: ['error', 'all'],
                eqeqeq: 'error',
                quotes: ['error', 'single', { avoidEscape: true }],
            },
        },
        {
            files: ['**/*.ts', '**/*.mts'],
            extends: [...tseslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.strictTypeChecked],
            languageOptions: {
                parser: tseslint.parser,
                parserOptions: {
                    project: tsConfigJSONFile,
                },
            },
            rules: {
                '@typescript-eslint/array-type': 'error',
                '@typescript-eslint/ban-types': 'off',
                '@typescript-eslint/camelcase': 'off',
                '@typescript-eslint/promise-function-async': 'error',
                '@typescript-eslint/consistent-indexed-object-style': 'error',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/member-ordering': ['error', { default: ['signature', 'field', 'public-static-field', 'static-field', 'constructor', 'method'] }],
                '@typescript-eslint/no-confusing-non-null-assertion': 'error',
                '@typescript-eslint/no-confusing-void-expression': 'error',
                '@typescript-eslint/no-floating-promises': ['warn', { ignoreIIFE: true }],
                '@typescript-eslint/no-namespace': 'off',
                '@typescript-eslint/no-shadow': 'error',
                '@typescript-eslint/only-throw-error': 'error',
                '@typescript-eslint/require-await': 'off',
                '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
                '@typescript-eslint/no-unnecessary-condition': 'error',
                '@typescript-eslint/no-unnecessary-qualifier': 'error',
                '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
                '@typescript-eslint/no-unsafe-argument': 'warn',
                '@typescript-eslint/no-unsafe-assignment': 'warn',
                '@typescript-eslint/no-unsafe-call': 'warn',
                '@typescript-eslint/no-unsafe-member-access': 'warn',
                '@typescript-eslint/no-unsafe-return': 'warn',
                '@typescript-eslint/no-unused-vars': 'error',
                '@typescript-eslint/no-use-before-define': 'off',
                '@typescript-eslint/prefer-includes': 'error',
                '@typescript-eslint/prefer-string-starts-ends-with': 'error',
                '@typescript-eslint/restrict-template-expressions': 'off',
                '@typescript-eslint/return-await': 'error',
                '@typescript-eslint/switch-exhaustiveness-check': 'error',
                'lines-between-class-members': 'off',
                '@typescript-eslint/no-deprecated': 'warn',
            },
        },
        ...vueConfig,
        {
            plugins: {
                vitest: {
                    ...pluginVitest.configs.recommended,
                    files: ['src/**/__tests__/*'],
                },
            },
        },
        {
            ...pluginPlaywright.configs['flat/recommended'],
            files: ['e2e/**/*.{test,spec}.{eslint,ts,jsx,tsx}'],
        },
        skipFormatting,
        eslintPrettier,
        withOxlint
            ? {
                ...oxlint.buildFromOxlintConfig({
                    categories: {
                        correctness: 'error',
                        perf: 'warn',
                        restriction: 'warn',
                        suspicious: 'warn',
                    },
                }),
            }
            : {},
        ...(extra ?? [])
    ] as ConfigArray);
}
