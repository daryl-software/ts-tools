import type { ConfigArray } from 'typescript-eslint';
import eslintVitest from '@vitest/eslint-plugin';

const config: ConfigArray = [
    {
        plugins: {
            vitest: eslintVitest,
        },
        // IN TESTS FILES
        files: ['tests/**/*.ts', 'tools/**/*.ts', '**/*.spec.ts', '**/spec.ts'],
        rules: {
            'vitest/valid-expect': 'off',
            'vitest/expect-expect': [
                'error',
                {
                    assertFunctionNames: ['expect*'],
                },
            ],
        },
    },
];
export default config;
