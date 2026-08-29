/**
 * Sanity Schema Registry
 *
 * Central registry for all Sanity schema types.
 * Individual schemas will be added during migration phases.
 *
 * Phase 1 (Foundation): Empty registry - Studio setup only
 * Phase 2 (Week 1, Day 3-5): Project schemas ✅
 * Phase 3 (Week 2, Day 1-3): Journal schemas
 * Phase 4 (Week 2, Day 4-5): Service schemas
 * Phase 5 (Week 3, Day 1-2): Careers & Singletons
 *
 * @see SANITY-MIGRATION-READINESS-REPORT.md
 */

import { SchemaTypeDefinition } from "sanity";

// Import schemas
import journalSchema from "./journal";
import projectSchema from "./project";

/**
 * Schema types array
 *
 * This will be populated with schema definitions as migration progresses:
 * - projectSchema (Week 1, Day 3) ✅
 * - journalArticleSchema (Week 2, Day 1) ✅
 * - serviceSchema (Week 2, Day 4)
 * - teamMemberSchema (Week 3, Day 1)
 * - studioSchema (Week 3, Day 1)
 * - careersSchema (Week 3, Day 2)
 * - contactSchema (Week 3, Day 2)
 * - siteSettingsSchema (Week 3, Day 2)
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  projectSchema,
  journalSchema,
  // More schemas will be added here during migration
];

/**
 * Export individual schemas for direct import
 */
export { projectSchema, journalSchema };

/**
 * Helper: Get schema by name
 */
export function getSchemaByName(name: string): SchemaTypeDefinition | undefined {
  return schemaTypes.find((schema) => schema.name === name);
}

/**
 * Helper: Get all schema names
 */
export function getSchemaNames(): string[] {
  return schemaTypes.map((schema) => schema.name);
}
