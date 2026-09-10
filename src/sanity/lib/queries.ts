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
    coordinates,
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
    typology,
    year,
    location,
    status,
    featured,
    description,
    photographerCredit,
    heroImage {
      ${imageProjection}
    },
    gallery[] {
      ${chapterImageProjection}
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
    intro,
    description,
    order,
    coverImage {
      ${imageProjection}
    },
    relatedProjects[]-> {
      _id,
      slug,
      title,
      subtitle,
      category,
      typology,
      year,
      location,
      photographerCredit,
      heroImage {
        ${imageProjection}
      }
    }
  }
`;

// Get single service by slug (for detail page)
export const serviceBySlugQuery = `
  *[_type == "service" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    slug,
    title,
    shortDescription,
    intro,
    description,
    approach[] {
      title,
      statement
    },
    order,
    editorialIntents,
    coverImage {
      ${imageProjection}
    },
    relatedProjects[]-> {
      _id,
      slug,
      title,
      subtitle,
      category,
      typology,
      year,
      location,
      photographerCredit,
      heroImage {
        ${imageProjection}
      },
      gallery[] {
        ${chapterImageProjection}
      }
    },
    ${seoProjection}
  }
`;

// Get all service slugs (for generateStaticParams)
export const serviceSlugsQuery = `
  *[_type == "service" && !(_id in path("drafts.**"))].slug.current
`;

/**
 * TEAM MEMBER QUERIES
 */

// Get all team members (for studio page grid)
export const teamQuery = `
  *[_type == "teamMember" && displayOnTeamPage != false && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    name,
    slug,
    role,
    biography,
    disciplines[],
    experience,
    interests[],
    email,
    phone,
    image {
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
    },
    socialLinks[] {
      platform,
      url,
      label
    },
    order,
    category-> {
      title,
      order
    }
  }
`;

/**
 * STUDIO SINGLETON QUERY
 */

// Get studio information (single published document)
export const studioQuery = `
  *[_type == "studio" && !(_id in path("drafts.**"))][0] {
    _id,
    name,
    overline,
    manifesto,
    introduction,
    philosophy,
    beliefs[] {
      code,
      title,
      statement
    },
    workingMethods[] {
      code,
      title,
      description
    },
    history,
    atelierImage {
      ${imageProjection}
    },
    images[] {
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
    },
    visit {
      overline,
      heading,
      body,
      visits
    },
    timeline[] {
      year,
      title,
      description
    },
    awards[] {
      title,
      organization,
      year,
      project,
      citation
    },
    clientSectors[] {
      code,
      title,
      description,
      projects,
      clients,
      collaborators
    },
    clientReferencesNote
  }
`;

/**
 * CAREER QUERIES
 */

// Get all open career postings (for careers page)
export const careersPositionsQuery = `
  *[_type == "career" && status == "Open" && !(_id in path("drafts.**"))] | order(featured desc, order asc) {
    _id,
    slug,
    title,
    discipline,
    location,
    type,
    description,
    requirements[],
    applicationLink,
    order,
    status,
    featured
  }
`;

// Get single career posting by slug
export const careerBySlugQuery = `
  *[_type == "career" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    slug,
    title,
    discipline,
    location,
    type,
    description,
    requirements[],
    applicationLink,
    order,
    status,
    featured,
    seo {
      title,
      description
    }
  }
`;

// Get all career slugs (for generateStaticParams)
export const careerSlugsQuery = `
  *[_type == "career" && status == "Open" && !(_id in path("drafts.**"))].slug.current
`;

// Get careers page singleton content (hero, open application, benefits, image)
export const careersQuery = `
  *[_type == "careers"][0] {
    _id,
    hero {
      overline,
      heading,
      body
    },
    openApplication {
      overline,
      heading,
      body,
      cta
    },
    benefits[] {
      number,
      title,
      description
    },
    studioImage {
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
    }
  }
`;

/**
 * CONTACT SINGLETON QUERY
 */

// Get contact information (single document)
export const contactQuery = `
  *[_type == "contact"][0] {
    _id,
    email,
    phone,
    address,
    coordinates,
    projectTypes[],
    offices[] {
      name,
      city,
      country,
      address,
      coordinates,
      hours,
      phone,
      mapsUrl,
      image {
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
      }
    },
    socialLinks[] {
      platform,
      url,
      label
    },
    editorialImage {
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
    }
  }
`;

/**
 * GLOBAL QUERIES
 */

// Get site settings (global singleton)
export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    tagline,
    description,
    siteUrl,
    defaultSeo {
      title,
      description,
      keywords,
      ogImage {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt
      }
    },
    analyticsCode,
    maintenanceMode,
    maintenanceMessage
  }
`;

export const pageIntrosQuery = `
  *[_type == "pageIntros"][0] {
    _id,
    projects {
      overline,
      title,
      description
    },
    services {
      overline,
      title,
      description,
      cta {
        overline,
        heading,
        body,
        action
      }
    },
    journal {
      overline,
      title,
      description
    },
    process {
      overline,
      title,
      description,
      cta {
        overline,
        heading,
        body,
        action
      }
    },
    sustainability {
      overline,
      heading,
      body
    },
    contact {
      overline,
      title,
      description,
      briefHeading,
      closingHeading,
      closingBody,
      editorialOverline,
      dialogueOverline
    }
  }
`;

/**
 * PROCESS PAGE SINGLETON QUERY
 */
export const processPageQuery = `
  *[_type == "processPage" && !(_id in path("drafts.**"))][0] {
    _id,
    heroOverline,
    heroTitle,
    heroDescription,
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      caption
    },
    steps[] {
      _key,
      order,
      title,
      duration,
      description,
      deliverables,
      visual {
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        },
        alt,
        caption
      }
    },
    proof {
      overline,
      heading,
      body,
      actionText,
      actionUrl
    },
    cta {
      overline,
      heading,
      body,
      action,
      actionUrl
    },
    seo {
      title,
      description
    }
  }
`;

/**
 * SUSTAINABILITY SINGLETON QUERY
 */

// Get sustainability page singleton content
export const sustainabilityQuery = `
  *[_type == "sustainability"][0] {
    _id,
    manifesto {
      overline,
      heading,
      body
    },
    philosophy {
      heading,
      body
    },
    materialImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt,
      caption
    },
    commitments[] {
      number,
      title,
      description
    },
    principles[],
    certifications[] {
      name,
      description
    },
    collaboration {
      heading,
      body,
      cta
    },
    seo {
      title,
      description
    }
  }
`;
