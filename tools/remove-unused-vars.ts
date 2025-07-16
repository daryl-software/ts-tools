import { Project } from 'ts-morph';
import { execSync } from 'child_process';
import assert from 'node:assert';

// eslint-disable-next-line prefer-destructuring
const targetFile = process.argv[2];
if (!targetFile) {
    console.error('Usage: node tools/remove-unused-vars.ts <filename>');
    process.exit(1);
}

function removeUnusedVars() {
    let eslintOutput = '';
    try {
        eslintOutput = execSync(`eslint ${targetFile}`, { encoding: 'utf8' });
        console.log(`ESLint output for ${targetFile}:\n${eslintOutput}`);
    } catch (err: unknown) {
        assert(err && typeof err === 'object' && 'stdout' in err && typeof err.stdout === 'string', 'Expected error to have stdout property');
        eslintOutput = err.stdout;
    }

    const unusedVars = Array.from(eslintOutput.matchAll(/error\s+'([^']+)' is (?:defined|assigned a value) but (never used|only used as a type)\s+@typescript-eslint\/no-unused-vars/g), (m) => m[1]),
        project = new Project(),
        file = project.addSourceFileAtPath(targetFile);

    unusedVars.forEach((varName) => {
        file.getVariableDeclarations().forEach((decl) => {
            if (decl.getName() === varName) decl.remove();
        });
        file.getTypeAliases().forEach((typeAlias) => {
            if (typeAlias.getName() === varName) typeAlias.remove();
        });
        file.getInterfaces().forEach((intf) => {
            if (intf.getName() === varName) intf.remove();
        });
        file.getFunctions().forEach((enumDecl) => {
            if (enumDecl.getName() === varName) enumDecl.remove();
        });
        file.getEnums().forEach((enumDecl) => {
            if (enumDecl.getName() === varName) enumDecl.remove();
        });
        file.getClasses().forEach((cls) => {
            if (cls.getName() === varName) cls.remove();
        });
    });

    file.saveSync();

    return unusedVars.length;
}

for (let i = 0; i < 4; i++) {
    const removedCount = removeUnusedVars();
    if (removedCount === 0) {
        console.log('No more unused variables found.');
        break;
    } else {
        console.log(`Removed ${removedCount} unused variables.`);
    }
}
