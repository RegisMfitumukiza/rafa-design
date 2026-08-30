/**
 * GROQ Queries for Sanity Content
 *
 * Centralized repository of all GROQ queries used throughout the application.
 * Organized by content type following RAFA's architecture.
 *
 * @see https://www.sanity.io/docs/groq
 */

/**
 * Common projection fields used across queries
 */

// Base image projection with asset reference and metadata
export const imageProjection = `
  asset->{
    _id,
    url,
    metadata {
      dimensions,
      lqip
    }
  },
  alt,
  caption,
  credit
`;

// Chapter image projection (extends base with narrative and intent)
export const chapterImageProjection = `
  asset,
  alt,
  caption,
  narrative,
  intent,
  fullBleed
`;

// Base SEO projection
export const seoProjection = `
  seo {
    title,
    description,
    ogImage {
      ${imageProjection}
    }
  }
`;

/**
 * PROJECT QUERIES
 */

// Get all projects (for listing page)
export const projectsQuery = `
  *[_type == "project" && !(_id in path("drafts.**"))] | order(featured desc, year desc) {
    _id,
    slug,
    title,
    subtitle,
    category,
    typology,
    year,
    location,
    status,
    areaM2,
    featured,
    description,
    services,
    heroImage {
      ${imageProjection}
    }
  }
`;

// Get single project by slug (for detail page)
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    slug,
    title,
    subtitle,
    category,
    typology,
    status,
    year,
    areaM2,
    location,
    coordinates,
    client,
    concept,
    description,
    story,
    chapters[] {
      heading,
      body,
      image {
        "asset": asset.asset,
        alt,
        caption,
        narrative,
        intent,
        fullBleed
      }
    },
    materialNarrative[] {
      name,
      rationale
    },
    lightStrategy,
    siteResponse,
    heroImage {
      ${imageProjection}
    },
    gallery[] {
      ${chapterImageProjection}
    },
    drawings[] {
      image,
      title,
      code,
      scale,
      alt,
      caption,
      description
    },
    beforeAfter {
      before {
        ${imageProjection}
      },
      after {
        ${imageProjection}
      },
      caption
    },
    photographerCredit,
    team {
      partnerInCharge,
      projectLead,
      team,
      collaborators
    },
    awards[] {
      title,
      year,
      organization
    },
    services,
    featured,
    ${seoProjection}
  }
`;

// Get all project slugs (for generateStaticParams)
export const projectSlugsQuery = `
  *[_type == "project" && !(_id in path("drafts.**"))].slug.current
`;

// Get projects by slug array (for related projects)
export const projectsBySlugQuery = `
  *[_type == "project" && slug.current in $slugs && !(_id in path("drafts.**"))] {
    _id,
    slug,
    title,
    subtitle,
    category,
    year,
    location,
    status,
    featured,
    description,
    heroImage {
      ${imageProjection}
    }
  }
`;

/**
 * JOURNAL QUERIES
 */

// Get all journal articles (for listing page)
export const articlesQuery = `
  *[_type == "journalArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    slug,
    title,
    subtitle,
    excerpt,
    type,
    category,
    publishedAt,
    updatedAt,
    readingTime,
    author {
      name,
      role,
      url
    },
    hero {
      ${imageProjection}
    }
  }
`;

// Get single article by slug (for detail page)
export const articleBySlugQuery = `
  *[_type == "journalArticle" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    slug,
    title,
    subtitle,
    excerpt,
    type,
    category,
    publishedAt,
    updatedAt,
    readingTime,
    author {
      name,
      role,
      url
    },
    hero {
      ${imageProjection}
    },
    content[] {
      ...,
      _type == "image" => {
        ...,
        ${imageProjection}
      },
      _type == "gallery" => {
        ...,
        images[] {
          ${imageProjection}
        }
      },
      _type == "projectReference" => {
        ...,
        "project": @->{
          _id,
          slug,
          title,
          subtitle,
          year,
          location,
          heroImage {
            ${imageProjection}
          }
        }
      }
    },
    relatedProjects[]-> {
      _id,
      slug,
      title,
      subtitle,
      year,
      location,
      heroImage {
        ${imageProjection}
      }
    },
    relatedArticles[]-> {
      _id,
      slug,
      title,
      excerpt,
      category,
      publishedAt,
      hero {
        ${imageProjection}
      }
    },
    ${seoProjection}
  }
`;

// Get articles by category (for category filtering)
export const articlesByCategoryQuery = `
  *[_type == "journalArticle" && category == $category && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    slug,
    title,
    subtitle,
    excerpt,
    type,
    category,
    publishedAt,
    readingTime,
    author {
      name,
      role
    },
    hero {
      ${imageProjection}
    }
  }
`;

// Get featured article (prefers featured == true, then newest)
export const featuredArticleQuery = `
  *[_type == "journalArticle" && !(_id in path("drafts.**"))] | order(featured desc, publishedAt desc)[0] {
    _id,
    slug,
    title,
    subtitle,
    excerpt,
    type,
    category,
    publishedAt,
    readingTime,
    author {
      name,
      role,
      url
    },
    hero {
      ${imageProjection}
    }
  }
`;

// Get all article slugs (for generateStaticParams)
export const articleSlugsQuery = `
  *[_type == "journalArticle" && !(_id in path("drafts.**"))].slug.current
`;

// Get latest article (for cron job)
export const latestArticleQuery = `
  *[_type == "journalArticle" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0] {
    publishedAt
  }
`;

/**
 * SERVICE QUERIES
 */

// Get all services (for listing page)
export const servicesQuery = `
  *[_type == "service" && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    slug,
    title,
    shortDescription,
    order
  }
`;

// Get single service by slug (for detail page)
export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    slug,
    title,
    shortDescription,
    description,
    approach[] {
      title,
      description
    },
    order,
    ${seoProjection},
    "relatedProjects": *[_type == "project" && references(^._id) && !(_id in path("drafts.**"))] | order(year desc)[0...6] {
      _id,
      slug,
      title,
      year,
      location,
      heroImage {
        ${imageProjection}
      }
    }
  }
`;

// Get all service slugs (for generateStaticParams)
export const serviceSlugsQuery = `
  *[_type == "service" && !(_id in path("drafts.**"))].slug.current
`;

/**
 * SINGLETON QUERIES
 */

// Get studio information
export const studioQuery = `
  *[_type == "studio"][0] {
    name,
    tagline,
    introduction,
    manifesto,
    beliefs[],
    workingMethods[] {
      title,
      description
    },
    heroImage {
      ${imageProjection}
    },
    atelierImage {
      ${imageProjection}
    }
  }
`;

// Get team members
export const teamQuery = `
  *[_type == "teamMember" && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    name,
    role,
    bio,
    disciplines[],
    experience,
    interests[],
    image {
      ${imageProjection}
    },
    order
  }
`;

// Get careers information
export const careersQuery = `
  *[_type == "careers"][0] {
    introduction,
    benefits[] {
      title,
      description
    },
    positions[] {
      title,
      type,
      location,
      description,
      requirements[]
    }
  }
`;

// Get contact information
export const contactQuery = `
  *[_type == "contact"][0] {
    email,
    phone,
    office {
      address,
      city,
      country,
      coordinates {
        lat,
        lng
      }
    },
    socialLinks[] {
      platform,
      url
    },
    visitingHours
  }
`;

/**
 * GLOBAL QUERIES
 */

// Get site settings
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteName,
    siteUrl,
    defaultSeo {
      title,
      description,
      ogImage {
        ${imageProjection}
      }
    }
  }
`;
