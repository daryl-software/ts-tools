import process from 'node:process';
import { deepmerge } from 'deepmerge-ts';
import { defineConfig as defineConfigOG , type UserConfigExport } from 'vitest/config';


export function defineConfig(toMergeWith?: UserConfigExport): ReturnType<typeof defineConfigOG> {
    const config: UserConfigExport = {
        test: {
            logHeapUsage: true,
            pool: 'forks',
            poolOptions: {
                forks: {
                    minForks: 1,
                    maxForks: 5,
                    isolate: false,
                },
            },
            maxConcurrency: 15,
            sequence: {
                shuffle: {
                    files: true,
                },
            },
            fileParallelism: true,
            environment: 'node',
            outputFile: {
                junit: './coverage/vitest-junit-report.xml',
                json: './coverage/vitest-json-report.json',
            },
            reporters: [
                [
                    'default',
                    {
                        summary: false,
                    },
                ],
                'junit',
                'json',
                // hanging-process
                // 'hanging-process',
            ],
            silent: false,
            testTimeout: process.features.inspector ? 60000 : 5000,
            hookTimeout: process.features.inspector ? 60000 : 3000,
            teardownTimeout: 5000,
            slowTestThreshold: 1000,
            coverage: {
                provider: 'v8',
                clean: false,
                all: true,
                skipFull: true,
                reporter: ['text', 'html', 'json-summary', ['cobertura', { file: './cobertura-coverage.xml' }]],
                thresholds: {
                    lines: 86,
                    functions: 81.9,
                    branches: 82,
                    statements: 86,
                },
                reportOnFailure: true,
            },
            chaiConfig: {
                truncateThreshold: 10000,
            },
            fakeTimers: {
                toFake: ['Date', 'setTimeout', 'clearTimeout'],
            },
        },
    };

    return defineConfigOG(deepmerge(config, toMergeWith));
}
