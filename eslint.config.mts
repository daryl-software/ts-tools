import { getEslintConfig } from './config/eslint-node.mts';
import type { ConfigArray } from 'typescript-eslint';

const config: ConfigArray = getEslintConfig(`${import.meta.dirname}/tsconfig.json`);

export default config;
