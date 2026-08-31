/**
 * Heading Extraction & Parsing Utilities
 *
 * Extracts H2 headings from Sanity Portable Text content blocks to construct
 * live section navigation for the architectural reading rail.
 */

export interface ExtractedHeading {
  id: string;
  number?: string | undefined;
  title: string;
  rawText: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseHeadingText(text: string): { number?: string | undefined; title: string } {
  const match = text.match(/^(\d{2})\s*\/\/\s*(.+)$/);
  if (match && match[1] && match[2]) {
    return { number: match[1], title: match[2].trim() };
  }
  return { title: text.trim() };
}

export function extractHeadingsFromContent(
  content?: Array<Record<string, unknown>>,
): ExtractedHeading[] {
  if (!content || !Array.isArray(content)) return [];

  const headings: ExtractedHeading[] = [];

  content.forEach((block) => {
    if (block._type === "block" && block.style === "h2") {
      const children = block.children as Array<{ text?: string }> | undefined;
      const rawText = children?.map((c) => c.text || "").join("") || "";
      if (rawText.trim()) {
        const { number, title } = parseHeadingText(rawText);
        headings.push({
          id: slugifyHeading(rawText),
          ...(number ? { number } : {}),
          title,
          rawText,
        });
      }
    }
  });

  return headings;
}
