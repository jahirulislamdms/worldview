import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';
import vitePluginJavascriptObfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
    plugins: [
        cesium(),
        vitePluginJavascriptObfuscator({
            include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue', 'src/**/*.svelte'],
            exclude: [/node_modules/],
            apply: 'build',
            debugger: false,
            options: {
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
                transformObjectKeys: true,
                unicodeEscapeSequence: true
            }
        })
    ],
    server: {
        port: 5173,
        strictPort: true,
        open: true
    },
    build: {
        minify: 'esbuild'
    }
});
