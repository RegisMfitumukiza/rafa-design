/**
 * Sanity Studio Schema Definitions
 *
 * Formal document and block definitions matching the RAFA content model.
 * These schemas provide 1:1 contract parity when migrating to Sanity CMS in Phase 8.
 */

export const sanityPersonSchema = {
  name: "person",
  title: "Person / Collaborator",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "organization", title: "Organization", type: "string" },
    { name: "bio", title: "Biography", type: "text" },
    { name: "url", title: "Website / Portfolio URL", type: "url" },
    { name: "avatar", title: "Avatar Image", type: "image", options: { hotspot: true } },
    { name: "email", title: "Email Address", type: "string" },
  ],
};

export const sanityOfficeSchema = {
  name: "office",
  title: "Studio Office Location",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    { name: "name", title: "Office Name", type: "string" },
    { name: "city", title: "City", type: "string" },
    { name: "country", title: "Country", type: "string" },
    { name: "address", title: "Address", type: "string" },
    { name: "postalCode", title: "Postal Code", type: "string" },
    {
      name: "coordinates",
      title: "GPS Coordinates",
      type: "object",
      fields: [
        { name: "lat", title: "Latitude", type: "number" },
        { name: "lng", title: "Longitude", type: "number" },
      ],
    },
    { name: "openingHours", title: "Opening Hours", type: "string" },
    { name: "phone", title: "Telephone", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "mapsUrl", title: "Google Maps URL", type: "url" },
  ],
};

export const sanityProjectSchema = {
  name: "project",
  title: "Architectural Project",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "title", title: "Project Title", type: "string" },
    { name: "subtitle", title: "Subtitle / Typology", type: "string" },
    { name: "description", title: "Short Description", type: "text" },
    { name: "heroImage", title: "Hero Photography", type: "image", options: { hotspot: true } },
    { name: "category", title: "Categories", type: "array", of: [{ type: "string" }] },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["built", "in-progress", "concept"] },
    },
    { name: "year", title: "Year", type: "number" },
    {
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        { name: "city", title: "City", type: "string" },
        { name: "country", title: "Country", type: "string" },
        {
          name: "coordinates",
          title: "GPS Coordinates",
          type: "object",
          fields: [
            { name: "lat", title: "Latitude", type: "number" },
            { name: "lng", title: "Longitude", type: "number" },
            { name: "label", title: "Location Label", type: "string" },
          ],
        },
      ],
    },
    {
      name: "specs",
      title: "Technical Specifications",
      type: "object",
      fields: [
        { name: "area", title: "Area (sqm)", type: "string" },
        { name: "client", title: "Client", type: "string" },
        { name: "typology", title: "Typology", type: "string" },
        { name: "leadArchitect", title: "Lead Architect", type: "string" },
      ],
    },
    {
      name: "gallery",
      title: "Photography Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    },
    {
      name: "drawings",
      title: "Architectural Drawings & Plans",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "ID", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "code", title: "Drawing Code", type: "string" },
            { name: "scale", title: "Scale Ratio", type: "string" },
            { name: "imageSrc", title: "Drawing Image", type: "string" },
            { name: "caption", title: "Caption", type: "text" },
          ],
        },
      ],
    },
  ],
};

export const sanityJournalArticleSchema = {
  name: "journalArticle",
  title: "Journal Article",
  type: "document",
  fields: [
    { name: "id", title: "ID", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    { name: "title", title: "Title", type: "string" },
    { name: "subtitle", title: "Subtitle", type: "string" },
    {
      name: "type",
      title: "Editorial Type",
      type: "string",
      options: {
        list: ["essay", "project-story", "material-study", "news", "event", "award"],
      },
    },
    { name: "category", title: "Category", type: "string" },
    { name: "publishedAt", title: "Publish Date", type: "date" },
    { name: "author", title: "Author", type: "reference", to: [{ type: "person" }] },
    { name: "hero", title: "Hero Plate", type: "image", options: { hotspot: true } },
    { name: "excerpt", title: "Excerpt", type: "text" },
    {
      name: "sections",
      title: "Article Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "id", title: "Section ID", type: "string" },
            { name: "number", title: "Section Number", type: "string" },
            { name: "title", title: "Section Title", type: "string" },
            {
              name: "blocks",
              title: "Content Blocks",
              type: "array",
              of: [
                { type: "block" }, // Portable Text standard paragraph/heading
                { type: "image" },
                {
                  name: "pullquote",
                  type: "object",
                  fields: [
                    { name: "content", type: "text" },
                    { name: "author", type: "string" },
                  ],
                },
                {
                  name: "projectReference",
                  type: "object",
                  fields: [{ name: "projectSlug", type: "string" }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "credits",
      title: "Credits & Attributions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "role", type: "string" },
            { name: "name", type: "string" },
            { name: "organization", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    },
    { name: "relatedProjects", title: "Related Projects", type: "array", of: [{ type: "string" }] },
  ],
};
