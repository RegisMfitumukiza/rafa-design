// ============================================================================
// RAFA JOURNAL — ARTICLE DATA
// Editorial content in new block-based format
// ============================================================================

import type {
  JournalArticle,
  JournalType,
  JournalCategory,
  Person,
  JournalMedia,
  JournalSection,
  Credit,
  JournalEvent,
  ProjectReference,
} from "./types";

// ----------------------------------------------------------------------------
// EXAMPLE: ESSAY — "The Language of Light"
// ----------------------------------------------------------------------------

const languageOfLightArticle: JournalArticle = {
  id: "language-of-light",
  slug: "language-of-light",
  type: "essay",
  category: "ideas",
  
  title: "The Language of Light",
  subtitle: "How the quality of daylight shapes our architectural decisions",
  excerpt:
    "An exploration of light as material — and why we design for shadows as much as for sun.",
  
  publishedAt: "2026-06-18",
  
  author: {
    id: "rafael-mendes",
    name: "Rafael Mendes",
    role: "Founding Architect",
    organization: "RAFA Design Hub",
  },
  
  hero: {
    src: "/images/journal/language-of-light.jpg",
    alt: "Interior with dramatic daylight filtering through deep reveals",
    caption: "Casa Monte interior, morning light",
    credit: {
      role: "photography",
      name: "João Morgado",
    },
    aspectRatio: "hero",
  },
  
  estimatedReadingTime: 8,
  
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        {
          type: "text",
          content:
            "Light is the most democratic material in architecture. It costs nothing, it belongs to everyone, and yet it transforms a space more profoundly than any finish or furnishing. This is the story of how we think about light at RAFA Design Hub.",
        },
      ],
    },
    {
      id: "character",
      number: "01",
      title: "The Character of Light",
      blocks: [
        {
          type: "text",
          content:
            "Every site has a character of light. A north-facing slope in Porto receives a cool, even light that flatters stone and plaster. A south-facing site in the Algarve receives a brilliant, high-contrast light that demands shade. We begin every project by mapping the light — how it enters each room, at what time of day, in which season.",
        },
        {
          type: "image",
          media: {
            src: "/images/process/site-visit.jpg",
            alt: "Architect studying site light conditions",
            caption: "Early site analysis, Villa Marim",
            aspectRatio: "landscape",
          },
          layout: "wide",
        },
      ],
    },
    {
      id: "precision",
      number: "02",
      title: "Designing with Precision",
      blocks: [
        {
          type: "text",
          content:
            "We design openings with precision. Windows are not holes in a wall; they are instruments that direct, filter, and shape light. Deep reveals create pools of shadow. A carefully placed skylight washes a wall with moving light across the day. Brise-soleil, screens, and planting soften the glare of summer sun while letting winter light penetrate deep into the interior.",
        },
        {
          type: "pullquote",
          content:
            "The goal is not more light, but better light. A room that receives dappled morning light for an hour feels more generous than one that is flooded uniformly all day.",
          layout: "center",
        },
      ],
    },
    {
      id: "shadow",
      number: "03",
      title: "The Meaning of Shadow",
      blocks: [
        {
          type: "text",
          content:
            "We design for the shadow as much as for the sun — because it is the shadow that gives the light its meaning. In the Mediterranean climate, shadow is not the absence of light. It is a presence, a quality, a material condition that makes the interior habitable.",
        },
        {
          type: "image",
          media: {
            src: "/images/projects/casa-monte-02.jpg",
            alt: "Deep overhang creating dramatic shadow",
            caption: "Casa Monte terrace, afternoon shadow",
            credit: {
              role: "photography",
              name: "João Morgado",
            },
            aspectRatio: "landscape",
          },
          layout: "full",
        },
      ],
    },
  ],
  
  relatedProjects: ["casa-monte", "studio-patio", "villa-marim"],
  
  credits: [
    {
      role: "photography",
      name: "João Morgado",
      url: "https://joaomorgado.com",
    },
  ],
  
  keywords: ["light", "design philosophy", "architecture", "shadow"],
};

// ----------------------------------------------------------------------------
// EXAMPLE: EVENT — "Open House Porto"
// ----------------------------------------------------------------------------

const openHousePortoArticle: JournalArticle = {
  id: "open-house-porto-2026",
  slug: "open-house-porto-2026",
  type: "event",
  category: "events",
  
  title: "Open House Porto — Studio Patio",
  subtitle: "Join us for a weekend celebrating architecture in Porto",
  excerpt:
    "This September, our own studio will open its doors as part of the Open House Porto festival.",
  
  publishedAt: "2026-07-12",
  
  author: {
    id: "rafa-design-hub",
    name: "RAFA Design Hub",
  },
  
  hero: {
    src: "/images/journal/open-house-porto.jpg",
    alt: "Studio Patio courtyard with natural light",
    caption: "Studio Patio, Porto",
    credit: {
      role: "photography",
      name: "RAFA Archive",
    },
    aspectRatio: "hero",
  },
  
  event: {
    date: "2026-09-20",
    endDate: "2026-09-21",
    time: "09:00",
    endTime: "18:00",
    timezone: "WET",
    location: "Porto, Portugal",
    venue: "Studio Patio",
    address: "Rua de São Bento da Vitória, Porto 4050-543, Portugal",
    city: "Porto",
    country: "Portugal",
    admission: "Free",
    moreInfoLink: "https://openhouseporto.org",
  },
  
  estimatedReadingTime: 3,
  
  sections: [
    {
      id: "about",
      title: "About the Event",
      blocks: [
        {
          type: "text",
          content:
            "Open House Porto is a celebration of architecture in the city — a weekend when buildings that are normally closed to the public open their doors, and architects share the stories behind their work.",
        },
        {
          type: "text",
          content:
            "This year, Studio Patio — our own workspace in Porto's historic centre — will be part of the programme. The studio is a small building wrapped around a restored patio, designed as our own laboratory for ideas about light, material, and space.",
        },
      ],
    },
    {
      id: "visit",
      title: "Your Visit",
      blocks: [
        {
          type: "text",
          content:
            "Visitors will have the opportunity to walk through the studio, meet members of the team, and see current work in progress. We will also display the process materials behind recent projects: sketches, study models, and material samples.",
        },
        {
          type: "event",
          event: {
            date: "2026-09-20",
            endDate: "2026-09-21",
            time: "09:00",
            endTime: "18:00",
            timezone: "WET",
            location: "Porto, Portugal",
            venue: "Studio Patio",
            address: "Rua de São Bento da Vitória, Porto 4050-543, Portugal",
            city: "Porto",
            country: "Portugal",
            admission: "Free",
            moreInfoLink: "https://openhouseporto.org",
          },
        },
      ],
    },
  ],
  
  relatedProjects: ["studio-patio"],
  
  keywords: ["event", "open house", "porto", "studio visit"],
};

// ----------------------------------------------------------------------------
// EXAMPLE: NEWS — "Casa Monte Award"
// ----------------------------------------------------------------------------

const casaMonteAwardArticle: JournalArticle = {
  id: "casa-monte-archdaily-award",
  slug: "casa-monte-archdaily-award",
  type: "award",
  category: "awards",
  
  title: "Casa Monte Named ArchDaily Building of the Year",
  excerpt:
    "Our hillside residence in the Algarve has been recognised as one of the year's most significant buildings.",
  
  publishedAt: "2025-06-08",
  
  author: {
    id: "rafa-design-hub",
    name: "RAFA Design Hub",
  },
  
  hero: {
    src: "/images/journal/casa-monte-award.jpg",
    alt: "Casa Monte exterior view",
    caption: "Casa Monte, Algarve, 2025",
    credit: {
      role: "photography",
      name: "João Morgado",
      url: "https://joaomorgado.com",
    },
    aspectRatio: "hero",
  },
  
  estimatedReadingTime: 2,
  
  sections: [
    {
      id: "announcement",
      title: "Recognition",
      blocks: [
        {
          type: "text",
          content:
            "We are delighted to share that Casa Monte has been selected as ArchDaily Building of the Year in the Residential category.",
        },
        {
          type: "text",
          content:
            "The award recognises projects that demonstrate architectural excellence and contribute positively to the profession and the built environment. To be included among the winning projects this year is a humbling validation of the studio's approach.",
        },
      ],
    },
    {
      id: "project",
      title: "The Project",
      blocks: [
        {
          type: "text",
          content:
            "Casa Monte, completed in 2025, is a private residence that negotiates a steep hillside site above the Atlantic. The house stretches along the contour of the slope, opening its interior to the landscape through carefully positioned apertures. Local stone anchors the volume to the ground; white render and deep overhangs respond to the Mediterranean climate.",
        },
        {
          type: "project-reference",
          project: {
            id: "casa-monte",
            slug: "casa-monte",
            title: "Casa Monte",
            location: "Algarve, Portugal",
            year: 2025,
            type: "Residential",
            coverImage: "/images/projects/casa-monte-hero.jpg",
          },
        },
      ],
    },
    {
      id: "acknowledgment",
      title: "Acknowledgment",
      blocks: [
        {
          type: "text",
          content:
            "The project was a collaboration with an exceptional team of consultants, builders, and craftspeople, and above all with clients who trusted the process. We thank them all.",
        },
        {
          type: "external-link",
          label: "View Award Announcement",
          url: "https://www.archdaily.com",
          description: "ArchDaily Building of the Year 2025",
        },
      ],
    },
  ],
  
  relatedProjects: ["casa-monte"],
  
  credits: [
    {
      role: "photography",
      name: "João Morgado",
      url: "https://joaomorgado.com",
    },
  ],
  
  keywords: ["award", "casa monte", "archdaily", "recognition"],
};

// ----------------------------------------------------------------------------
// ARTICLE COLLECTION
// ----------------------------------------------------------------------------

export const articles: JournalArticle[] = [
  languageOfLightArticle,
  openHousePortoArticle,
  casaMonteAwardArticle,
];

// ----------------------------------------------------------------------------
// EXPORT HELPERS
// ----------------------------------------------------------------------------

export function getArticles(): JournalArticle[] {
  return [...articles].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByType(type: JournalType): JournalArticle[] {
  return articles.filter((a) => a.type === type);
}

export function getArticlesByCategory(category: JournalCategory): JournalArticle[] {
  return articles.filter((a) => a.category === category);
}

export function getFeaturedArticle(): JournalArticle {
  const sorted = getArticles();
  return sorted[0]!;
}

export function getRelatedArticles(article: JournalArticle, count = 2): JournalArticle[] {
  return articles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.relatedProjects?.some((p) => article.relatedProjects?.includes(p)),
    )
    .concat(
      articles.filter(
        (a) =>
          a.slug !== article.slug &&
          a.category === article.category &&
          !a.relatedProjects?.some((p) => article.relatedProjects?.includes(p)),
      ),
    )
    .slice(0, count);
}
