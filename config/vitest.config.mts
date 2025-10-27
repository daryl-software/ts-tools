import process from 'node:process';
import { deepmerge } from 'deepmerge-ts';
import { defineConfig as defineConfigOG, type ViteUserConfigExport } from 'vitest/config';

export function defineConfig(toMergeWith?: ViteUserConfigExport): ReturnType<typeof defineConfigOG> {
    const config: ViteUserConfigExport = {
        test: {
            logHeapUsage: true,
            pool: 'forks',
            maxWorkers: 5,
            isolate: false,
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
                skipFull: true,
                reporter: ['text', 'html', 'json-summary', ['cobertura', { file: './cobertura-coverage.xml' }]],
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
