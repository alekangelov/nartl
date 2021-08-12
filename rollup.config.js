import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import scss from "rollup-plugin-scss";
import fs from "fs";

// Array of extensions to be handled by babel
const EXTENSIONS = [".ts", ".tsx"];

// Excluded dependencies - dev dependencies
const EXTERNAL = [...Object.keys(pkg.devDependencies)];

const dirs = fs.readdirSync("./src/");

export default {
  input: ["src/index.ts"], // What files we build?
  output: {
    dir: "dist", // Directory where rollup.js will put the built files
    sourcemap: true, // We want a source map to trace the original code
    format: "esm", // Built files will follow ES Module format
    preserveModules: true, // This one is important for treeshaking features of our library
    preserveModulesRoot: "src",
  },
  plugins: [
    peerDepsExternal(), // https://rollupjs.org/guide/en/#peer-dependencies
    resolve({
      extensions: EXTENSIONS,
    }), // Resolves node modules
    babel({
      extensions: EXTENSIONS, // Compile our TypeScript files
      babelHelpers: "inline", // Place babel helper functions in the same file they were used
      include: EXTENSIONS.map((ext) => `src/**/*${ext}`),
    }),
    scss({
      output: "dist/index.css",
    }),
  ],
  external: EXTERNAL, // https://rollupjs.org/guide/en/#peer-dependencies
};
