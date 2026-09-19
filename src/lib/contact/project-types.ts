/**
 * Dynamic Project Types Utility
 *
 * Converts active project categories from the Sanity CMS into an architecturally
 * prioritized, title-cased list of inquiry disciplines for the Contact form.
 */

const CANONICAL_LABELS: Record<string, string> = {
  architecture: "Architecture",
  interior: "Interior Design",
  landscape: "Landscape Architecture",
  "urban-design": "Urban Design",
  "master-planning": "Master Planning",
  renovation: "Renovation",
  "adaptive-reuse": "Adaptive Reuse",
  research: "Research & Feasibility",
  visualization: "3D Visualization",
};

const DISCIPLINE_PRIORITY: Record<string, number> = {
  Architecture: 10,
  "Interior Design": 20,
  "Landscape Architecture": 30,
  "Urban Design": 40,
  "Master Planning": 50,
  Renovation: 60,
  "Adaptive Reuse": 70,
  "Research & Feasibility": 80,
  "3D Visualization": 90,
};

const DEFAULT_PROJECT_TYPES: string[] = [
  "Architecture",
  "Interior Design",
  "Landscape Architecture",
  "Urban Design",
  "Renovation",
  "Other",
];

/**
 * Format a kebab-case category slug into a clean architectural title label.
 */
export function formatCategoryToProjectType(categorySlug: string): string {
  const normalized = categorySlug.trim().toLowerCase();
  if (CANONICAL_LABELS[normalized]) {
    return CANONICAL_LABELS[normalized];
  }

  // Capitalize words separated by hyphens or spaces
  return normalized
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Derive an architecturally sorted list of project inquiry types from active project categories.
 *
 * Sorting Order:
 * 1. Primary core architectural disciplines (Architecture, Interior, Landscape, Urban Design, etc.)
 * 2. Custom dynamic categories added by editors in Sanity (sorted alphabetically)
 * 3. "Other" anchored as the permanent final choice
 */
export function buildDynamicProjectTypes(activeCategories: string[]): string[] {
  if (!activeCategories || activeCategories.length === 0) {
    return DEFAULT_PROJECT_TYPES;
  }

  const uniqueLabels = new Set<string>();
  activeCategories.forEach((slug) => {
    if (slug) {
      uniqueLabels.add(formatCategoryToProjectType(slug));
    }
  });

  // Ensure "Other" is handled separately so it never duplicates and always lands last
  uniqueLabels.delete("Other");

  const sorted = Array.from(uniqueLabels).sort((a, b) => {
    const priorityA = DISCIPLINE_PRIORITY[a] ?? 999;
    const priorityB = DISCIPLINE_PRIORITY[b] ?? 999;

    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }

    return a.localeCompare(b);
  });

  sorted.push("Other");

  return sorted;
}
