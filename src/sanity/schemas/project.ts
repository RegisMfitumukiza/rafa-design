/**
 * Project Schema
 *
 * Defines the structure for architecture projects in Sanity Studio.
 * Matches the existing TypeScript Project interface from src/content/projects.
 *
 * @see src/content/projects/index.ts for the original interface
 */

import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    {
      name: "identity",
      title: "01 // Identity & Classification",
      default: true,
    },
    {
      name: "location",
      title: "02 // Location & Specifications",
    },
    {
      name: "editorial",
      title: "03 // Editorial & Story",
    },
    {
      name: "media",
      title: "04 // Photography & Media",
    },
    {
      name: "technical",
      title: "05 // Chapters & Drawings",
    },
    {
      name: "materials",
      title: "06 // Materials & Services",
    },
    {
      name: "team",
      title: "07 // Team & Recognition",
    },
    {
      name: "seo",
      title: "08 // SEO",
    },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════════════════
    // 01 // IDENTITY & CLASSIFICATION
    // ═══════════════════════════════════════════════════════════════════════
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      group: "identity",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "identity",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      group: "identity",
      description: "Optional one-line description shown on cards",
    }),

    // ─── Classification ──────────────────────────────────────────────────────
    defineField({
      name: "category",
      title: "Categories",
      type: "array",
      group: "identity",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Architecture", value: "architecture" },
          { title: "Interior", value: "interior" },
          { title: "Landscape", value: "landscape" },
          { title: "Urban Design", value: "urban-design" },
          { title: "Master Planning", value: "master-planning" },
          { title: "Research", value: "research" },
          { title: "Renovation", value: "renovation" },
          { title: "Visualization", value: "visualization" },
        ],
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((categories: string[] | undefined) => {
            if (!categories || categories.length === 0) {
              return "At least one category is required";
            }

            // Check for proper format: lowercase with hyphens only
            const invalidFormats = categories.filter((cat) => {
              // Allow lowercase letters, numbers, and hyphens only
              const validFormat = /^[a-z0-9]+(-[a-z0-9]+)*$/;
              return !validFormat.test(cat);
            });

            if (invalidFormats.length > 0) {
              return `Invalid format: "${invalidFormats.join('", "')}". Use lowercase with hyphens (e.g., "urban-design")`;
            }

            // Check for duplicates
            const uniqueCategories = new Set(categories);
            if (uniqueCategories.size !== categories.length) {
              return "Duplicate categories found. Each category should be unique.";
            }

            return true;
          }),
      description: "Select project categories from the architectural discipline list.",
    }),
    defineField({
      name: "typology",
      title: "Typology",
      type: "array",
      group: "identity",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((typologies: string[] | undefined) => {
            if (!typologies || typologies.length === 0) {
              return "At least one typology is required";
            }

            // Check for proper format: lowercase with hyphens only
            const invalidFormats = typologies.filter((typ) => {
              // Allow lowercase letters, numbers, and hyphens only
              const validFormat = /^[a-z0-9]+(-[a-z0-9]+)*$/;
              return !validFormat.test(typ);
            });

            if (invalidFormats.length > 0) {
              return `Invalid format: "${invalidFormats.join('", "')}". Use lowercase with hyphens (e.g., "residential", "adaptive-reuse", "mixed-use", "villa")`;
            }

            // Check for duplicates
            const uniqueTypologies = new Set(typologies);
            if (uniqueTypologies.size !== typologies.length) {
              return "Duplicate typologies found. Each typology should be unique.";
            }

            return true;
          }),
      description:
        'Add architectural typologies as tags (press Enter after each). Examples: "residential", "commercial", "cultural", "adaptive-reuse", "public", "hospitality", "mixed-use", "villa", "institutional". Use lowercase with hyphens.',
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "identity",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "Ongoing", value: "ongoing" },
          { title: "Concept", value: "concept" },
          { title: "Competition", value: "competition" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      group: "identity",
      validation: (Rule) => Rule.required().min(1900).max(2100),
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 02 // LOCATION & SPECIFICATIONS
    // ═══════════════════════════════════════════════════════════════════════
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      group: "location",
      fields: [
        { name: "city", type: "string", title: "City", validation: (Rule) => Rule.required() },
        {
          name: "country",
          type: "string",
          title: "Country",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      group: "location",
      fields: [
        { name: "lat", type: "number", title: "Latitude" },
        { name: "lng", type: "number", title: "Longitude" },
        { name: "label", type: "string", title: "Label" },
      ],
    }),
    defineField({
      name: "areaM2",
      title: "Area (m²)",
      type: "number",
      group: "location",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 03 // EDITORIAL & STORY
    // ═══════════════════════════════════════════════════════════════════════
    defineField({
      name: "concept",
      title: "Design Concept",
      type: "text",
      group: "editorial",
      rows: 3,
      description: "The one-sentence central design idea (large type on detail page)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      group: "editorial",
      rows: 4,
      description: "Short description for cards, listings, and SEO",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "story",
      title: "Story (Legacy)",
      type: "text",
      group: "editorial",
      rows: 6,
      description: "Single-block narrative (fallback if chapters not provided)",
    }),
    defineField({
      name: "chapters",
      title: "Narrative Chapters",
      type: "array",
      group: "technical",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "heading",
              type: "string",
              title: "Chapter Heading",
              description: "Optional overline label",
            },
            {
              name: "body",
              type: "text",
              title: "Body",
              rows: 6,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              type: "object",
              title: "Chapter Image",
              fields: [
                {
                  name: "asset",
                  type: "image",
                  title: "Image",
                  options: { hotspot: true },
                },
                { name: "alt", type: "string", title: "Alt Text" },
                { name: "caption", type: "string", title: "Caption" },
                {
                  name: "narrative",
                  type: "text",
                  title: "Editorial Narrative",
                  rows: 3,
                  description: "1–3 sentence story accompanying this image",
                },
                {
                  name: "intent",
                  type: "string",
                  title: "Architectural Intent",
                  options: {
                    list: [
                      { title: "Design Intent", value: "design-intent" },
                      { title: "Spatial Experience", value: "spatial-experience" },
                      { title: "Materiality", value: "materiality" },
                      { title: "Site Relationship", value: "site-relationship" },
                      { title: "Environmental", value: "environmental" },
                      { title: "Construction", value: "construction" },
                    ],
                  },
                },
                {
                  name: "fullBleed",
                  type: "boolean",
                  title: "Full Bleed",
                  description: "Render edge-to-edge as cinematic moment",
                  initialValue: false,
                },
              ],
            },
          ],
        },
      ],
      description: "Ordered monograph-style narrative blocks",
    }),

    // ─── Material Narrative ──────────────────────────────────────────────────
    defineField({
      name: "materialNarrative",
      title: "Material Narrative",
      type: "array",
      group: "materials",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Material Name",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "rationale",
              type: "text",
              title: "Rationale",
              rows: 3,
              description: "Why this material was chosen (1–2 sentences)",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      description: "Editorial material rationale",
    }),
    defineField({
      name: "lightStrategy",
      title: "Light Strategy",
      type: "text",
      group: "editorial",
      rows: 4,
      description: "How daylight was used as a design tool",
    }),
    defineField({
      name: "siteResponse",
      title: "Site Response",
      type: "text",
      group: "editorial",
      rows: 4,
      description: "How the building responds to the specific site",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 04 // PHOTOGRAPHY & MEDIA
    // ═══════════════════════════════════════════════════════════════════════
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text" },
        { name: "caption", type: "string", title: "Caption" },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Cinematic Video (Optional)",
      type: "file",
      group: "media",
      options: { accept: "video/*" },
      description:
        "Short cinematic loop (recommended ≤ 60s, ≤ 50 MB, .mp4 / .webm). When provided, powers an ambient video loop in the monograph hero and a silent card preview on desktop hover.",
      fields: [
        { name: "caption", type: "string", title: "Caption" },
        { name: "credit", type: "string", title: "Cinematographer / Credit" },
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption" },
            {
              name: "narrative",
              type: "text",
              title: "Narrative",
              rows: 2,
              description: "Editorial narrative for this image",
            },
            {
              name: "intent",
              type: "string",
              title: "Intent",
              options: {
                list: [
                  { title: "Design Intent", value: "design-intent" },
                  { title: "Spatial Experience", value: "spatial-experience" },
                  { title: "Materiality", value: "materiality" },
                  { title: "Site Relationship", value: "site-relationship" },
                  { title: "Environmental", value: "environmental" },
                  { title: "Construction", value: "construction" },
                ],
              },
            },
            { name: "fullBleed", type: "boolean", title: "Full Bleed", initialValue: false },
          ],
        },
        {
          type: "object",
          name: "galleryVideo",
          title: "Video Plate",
          fields: [
            {
              name: "asset",
              type: "file",
              title: "Video File",
              options: { accept: "video/*" },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "poster",
              type: "image",
              title: "Poster Frame / Still Image",
              options: { hotspot: true },
              description: "Still image shown before playback or when reduced motion is preferred.",
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
            {
              name: "narrative",
              type: "text",
              title: "Editorial Narrative",
              rows: 2,
              description:
                "Editorial narrative for this clip (e.g. construction timelapse, spatial walkthrough)",
            },
            {
              name: "intent",
              type: "string",
              title: "Intent",
              options: {
                list: [
                  { title: "Design Intent", value: "design-intent" },
                  { title: "Spatial Experience", value: "spatial-experience" },
                  { title: "Materiality", value: "materiality" },
                  { title: "Site Relationship", value: "site-relationship" },
                  { title: "Environmental", value: "environmental" },
                  { title: "Construction", value: "construction" },
                ],
              },
            },
            { name: "fullBleed", type: "boolean", title: "Full Bleed", initialValue: false },
          ],
          preview: {
            select: {
              caption: "caption",
              intent: "intent",
              media: "poster",
            },
            prepare({ caption, intent, media }) {
              return {
                title: caption || "Video Plate",
                subtitle: intent ? `Video • ${intent}` : "Video Plate",
                media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "photographerCredit",
      title: "Photographer Credit",
      type: "string",
      group: "media",
      description: "Attribution for architectural photographer",
    }),
    defineField({
      name: "beforeAfter",
      title: "Before & After",
      type: "object",
      group: "media",
      fields: [
        {
          name: "before",
          type: "image",
          title: "Before Image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "after",
          type: "image",
          title: "After Image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption" },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "caption",
          type: "string",
          title: "Overall Caption",
          description: "Caption for the before/after comparison",
        },
      ],
      description: "Before and after transformation images (for renovation projects)",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 05 // CHAPTERS & DRAWINGS
    // ═══════════════════════════════════════════════════════════════════════
    defineField({
      name: "drawings",
      title: "Technical Drawings",
      type: "array",
      group: "technical",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              type: "image",
              title: "Drawing Image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              type: "string",
              title: "Drawing Title",
              description: 'e.g., "Ground Floor Plan", "Section A-A", "Material Junction Detail"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "code",
              type: "string",
              title: "Drawing Code",
              description: 'e.g., "DWG // 01", "DWG // 02"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "scale",
              type: "string",
              title: "Scale Notation",
              description: 'e.g., "1:100 @ A1", "1:50 @ A3", "1:10 @ A1"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Accessibility description",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "text",
              title: "Caption",
              rows: 3,
              description: "Technical description of the drawing",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "description",
              type: "text",
              title: "Technical Note (Optional)",
              rows: 2,
              description: "Additional architectural detail or explanation",
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "code",
              media: "image",
            },
            prepare({ title, subtitle, media }) {
              return {
                title: title || "Untitled Drawing",
                subtitle: subtitle || "No code",
                media,
              };
            },
          },
        },
      ],
      description:
        "Architectural plans, sections, elevations, and technical drawings with metadata",
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 06 // MATERIALS & SERVICES
    // ═══════════════════════════════════════════════════════════════════════
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "materials",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
        list: [
          { title: "Architecture", value: "architecture" },
          { title: "Interior Design", value: "interior-design" },
          { title: "Master Planning", value: "master-planning" },
          { title: "Urban Design", value: "urban-design" },
          { title: "Landscape Design", value: "landscape-design" },
          { title: "Feasibility Studies", value: "feasibility-studies" },
          { title: "Project Management", value: "project-management" },
          { title: "Construction Supervision", value: "construction-supervision" },
          { title: "Renovation", value: "renovation" },
          { title: "Visualization", value: "visualization" },
        ],
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((services: string[] | undefined) => {
            if (!services || services.length === 0) {
              return "At least one service is required";
            }

            // Check for proper format: lowercase with hyphens only
            const invalidFormats = services.filter((service) => {
              // Allow lowercase letters, numbers, and hyphens only
              const validFormat = /^[a-z0-9]+(-[a-z0-9]+)*$/;
              return !validFormat.test(service);
            });

            if (invalidFormats.length > 0) {
              return `Invalid format: "${invalidFormats.join('", "')}". Use lowercase with hyphens (e.g., "sustainability-consulting")`;
            }

            // Check for duplicates
            const uniqueServices = new Set(services);
            if (uniqueServices.size !== services.length) {
              return "Duplicate services found. Each service should be unique.";
            }

            return true;
          }),
      description:
        'Select from existing services or add new ones. Use lowercase-with-hyphens format (e.g., "sustainability-consulting")',
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 07 // TEAM & RECOGNITION
    // ═══════════════════════════════════════════════════════════════════════
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      group: "location",
    }),
    defineField({
      name: "team",
      title: "Project Team",
      type: "object",
      group: "team",
      fields: [
        { name: "partnerInCharge", type: "string", title: "Partner in Charge" },
        { name: "projectLead", type: "string", title: "Project Lead" },
        {
          name: "team",
          type: "array",
          title: "Team Members",
          of: [{ type: "string" }],
        },
        {
          name: "collaborators",
          type: "array",
          title: "Collaborators",
          of: [{ type: "string" }],
        },
      ],
    }),
    defineField({
      name: "awards",
      title: "Awards & Recognition",
      type: "array",
      group: "team",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Award Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "year",
              type: "number",
              title: "Year",
              validation: (Rule) => Rule.required().min(1900).max(2100),
            },
            {
              name: "organization",
              type: "string",
              title: "Awarding Organization",
              description: "Optional organization or institution name",
            },
          ],
          preview: {
            select: {
              title: "title",
              year: "year",
              organization: "organization",
            },
            prepare({ title, year, organization }) {
              return {
                title: title || "Untitled Award",
                subtitle: organization ? `${organization}, ${year}` : `${year}`,
              };
            },
          },
        },
      ],
      description: "Awards and recognition received for this project",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "identity",
      description: "Show on homepage featured section",
      initialValue: false,
    }),

    // ═══════════════════════════════════════════════════════════════════════
    // 08 // SEO
    // ═══════════════════════════════════════════════════════════════════════
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "title", type: "string", title: "Meta Title" },
        { name: "description", type: "text", title: "Meta Description", rows: 3 },
        {
          name: "ogImage",
          type: "image",
          title: "Social Share Image",
          description: "Image for social media sharing",
        },
      ],
    }),
  ],

  // ─── Preview Configuration ───────────────────────────────────────────────────
  preview: {
    select: {
      title: "title",
      subtitle: "location.city",
      media: "heroImage",
      year: "year",
      status: "status",
    },
    prepare({ title, subtitle, media, year, status }) {
      return {
        title: title || "Untitled Project",
        subtitle: `${subtitle || "Unknown"} • ${year || "N/A"} • ${status || "N/A"}`,
        media,
      };
    },
  },
});
