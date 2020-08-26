import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import html from '@rollup/plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import postcss from 'rollup-plugin-postcss';
import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import typescriptCompiler from 'typescript';
import copy from "rollup-plugin-copy";

const htmlTemplateString = fs.readFileSync("./src/index.html");

const plugins = [
    html({
        template: () => htmlTemplateString,
        dest: "build",
        filename: "index.html"
    }),
    copy({
        targets: [
            { src: 'src/reset.css', dest: 'build' },
            //{ src: 'src/report.json', dest: 'build' },
        ]
    }),
    svelte({
        dev: process.env.NODE_ENV === "development",
        extensions: [".svelte"],
        preprocess: autoPreprocess(),
        emitCss: true,
    }),

    postcss({
        extract: true
    }),
    json(),
    resolve(),
    typescript({ typescript: typescriptCompiler }),
    commonjs({})

];


module.exports = [

    // Core
    {
        input: "src/index.ts",
        output: {
            file: "build/core.js",
            sourcemap: true,
            format: "es"
        },

        cache: false,
        plugins,
        watch: {
            chokidar: {
                usePolling: false
            }
        }
    },


]