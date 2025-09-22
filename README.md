# @daryl-software/ts-tools
## Setup
```shell
pnpm install @daryl-software/ts-tools
```


## eslint 
in your `eslint.config.mts` file, add the following:
```typescript
import { getEslintConfig } from '@daryl-software/ts-tools/config/eslint-node.mts';

export default getEslintConfig(`${import.meta.dirname}/tsconfig.json`);
```

## typescript 
in your `tsconfig.json` file, add the following:
```json
{
  "extends": "@daryl-software/ts-tools/config/tsconfig-node.json",
}
```

## prettier
in your `package.json` file, add the following:
```json
{
  "prettier": "@daryl-software/ts-tools/config/prettier.config.mjs"
}
``` 

## vitest
🚨 Not yet supported in vitest you will get ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING
in your `vitest.config.mts` file, add the following:
```typescript
import { defineConfig } from '@daryl-software/ts-tools/config/vitest.config.mts';

export default defineConfig();
``` 



# To release a new version of the npm package
```shell
npx changeset
pnpm run local-release
```
