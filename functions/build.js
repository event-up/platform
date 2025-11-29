    // functions/build.js
const esbuild = require("esbuild");
const path = require("path");

esbuild.build({
  entryPoints: [path.resolve(__dirname, "src/index.ts")],
  bundle: true,                 // bundle all dependencies including monorepo packages
  platform: "node",             // target Node.js environment (Firebase)
  target: "node20",             // change if your Node version differs
  outfile: path.resolve(__dirname, "lib/index.js"), // output file for Firebase
  sourcemap: true,              // optional, helps with debugging
  external: ["firebase-admin", "firebase-functions"], // keep Firebase modules external
  tsconfig: path.resolve(__dirname, "tsconfig.json")
}).catch(() => process.exit(1));
