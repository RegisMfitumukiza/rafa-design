/**
 * Journal Article Schema — Editorial Document System
 *
 * Industrial UI/UX Principles:
 * - Logical grouping by function
 * - Clear field hierarchy
 * - Minimal but powerful
 * - Editorial workflow optimized
 * - Production-grade validation
 *
 * @see src/content/journal/types.ts for TypeScript interfaces
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "journalArticle",
  title: "Journal Article",
  type: "document",
  groups: [
    {
      name: "content",
      title: "01 // Content",
      default: true,
    },
    {
      name: "metadata",
      title: "02 // Metadata",
    },
    {
      name: "media",
      title: "03 // Media",
    },
    {
      name: "references",
      title: "04 // References",
    },
    {
      name: "seo",
      title: "05 // SEO",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // CONTENT
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(120),
      description: "Article headline (120 characters max)",
    }),

    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "Auto-generated from title",
    }),

    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.max(200),
      description: "Optional secondary headline (200 characters max)",
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      group: "content",
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(300),
      description: "Brief summary for cards and SEO (50-300 characters)",
    }),

    defineField({
      name: "content",
      title: "Article Body",
      type: "array",
      group: "content",
      of: [
        // Paragraph
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        },

        // Image
        {
          type: "image",
          title: "Image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Required for accessibility",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional image caption",
            },
            {
              name: "credit",
              type: "string",
              title: "Credit",
              description: "Photographer or source credit",
            },
            {
              name: "layout",
              type: "string",
              title: "Layout",
              options: {
                list: [
                  { title: "Contained (default)", value: "contained" },
                  { title: "Wide", value: "wide" },
                  { title: "Full Bleed", value: "full" },
                ],
                layout: "radio",
              },
              initialValue: "contained",
            },
          ],
        },

        // Gallery
        {
          type: "object",
          name: "gallery",
          title: "Gallery",
          fields: [
            {
              name: "images",
              type: "array",
              title: "Images",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    {
                      name: "alt",
                      type: "string",
                      title: "Alt Text",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "caption",
                      type: "string",
                      title: "Caption",
                    },
                  ],
                },
              ],
              validation: (Rule) => Rule.required().min(2),
            },
            {
              name: "columns",
              type: "number",
              title: "Columns",
              options: {
                list: [2, 3, 4],
              },
              initialValue: 3,
            },
          ],
          preview: {
            select: {
              images: "images",
              columns: "columns",
            },
            prepare({ images, columns }) {
              return {
                title: `Gallery (${images?.length || 0} images)`,
                subtitle: `${columns} columns`,
              };
            },
          },
        },

        // Pull Quote
        {
          type: "object",
          name: "pullQuote",
          title: "Pull Quote",
          fields: [
            {
              name: "content",
              type: "text",
              title: "Quote",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "author",
              type: "string",
              title: "Attribution",
              description: "Optional author or source",
            },
          ],
          preview: {
            select: {
              content: "content",
              author: "author",
            },
            prepare({ content, author }) {
              return {
                title: content,
                subtitle: author ? `— ${author}` : "Pull Quote",
              };
            },
          },
        },

        // Video
        {
          type: "object",
          name: "video",
          title: "Video",
          fields: [
            {
              name: "videoFile",
              type: "file",
              title: "Upload Video File",
              description:
                "Upload .mp4 / .webm file directly to Sanity CDN (recommended for loops and short architectural documentaries)",
              options: { accept: "video/*" },
            },
            {
              name: "url",
              type: "url",
              title: "Video URL",
              description: "Alternative: YouTube, Vimeo, or direct video URL",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "credit",
              type: "string",
              title: "Credit",
            },
          ],
          validation: (Rule) =>
            Rule.custom((fields?: { videoFile?: unknown; url?: string }) => {
              if (!fields?.videoFile && !fields?.url) {
                return "Either upload a video file or provide a video URL.";
              }
              return true;
            }),
          preview: {
            select: {
              url: "url",
              hasFile: "videoFile.asset._ref",
            },
            prepare({ url, hasFile }) {
              return {
                title: "Video",
                subtitle: hasFile ? "Uploaded Video File" : url || "No video specified",
              };
            },
          },
        },

        // Project Reference
        {
          type: "reference",
          name: "projectReference",
          title: "Project Reference",
          to: [{ type: "project" }],
          description: "Link to a project in your portfolio",
        },

        // Divider
        {
          type: "object",
          name: "divider",
          title: "Divider",
          fields: [
            {
              name: "style",
              type: "string",
              title: "Style",
              options: {
                list: [
                  { title: "Line", value: "line" },
                  { title: "Space", value: "space" },
                  { title: "Ruled", value: "ruled" },
                ],
                layout: "radio",
              },
              initialValue: "space",
            },
          ],
          preview: {
            select: {
              style: "style",
            },
            prepare({ style }) {
              return {
                title: "Divider",
                subtitle: style,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: "Article content with rich media support",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // METADATA
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "type",
      title: "Article Type",
      type: "string",
      group: "metadata",
      options: {
        list: [
          { title: "Essay (Long-form Monograph)", value: "essay" },
          { title: "Project Story (Case Study)", value: "project-story" },
          { title: "Material Study (Tectonics & Craft)", value: "material-study" },
          { title: "Interview / Dialogue", value: "interview" },
          { title: "Field Notes (Site Research)", value: "field-notes" },
          { title: "Exhibition / Event", value: "event" },
          { title: "Award / Recognition", value: "award" },
          { title: "News & Studio", value: "news" },
          { title: "General Article", value: "general" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "essay",
      description: "Determines editorial layout structure and presentation",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "metadata",
      options: {
        list: [
          { title: "Architecture", value: "architecture" },
          { title: "Interior Design", value: "interior" },
          { title: "Landscape", value: "landscape" },
          { title: "Urbanism & Planning", value: "urbanism" },
          { title: "Sustainability & Ecology", value: "sustainability" },
          { title: "Materiality & Craft", value: "materiality" },
          { title: "Research & Theory", value: "research" },
          { title: "Ideas & Essays", value: "ideas" },
          { title: "Events & Exhibitions", value: "events" },
          { title: "Awards & Honors", value: "awards" },
          { title: "Publications", value: "publications" },
          { title: "Studio & News", value: "news" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "ideas",
      description:
        "Topic for filtering on /journal index. Automatically creates filter tabs on the website.",
    }),

    defineField({
      name: "featured",
      title: "Featured Article",
      type: "boolean",
      group: "metadata",
      initialValue: false,
      description: "Display prominently as hero at the top of the Journal index and homepage",
    }),

    defineField({
      name: "publishedAt",
      title: "Publication Date",
      type: "datetime",
      group: "metadata",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      description: "When the article was published",
    }),

    defineField({
      name: "updatedAt",
      title: "Last Updated",
      type: "datetime",
      group: "metadata",
      description: "Optional last update timestamp",
    }),

    defineField({
      name: "author",
      title: "Author",
      type: "object",
      group: "metadata",
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "role",
          type: "string",
          title: "Role",
          description: 'e.g., "Senior Architect", "Design Director"',
        },
        {
          name: "url",
          type: "url",
          title: "Profile URL",
          description: "Optional link to author profile or website",
        },
      ],
      description: "Article author information",
    }),

    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      group: "metadata",
      description: "Auto-calculated or manually set",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // MEDIA
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "hero",
      title: "Hero Image",
      type: "image",
      group: "media",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
        {
          name: "credit",
          type: "string",
          title: "Credit",
          description: "Photographer or source credit",
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Main cover image for the article",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // REFERENCES
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "relatedProjects",
      title: "Related Projects",
      type: "array",
      group: "references",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
      description: "Link to related projects in your portfolio",
    }),

    defineField({
      name: "relatedArticles",
      title: "Related Articles",
      type: "array",
      group: "references",
      of: [
        {
          type: "reference",
          to: [{ type: "journalArticle" }],
        },
      ],
      description: "Link to related journal articles",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 05 // SEO
    // ═══════════════════════════════════════════════════════════════════════

    defineField({
      name: "seo",
      title: "SEO Override",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Meta Title",
          description: "Override default title for SEO (leave empty to use article title)",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "description",
          type: "text",
          title: "Meta Description",
          description: "Override default excerpt for SEO (leave empty to use excerpt)",
          rows: 3,
          validation: (Rule) => Rule.max(300),
        },
        {
          name: "keywords",
          type: "array",
          title: "Keywords",
          of: [{ type: "string" }],
          options: {
            layout: "tags",
          },
          description: "SEO keywords (lowercase-with-hyphens format)",
        },
        {
          name: "ogImage",
          type: "image",
          title: "Social Share Image",
          description: "Override default hero image for social media (leave empty to use hero)",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
          ],
        },
      ],
      description: "Optional SEO overrides (defaults use article data)",
    }),
  ],

  // ═══════════════════════════════════════════════════════════════════════
  // PREVIEW CONFIGURATION
  // ═══════════════════════════════════════════════════════════════════════

  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      category: "category",
      publishedAt: "publishedAt",
      hero: "hero",
    },
    prepare({ title, subtitle, category, publishedAt, hero }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : "Draft";
      const meta = `${category || "Uncategorized"} · ${date}`;
      return {
        title: title || "Untitled Article",
        subtitle: subtitle ? `${subtitle} (${meta})` : meta,
        media: hero,
      };
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ORDERING
  // ═══════════════════════════════════════════════════════════════════════

  orderings: [
    {
      title: "Publication Date (Newest First)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Publication Date (Oldest First)",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
