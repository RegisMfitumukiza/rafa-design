import type { ChapterIntent } from "@/content/projects";
import type { ImageAsset } from "@/content/types";

export type { ChapterIntent };

export interface ServiceApproach {
  /** Short title of the approach point — e.g. "Context" */
  title: string;
  /** One-sentence editorial statement */
  statement: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  /** Punchy one-line description used on index rows and search */
  shortDescription: string;
  /** Large editorial statement shown at the top of the detail page */
  intro: string;
  /** Long-form editorial description of how RAFA approaches this discipline */
  description: string;
  /** Numbered methodological approach points for the detail page */
  approach: ServiceApproach[];
  icon?: string;
  /** Optional dedicated cover/hero image for this discipline from Sanity */
  coverImage?: ImageAsset;
  relatedProjects: string[];
  /**
   * Which project image intents are editorially relevant for this discipline.
   * Images from related project galleries are filtered by these intents so that
   * e.g. Interior Design shows only spatial/material images — never site shots.
   * If empty, all images are eligible.
   */
  editorialIntents: ChapterIntent[];
}

const services: Service[] = [
  {
    id: "architecture",
    slug: "architecture",
    title: "Architecture",
    shortDescription: "Custom homes, commercial buildings, and cultural spaces.",
    intro:
      "Architecture as the quiet negotiation between land, light, and the way people live — buildings at once rooted and open.",
    description:
      "From concept to construction, we deliver architectural design that responds to site, program, and context. Every project begins with a deep understanding of the land, the light, and the way people will inhabit the space. We work across scales — from small interventions to new buildings — always prioritising material honesty, spatial clarity, and a quiet sense of craft.",
    approach: [
      {
        title: "Context",
        statement:
          "Every project begins by reading the site — its slope, its climate, its history, and the way light moves across it.",
      },
      {
        title: "Spatial strategy",
        statement:
          "Plans are composed as sequences of rooms and thresholds, with a clear hierarchy of public and private, light and shadow.",
      },
      {
        title: "Materiality",
        statement:
          "Materials are chosen for honesty and permanence — local stone, mineral render, timber — and detailed to age with dignity.",
      },
      {
        title: "Performance",
        statement:
          "Passive solar orientation, natural ventilation, and robust construction ensure buildings that perform across decades.",
      },
    ],
    relatedProjects: ["casa-monte", "villa-marim", "atelier-norte"],
    // Architecture: site relationship, design intent, construction, environmental
    editorialIntents: ["design-intent", "site-relationship", "construction", "environmental"],
  },
  {
    id: "interior-design",
    slug: "interior-design",
    title: "Interior Design",
    shortDescription: "Materiality, finishes, and furnishings.",
    intro:
      "Interiors that extend the architecture rather than decorate it — rooms composed of material, light, and a restrained palette.",
    description:
      "Our interior design practice approaches each space as an extension of the architecture. We select materials, finishes, and furnishings that feel natural to the building rather than applied to it. The palette is restrained — focused on texture, warmth, and the sensory experience of being in a room. We work closely with artisans and makers to create bespoke elements where the standard will not do.",
    approach: [
      {
        title: "Context",
        statement:
          "Each interior begins from the building that contains it — its proportions, its light, and the way it meets the outside.",
      },
      {
        title: "Spatial strategy",
        statement:
          "Rooms are organised around how they are inhabited — circulation, gathering, rest — with storage resolved before decoration.",
      },
      {
        title: "Materiality",
        statement:
          "Textures and finishes are selected to age and warm with use — wood, linen, stone, plaster — worked closely with artisans.",
      },
      {
        title: "Performance",
        statement:
          "Acoustics, thermal comfort, and durability are treated as part of the aesthetic rather than as afterthoughts.",
      },
    ],
    relatedProjects: ["casa-monte", "atelier-norte", "largo-gallery"],
    // Interior Design: spatial experience and materiality only — never exterior/site shots
    editorialIntents: ["spatial-experience", "materiality"],
  },
  {
    id: "landscape-design",
    slug: "landscape-design",
    title: "Landscape Design",
    shortDescription: "Outdoor spaces conceived as integral to the architecture.",
    intro:
      "The ground around a building is designed as architecture — terrain, planting, and light shaped as one system with the interior.",
    description:
      "We believe a building and its surroundings should be designed as a single system. Our landscape work extends the interior outward — shaping gardens, courtyards, and terraces that are as carefully considered as the rooms inside. We work with native planting, local stone, and natural drainage to create landscapes that feel settled and enduring.",
    approach: [
      {
        title: "Context",
        statement:
          "Landscapes begin from the existing ground — its drainage, its exposure, and the native species already at home there.",
      },
      {
        title: "Spatial strategy",
        statement:
          "Exterior rooms are composed with the same care as interiors — courts, terraces, and paths that direct movement and view.",
      },
      {
        title: "Materiality",
        statement:
          "Local stone, earth, and water are used with restraint — surfaces that settle and strengthen as they weather.",
      },
      {
        title: "Performance",
        statement:
          "Planting is chosen for the climate it must survive — native, drought-tolerant, and free of permanent irrigation.",
      },
    ],
    relatedProjects: ["villa-marim"],
    // Landscape: site relationship and environmental — exterior and planted spaces
    editorialIntents: ["site-relationship", "environmental"],
  },
  {
    id: "urban-design",
    slug: "urban-design",
    title: "Urban Design",
    shortDescription: "Master planning and public space strategy.",
    intro:
      "Work at the scale of streets and blocks — shaping public space, movement, and the relationship between buildings and the city.",
    description:
      "At the urban scale, our work focuses on the relationship between buildings, public space, and movement. We develop strategies that prioritise walkability, natural light, and a sense of enclosure — creating neighbourhoods that feel cohesive without being uniform. Our approach is collaborative, working with developers, municipalities, and communities to shape the places people live.",
    approach: [
      {
        title: "Context",
        statement:
          "Urban strategies respond to the existing city — its grain, its street network, and the patterns of everyday life.",
      },
      {
        title: "Spatial strategy",
        statement:
          "Public space is designed as the city's primary room — walkable, shaded, and framed by well-mannered buildings.",
      },
      {
        title: "Materiality",
        statement:
          "Materials at the urban scale are chosen for endurance — paving, trees, and street furniture that age coherently.",
      },
      {
        title: "Performance",
        statement:
          "Mixed programmes, natural light, and a sense of enclosure keep neighbourhoods alive across the day.",
      },
    ],
    relatedProjects: [],
    // Urban Design: design intent and site relationship
    editorialIntents: ["design-intent", "site-relationship"],
  },
  {
    id: "renovation",
    slug: "renovation",
    title: "Renovation",
    shortDescription: "Sensitive interventions in existing buildings.",
    intro:
      "We intervene in existing buildings with restraint — preserving character, proportion, and materiality while renewing performance.",
    description:
      "We approach renovation with restraint and respect for the original architecture. Our work preserves what matters — character, proportion, materiality — while introducing the performance and programmatic changes needed for contemporary life. Whether restoring a mid-century villa or adapting a historic townhouse, we treat each building as a layered history to be read and continued.",
    approach: [
      {
        title: "Context",
        statement:
          "Renovation begins by reading the existing building as a layered history — what it was, what it became, and what matters.",
      },
      {
        title: "Spatial strategy",
        statement:
          "New elements are composed to respect the original order — legible additions that never pretend to be original.",
      },
      {
        title: "Materiality",
        statement:
          "Original materials are restored wherever they survive; new materials are chosen to age in the same register.",
      },
      {
        title: "Performance",
        statement:
          "Thermal, acoustic, and programmatic upgrades are introduced without compromising the character that gives a building its value.",
      },
    ],
    relatedProjects: ["baia-house", "atelier-norte", "studio-patio"],
    // Renovation: construction process, materiality, and design intent — the before/after story
    editorialIntents: ["construction", "materiality", "design-intent"],
  },
  {
    id: "consulting",
    slug: "consulting",
    title: "Consulting",
    shortDescription: "Feasibility studies, design strategy, and expert advice.",
    intro:
      "Strategic advice across the life of a project — from site evaluation and feasibility to design review and construction monitoring.",
    description:
      "We provide strategic advice at every stage of a project — from site evaluation and feasibility studies to design review and construction monitoring. Our consulting work helps clients, developers, and institutions make informed decisions about their built environment, drawing on decades of collective experience across typologies and contexts.",
    approach: [
      {
        title: "Context",
        statement:
          "Consulting begins from an honest assessment of the site, the brief, and the constraints that will shape the outcome.",
      },
      {
        title: "Spatial strategy",
        statement:
          "We help clients evaluate spatial options — comparing massing, programme, and phasing against cost and value.",
      },
      {
        title: "Materiality",
        statement:
          "Advice on materials and systems is grounded in performance — durability, maintenance, and long-term operational cost.",
      },
      {
        title: "Performance",
        statement:
          "Independent design review and construction monitoring keep projects aligned with intent, budget, and programme.",
      },
    ],
    relatedProjects: [],
    // Consulting: no editorial imagery — discipline is advisory, not photogenic
    editorialIntents: [],
  },
];

export function getServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedProjectsForService(service: Service): string[] {
  return service.relatedProjects;
}

/** Padded index of a service within the disciplines list — e.g. "01" */
export function getServiceIndex(slug: string): string {
  const index = services.findIndex((s) => s.slug === slug);
  return index >= 0 ? String(index + 1).padStart(2, "0") : "00";
}

/** Disciplines that share project evidence with the given service, strongest first. */
export function getRelatedServicesForService(service: Service): Service[] {
  const mine = new Set(service.relatedProjects);
  return services
    .filter((s) => s.id !== service.id)
    .map((s) => ({ service: s, shared: s.relatedProjects.filter((p) => mine.has(p)).length }))
    .filter((entry) => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .map((entry) => entry.service);
}
