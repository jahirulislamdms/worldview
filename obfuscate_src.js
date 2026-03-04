import fs from 'fs';
import path from 'path';
import JavaScriptObfuscator from 'javascript-obfuscator';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const obfuscatorOptions = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 3,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 15,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 15,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: false, // Disabled to prevent breaking JS object accesses and API structures
    unicodeEscapeSequence: true
};

walkDir('./src', (filePath) => {
    if (filePath.endsWith('.js')) {
        try {
            const code = fs.readFileSync(filePath, 'utf8');
            const obfuscationResult = JavaScriptObfuscator.obfuscate(code, obfuscatorOptions);
            fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
            console.log('Obfuscated: ' + filePath);
        } catch (e) {
            console.error('Failed to obfuscate: ' + filePath, e);
        }
    }
});
