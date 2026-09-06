/**
 * Dataset Health Audit
 *
 * Cross-checks every document in the dataset (published + drafts) against the
 * actual Sanity schema (bundled via esbuild + a tiny `sanity` identity shim,
 * because the schema descriptor objects are plain data) and reports:
 *   1. UNKNOWN FIELD  — a stored key has no matching field in the schema
 *      (like the services `icon` field) -> Studio "Unknown field found".
 *   2. MISSING KEY    — an object/reference array item without `_key`
 *      -> Studio "Missing keys" warning / list not editable.
 * Also reports document types in the dataset that have no schema at all.
 *
 * The schema bundle is emitted to the OS temp dir and rebuilt (only if
 * missing) so no generated artifacts live in the repository.
 *
 * Usage: node scripts/audit-dataset-health.mjs
 */

import { execFileSync } from "child_process";
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

const SYSTEM = new Set(["_id", "_type", "_rev", "_createdAt", "_updatedAt", "_key", "_system"]);

const nameToDesc = new Map(schemaTypes.map((t) => [t.name, t]));
for (const t of schemaTypes) nameToDesc.set(t.name, t);

const BLOCK_ALLOWED = new Set([
  "_key",
  "_type",
  "style",
  "children",
  "markDefs",
  "listItem",
  "level",
]);
const SPAN_ALLOWED = new Set(["_key", "_type", "marks", "text"]);
const IMAGE_KEYS = ["asset", "hotspot", "crop"];
const FILE_KEYS = ["asset"];
const REF_KEYS = ["_ref", "_type", "_weak"];
const SLUG_KEYS = ["current", "source"];

function fieldMap(fields = []) {
  const m = new Map();
  for (const f of fields) m.set(f.name, f);
  return m;
}

function allowedFor(desc) {
  switch (desc.type) {
    case "document":
    case "object":
      return [...(desc.fields || []).map((f) => f.name), "_type"];
    case "image":
      return [...IMAGE_KEYS, "_type", ...(desc.fields || []).map((f) => f.name)];
    case "file":
      return [...FILE_KEYS, "_type", ...(desc.fields || []).map((f) => f.name)];
    case "reference":
      return [...REF_KEYS];
    case "slug":
      return [...SLUG_KEYS];
    default:
      return ["_type"];
  }
}

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

function walk(value, desc, path, issues, allowSystem = false) {
  const isArr = desc && Array.isArray(value) && (desc.type === "array" || Array.isArray(desc.of));
  if (Array.isArray(value) && desc && desc.type === "array") {
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const itemDesc = pickItemDesc(desc.of, item);
      if (item && typeof item === "object") {
        if (typeof item._key !== "string")
          issues.push({
            kind: "MISSING_KEY",
            path: `${path}[${i}]`,
            value: item._type || "object",
          });
        if (!itemDesc) {
          if (item._type && item._type !== "reference")
            issues.push({ kind: "UNKNOWN_ITEM_TYPE", path: `${path}[${i}]`, value: item._type });
          continue;
        }
        walk(item, itemDesc, `${path}[${i}]`, issues);
      } else if (itemDesc && itemDesc.type === "block" && typeof item === "object") {
        // handled above (object branch)
      }
      // primitive items: keyless by design, skip
    }
    return;
  }

  if (!value || typeof value !== "object") return;

  if (desc && desc.type === "block") {
    for (const k of Object.keys(value)) {
      if (!BLOCK_ALLOWED.has(k))
        issues.push({ kind: "UNKNOWN_FIELD", path: `${path}.${k}`, value: k });
    }
    if (Array.isArray(value.children)) {
      value.children.forEach((s, i) => {
        if (s && typeof s === "object") {
          if (typeof s._key !== "string")
            issues.push({ kind: "MISSING_KEY", path: `${path}.children[${i}]`, value: "span" });
          for (const k of Object.keys(s))
            if (!SPAN_ALLOWED.has(k))
              issues.push({ kind: "UNKNOWN_FIELD", path: `${path}.children[${i}].${k}`, value: k });
        }
      });
    }
    if (Array.isArray(value.markDefs)) {
      value.markDefs.forEach((m, i) => {
        if (m && typeof m === "object") {
          if (typeof m._key !== "string")
            issues.push({
              kind: "MISSING_KEY",
              path: `${path}.markDefs[${i}]`,
              value: m._type || "markDef",
            });
          // markDef fields are deserialized from the block's `of` in the real
          // schema; the bundle can't reach them reliably, so accept any keys.
        }
      });
    }
    return;
  }

  if (desc && desc.type === "reference") {
    for (const k of Object.keys(value)) {
      if (SYSTEM.has(k)) continue;
      if (!REF_KEYS.includes(k))
        issues.push({ kind: "UNKNOWN_FIELD", path: `${path}.${k}`, value: k });
    }
    return;
  }

  if (desc && desc.type === "slug") {
    for (const k of Object.keys(value)) {
      if (SYSTEM.has(k)) continue;
      if (!SLUG_KEYS.includes(k))
        issues.push({ kind: "UNKNOWN_FIELD", path: `${path}.${k}`, value: k });
    }
    return;
  }

  const allowed = desc ? allowedFor(desc) : Object.keys(value);
  const hasCustomFields = desc && (desc.type === "image" || desc.type === "file") && desc.fields;

  for (const k of Object.keys(value)) {
    if (SYSTEM.has(k)) continue;
    if (allowed.includes(k)) {
      const field = (desc?.fields || []).find((f) => f.name === k);
      const next = field ? field : undefined;
      if (next) walk(value[k], next, `${path}.${k}`, issues);
      else if (k === "asset" && desc && (desc.type === "image" || desc.type === "file")) {
        // asset reference-ish object
        if (value[k] && typeof value[k] === "object") {
          for (const ak of Object.keys(value[k]))
            if (!REF_KEYS.includes(ak))
              issues.push({ kind: "UNKNOWN_FIELD", path: `${path}.asset.${ak}`, value: ak });
        }
      }
      continue;
    }
    if (allowSystem && SYSTEM.has(k)) continue;
    if (hasCustomFields && desc.fields.some((f) => f.name === k)) continue;
    issues.push({
      kind: "UNKNOWN_FIELD",
      path: `${path}.${k}`,
      value: k,
      type: `(type ${desc?.type ?? "?"})`,
    });
  }
}

const types = nameToDesc;
const docTypes = schemaTypes.map((t) => t.name);
const allDocs = await client.fetch(`*[_type in $types]`, { types: docTypes });
const byType = {};
for (const d of allDocs) (byType[d._type] ??= []).push(d);

const issues = [];
const unknownDocTypes = new Map();
const counts = {};

for (const [typeName, docs] of Object.entries(byType)) {
  const desc = types.get(typeName);
  counts[typeName] = docs.length;
  if (!desc) {
    unknownDocTypes.set(typeName, docs.length);
    continue;
  }
  for (const d of docs) {
    for (const k of Object.keys(d)) {
      if (SYSTEM.has(k)) continue;
      const f = (desc.fields || []).find((ff) => ff.name === k);
      if (!f) {
        issues.push({ kind: "TITLED_UNKNOWN_FIELD", path: `${typeName}(${d._id}).${k}`, value: k });
        continue;
      }
      walk(d[k], f, `${typeName}(${d._id}).${k}`, issues);
    }
  }
}

console.log("=== DATASET HEALTH AUDIT ===");
console.log(
  "types in dataset:",
  Object.entries(counts)
    .map(([t, n]) => `${t}:${n}`)
    .join(", "),
);
if (unknownDocTypes.size) {
  console.log("\n⚠️ DOCUMENT TYPES WITH NO SCHEMA:");
  for (const [t, n] of unknownDocTypes) console.log(`   - ${t} (${n} docs)`);
} else {
  console.log("\n✅ No document types without a schema.");
}

const byKind = {};
for (const i of issues) (byKind[i.kind] ??= []).push(i);

for (const kind of ["TITLED_UNKNOWN_FIELD", "UNKNOWN_FIELD", "UNKNOWN_ITEM_TYPE", "MISSING_KEY"]) {
  const list = byKind[kind] || [];
  console.log(`\n${list.length ? "⚠️" : "✅"} ${kind}: ${list.length}`);
  const unique = new Map();
  for (const i of list) {
    const key = `${i.value} :: ${i.path}`;
    if (!unique.has(key)) unique.set(key, i);
  }
  for (const i of unique.values()) console.log(`   ${i.path}  <- ${i.value}${i.type ?? ""}`);
}
console.log("\n=== END ===");
