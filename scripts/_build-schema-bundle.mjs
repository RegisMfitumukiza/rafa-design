import * as esbuild from "esbuild";
import path from "path";

const out = process.argv[2];
await esbuild.build({
  entryPoints: [path.resolve("src/sanity/schemas/index.ts")],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile: out,
  alias: {
    sanity: path.resolve("scripts/_shim-sanity.mjs"),
  },
  logLevel: "silent",
});
console.log("bundle written:", out);
