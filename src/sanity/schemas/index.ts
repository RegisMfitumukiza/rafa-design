/**
 * Sanity Schema Registry
 *
 * Central registry for all Sanity schema types.
 * Individual schemas are added during migration phases.
 *
 * Phase 1 (Foundation): Empty registry - Studio setup only
 * Phase 2 (Week 1, Day 3-5): Project schemas ✅
 * Phase 3 (Week 2, Day 1-3): Journal schemas ✅
 * Phase 4 (Week 2, Day 4-5): Service schemas ✅
 * Phase 5 (Week 3, Day 1-3): Studio, Team Member, Careers, Contact, Site Settings ✅
 *
 * @see docs/20-content-models.md for the shared content contract
 */

import { SchemaTypeDefinition } from "sanity";

// Import schemas
import careerSchema from "./career";
import careersSchema from "./careers";
import contactSchema from "./contact";
import journalSchema from "./journal";
import projectSchema from "./project";
import serviceSchema from "./service";
import siteSettingsSchema from "./siteSettings";
import studioSchema from "./studio";
import teamSchema from "./team";

/**
 * Schema types array
 *
 * All schema definitions registered for the Sanity Studio.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  projectSchema,
  journalSchema,
  serviceSchema,
  teamSchema,
  studioSchema,
  careerSchema,
  careersSchema,
  contactSchema,
  siteSettingsSchema,
];

/**
 * Export individual schemas for direct import
 */
export {
  projectSchema,
  journalSchema,
  serviceSchema,
  teamSchema,
  studioSchema,
  careerSchema,
  careersSchema,
  contactSchema,
  siteSettingsSchema,
};

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
