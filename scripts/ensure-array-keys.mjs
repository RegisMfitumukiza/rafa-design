/**
 * Ensure Array Keys (schema-aware, idempotent)
 *
 * Walks every document (published + drafts) against the bundled schema and
 * injects a unique `_key` into every object array item that is missing one
 * (objects, references, portable-text blocks/spans/markDefs). String/number
 * arrays are stored as plain values and are intentionally left untouched.
 *
 * Only arrays that actually change are patched back to the dataset.
 *
 * Usage: node scripts/ensure-array-keys.mjs
 */

import { execFileSync } from "child_process";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

import { client } from "./lib/sanity.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BUNDLE = path.join(
  process.env.TEMP || process.env.TMP || "/tmp",
  "opencode",
  "schemas-bundle.mjs",
);

if (!fs.existsSync(BUNDLE)) {
  execFileSync(process.execPath, [path.join(__dirname, "_build-schema-bundle.mjs"), BUNDLE], {
    stdio: "inherit",
  });
}

const { schemaTypes } = await import(pathToFileURL(BUNDLE).href);

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);

function pickItemDesc(of, item) {
  if (!Array.isArray(of) || !item) return undefined;
  const t = item._type;
  if (t) {
    const exact = of.find((d) => d.type === t || d.name === t);
    if (exact) return exact;
  }
  if (of.length === 1) return of[0];
  return undefined;
}

/**
 * Walk a value against its descriptor; collect array patches into `patches`
 * (path -> new array). Returns true when any key was added.
 */
function walk(value, desc, path, patches) {
  let changed = false;

  if (desc && desc.type === "array" && Array.isArray(value)) {
    const out = value.map((item, i) => {
      if (item && typeof item === "object") {
        const itemDesc = pickItemDesc(desc.of, item);
        const copy = { ...item };
        if (typeof copy._key !== "string") {
          copy._key = key();
          changed = true;
        }
        walk(copy, itemDesc, `${path}[${i}]`, patches);
        // block special-case: children spans + markDefs are implicit types
        if (itemDesc && itemDesc.type === "block" && Array.isArray(copy.children)) {
          const children = copy.children.map((s) => {
            if (s && typeof s === "object" && typeof s._key !== "string") {
              changed = true;
              return { ...s, _key: key() };
            }
            return s;
          });
          if (children !== copy.children) copy.children = children;
        }
        if (itemDesc && itemDesc.type === "block" && Array.isArray(copy.markDefs)) {
          const markDefs = copy.markDefs.map((m) => {
            if (m && typeof m === "object" && typeof m._key !== "string") {
              changed = true;
              return { ...m, _key: key() };
            }
            return m;
          });
          if (markDefs !== copy.markDefs) copy.markDefs = markDefs;
        }
        return copy;
      }
      return item;
    });
    if (changed) patches[path] = out;
    return changed;
  }

  if (!value || typeof value !== "object") return false;

  const fields = desc?.fields || [];
  for (const [k, v] of Object.entries(value)) {
    if (k.startsWith("_")) continue;
    const f = fields.find((ff) => ff.name === k);
    if (f) walk(v, f, `${path}.${k}`, patches);
    else if (f === undefined && desc && (desc.type === "image" || desc.type === "file")) {
      // custom image/file sub-fields are validated as leaves
    }
  }
  return changed;
}

const docTypes = schemaTypes.map((t) => t.name);
const allDocs = await client.fetch(`*[_type in $types]`, { types: docTypes });

let fixed = 0;
let already = 0;
for (const doc of allDocs) {
  const desc = schemaTypes.find((t) => t.name === doc._type);
  if (!desc) continue;
  const patches = {};
  walk(doc, desc, "", patches);
  if (Object.keys(patches).length === 0) {
    already++;
    continue;
  }
  const fieldsPatch = {};
  for (const [path, arr] of Object.entries(patches)) {
    const p = path.replace(/^\./, "");
    fieldsPatch[p] = arr;
  }
  await client.patch(doc._id).set(fieldsPatch).commit();
  console.log(`   🔧 ${doc._id} — ${Object.keys(fieldsPatch).join(", ")}`);
  fixed++;
}

console.log("═══════════════════════════════════════════════");
console.log(`✨ Complete! Documents updated: ${fixed}, already clean: ${already}`);
console.log("═══════════════════════════════════════════════");
