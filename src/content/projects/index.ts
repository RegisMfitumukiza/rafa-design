import type { ImageAsset, Location } from "@/content/types";

export type { Location };

export type ProjectCategory =
  | "architecture"
  | "interior"
  | "landscape"
  | "urban-design"
  | "master-planning"
  | "research"
  | "renovation"
  | "visualization"
  | (string & {});

export type ProjectStatus = "completed" | "ongoing" | "concept" | "competition";

// ─── Team ────────────────────────────────────────────────────────────────────

export interface ProjectTeam {
  partnerInCharge: string;
  projectLead: string;
  team: string[];
  collaborators?: string[];
}

// ─── Technical Drawings ──────────────────────────────────────────────────────

export interface ProjectDrawing {
  /** Unique identifier for the drawing */
  id: string;
  /** Drawing title (e.g., "Ground Floor Plan") */
  title: string;
  /** Drawing code (e.g., "DWG // 01") */
  code: string;
  /** Scale notation (e.g., "1:100 @ A1") */
  scale: string;
  /** Drawing image */
  image: ImageAsset;
  /** Technical caption/description */
  caption: string;
  /** Optional additional technical note */
  description?: string;
}

// ─── Monograph Chapter Block ──────────────────────────────────────────────────

export type ChapterIntent =
  | "design-intent"
  | "spatial-experience"
  | "materiality"
  | "site-relationship"
  | "environmental"
  | "construction";

export interface ChapterImage extends ImageAsset {
  /** 1–3 sentence editorial narrative accompanying this specific image */
  narrative?: string;
  /** What kind of architectural story this image tells */
  intent?: ChapterIntent;
  /** If true, renders edge-to-edge (container="full") as a cinematic moment */
  fullBleed?: boolean;
}

export interface ProjectHeroVideo {
  /** Video file URL hosted on Sanity CDN or external source */
  url: string;
  /** Optional caption describing the video footage */
  caption?: string;
  /** Optional cinematographer or visualizer credit */
  credit?: string;
}

export interface ProjectGalleryVideo {
  type: "video";
  /** Video file URL */
  url: string;
  /** High-resolution poster frame / still image */
  poster?: ImageAsset;
  /** Caption displayed under plate */
  caption?: string;
  /** Videographer or drone operator credit */
  credit?: string;
  /** 1–3 sentence editorial narrative */
  narrative?: string;
  /** Architectural story intent (e.g. spatial-experience, construction) */
  intent?: ChapterIntent;
  /** If true, renders edge-to-edge as a cinematic moment */
  fullBleed?: boolean;
}

export type ProjectGalleryMedia = (ChapterImage & { type?: "image" }) | ProjectGalleryVideo;

export interface ProjectChapter {
  /** Optional chapter heading — rendered as a small overline label */
  heading?: string;
  /** Narrative body paragraph */
  body: string;
  /** Optional image that accompanies this chapter */
  image?: ChapterImage;
}

// ─── Material Narrative ───────────────────────────────────────────────────────

export interface ProjectMaterial {
  /** Material name — e.g. "Board-formed Concrete" */
  name: string;
  /** Why this material was chosen. 1–2 sentences. */
  rationale: string;
}

// ─── Awards ───────────────────────────────────────────────────────────────────

export interface ProjectAward {
  title: string;
  year: number;
  organization?: string;
}

// ─── Before / After ───────────────────────────────────────────────────────────

export interface BeforeAfterImage {
  before: ImageAsset;
  after: ImageAsset;
  caption?: string;
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export interface ProjectSEO {
  title?: string;
  description?: string;
  ogImage?: ImageAsset;
}

// ─── Coordinates ─────────────────────────────────────────────────────────────

export interface ProjectCoordinates {
  lat: number;
  lng: number;
  label: string;
}

// ─── Legacy Details ───────────────────────────────────────────────────────────

interface ProjectDetails {
  area?: string;
  site?: string;
  materials?: string[];
  sustainability?: string[];
  duration?: string;
  construction?: string;
}

// ─── Project (Primary Interface) ─────────────────────────────────────────────

export interface Project {
  // Identity
  id: string;
  slug: string;
  title: string;
  subtitle?: string;

  // Classification
  category: ProjectCategory[];
  typology?: string[]; // Flexible tags - professional building classifications (optional)
  status: ProjectStatus;
  year: number;

  // Location
  areaM2?: number;
  location: Location;
  coordinates?: ProjectCoordinates;

  // Commission
  client?: string;

  // ── Editorial Storytelling ────────────────────────────────────────────────
  /** The one-sentence central design idea. Displayed at large type before the narrative. */
  concept?: string;

  /** Short description for cards, archive listings, and SEO */
  description: string;

  /** Legacy single-block story. Used as fallback if chapters not provided. */
  story?: string;

  /** Ordered narrative chapter blocks — the monograph heart of the project page */
  chapters?: ProjectChapter[];

  /** Editorial material rationale — why each material was chosen */
  materialNarrative?: ProjectMaterial[];

  /** Brief note on how daylight was used as a design tool */
  lightStrategy?: string;

  /** Brief note on how the building responds to the specific site */
  siteResponse?: string;
  // ──────────────────────────────────────────────────────────────────────────

  // Media
  heroImage: ImageAsset;
  heroVideo?: ProjectHeroVideo;
  gallery: (ChapterImage | ProjectGalleryVideo)[];
  drawings?: ProjectDrawing[];
  beforeAfter?: BeforeAfterImage;

  /** Attribution for the architectural photographer */
  photographerCredit?: string;

  // Team
  team?: ProjectTeam;
  awards?: ProjectAward[];

  // SEO & Meta
  seo?: ProjectSEO;

  // Legacy
  services: string[];
  details?: ProjectDetails;
  featured: boolean;
}

const projects: Project[] = [
  // ─── 01 Casa Monte ──────────────────────────────────────────────────────────
  {
    id: "casa-monte",
    slug: "casa-monte",
    title: "Casa Monte",
    subtitle: "A hillside retreat in the Algarve",
    category: ["architecture", "interior"],
    typology: ["residential"],
    status: "completed",
    year: 2025,
    areaM2: 320,
    location: { city: "Algarve", country: "Portugal" },
    coordinates: { lat: 37.0179, lng: -7.9308, label: "Algarve, Portugal" },
    client: "Private Family Office",
    photographerCredit: "Francisco Nogueira",

    concept:
      "A house that does not resist its site — it follows the contour, opens to the afternoon light, and settles into the land.",

    description:
      "A private residence that negotiates a steep hillside site, opening the interior to the landscape through carefully positioned apertures.",

    story:
      "The site sits on a south-facing slope with views over the Atlantic. Rather than cutting into the hill, the house stretches along the contour, each room oriented to capture the afternoon light. Local stone anchors the volume to the ground; white render and deep overhangs protect the facade from the Mediterranean sun.",

    chapters: [
      {
        heading: "The Brief",
        body: "A family of four needed a home that worked equally well for retreat and for gathering — one that could be quiet and private, or open and connected to the surrounding landscape. The brief was simple: nothing unnecessary.",
      },
      {
        heading: "The Site",
        body: "The south-facing slope presented both a constraint and an opportunity. A building placed perpendicular to the hill would interrupt the view and require significant excavation. Instead, we stretched the programme along the contour — a single linear volume anchored at one end by the hillside and floating free at the other.",
        image: {
          src: "/images/projects/casa-monte-hero.jpg",
          alt: "Casa Monte exterior, south elevation",
          narrative:
            "The long south facade reads as a single horizontal line against the hillside. The deep concrete overhang casts a moving shadow across the render throughout the day, marking the passage of afternoon light without a clock.",
          intent: "design-intent",
          fullBleed: true,
        },
      },
      {
        heading: "Light & Orientation",
        body: "Every aperture was positioned after a study of the sun's path in June and December. Living spaces face south-southwest to receive afternoon light. Bedrooms face east for a gentle morning arrival. The entrance corridor faces north — deliberately shadowed — so that the transition into the living space becomes a moment of revelation.",
      },
      {
        heading: "Interior",
        body: "Inside, the material palette contracts to three elements: the local stone that continues from the exterior, white plaster walls, and warm oak flooring. The intention was a space that would never feel finished or decorated — only present.",
        image: {
          src: "/images/projects/casa-monte-01.jpg",
          alt: "Living room with framed ocean view",
          narrative:
            "The single aperture in the living room was sized precisely to frame the horizon. At 2.4 metres wide and 90 centimetres tall, it sits below eye level when standing — a composition of sea and sky rather than a window.",
          intent: "spatial-experience",
          fullBleed: false,
        },
      },
    ],

    materialNarrative: [
      {
        name: "Local Limestone",
        rationale:
          "Quarried 12 kilometres from the site, the limestone was chosen for its warm ochre tone that reads identically whether dry or wet — a permanence the Mediterranean climate demands of exterior materials.",
      },
      {
        name: "White Hydraulic Lime Render",
        rationale:
          "Traditional mineral render rather than synthetic coating — breathable, repairable, and capable of the slight surface variation that gives the facade depth under raking light.",
      },
      {
        name: "White Oak",
        rationale:
          "European white oak, lightly brushed and oiled, used throughout the interior. The brushing opens the grain without ageing the timber artificially — a surface that will develop honestly over time.",
      },
    ],

    lightStrategy:
      "The building section was designed as a light instrument. A continuous clerestory above the kitchen runs the full length of the north wall, admitting indirect sky light throughout the day. The south apertures are shaded by a 1.2-metre concrete overhang, calibrated to exclude direct sun above 45° elevation — blocking July midday while admitting December afternoon sun.",

    siteResponse:
      "No mature trees were removed. The construction platform was cut in a single pass, preserving the hillside's natural drainage. The garden terracing uses the same limestone as the building, so the cultivated landscape reads as an extension of the architecture rather than a setting for it.",

    heroImage: {
      src: "/images/projects/casa-monte-hero.jpg",
      alt: "Casa Monte exterior view",
    },
    gallery: [
      {
        src: "/images/projects/casa-monte-01.jpg",
        alt: "Living room with ocean view",
        caption: "South-facing living room, afternoon light",
        narrative:
          "The aperture below eye level frames the Atlantic rather than the sky — grounding the interior experience within the landscape rather than above it.",
        intent: "spatial-experience",
        fullBleed: false,
      } as ChapterImage,
      {
        src: "/images/projects/casa-monte-02.jpg",
        alt: "Kitchen and dining area",
        caption: "Kitchen, north clerestory light",
        fullBleed: false,
      } as ChapterImage,
      {
        src: "/images/projects/casa-monte-03.jpg",
        alt: "Master bedroom",
        caption: "East-facing bedroom, morning light",
        fullBleed: true,
      } as ChapterImage,
    ],
    team: {
      partnerInCharge: "Rafael Mendes",
      projectLead: "Sara Costa",
      team: ["Ana Pereira", "Tiago Martins"],
      collaborators: ["Afonsos Engenharia (Structural)", "Luz & Sombra (Lighting)"],
    },
    services: ["architecture", "interior-design"],
    details: {
      area: "320 m²",
      site: "1.2 hectares",
      materials: ["Local stone", "White render", "Oak", "Glass"],
      duration: "24 months",
      construction: "2023 – 2025",
    },
    featured: true,
  },

  // ─── 02 Atelier Norte ───────────────────────────────────────────────────────
  {
    id: "atelier-norte",
    slug: "atelier-norte",
    title: "Atelier Norte",
    subtitle: "A creative workspace in Porto",
    category: ["architecture", "interior", "renovation"],
    typology: ["adaptive-reuse"],
    status: "completed",
    year: 2024,
    areaM2: 180,
    location: { city: "Porto", country: "Portugal" },
    coordinates: { lat: 41.1579, lng: -8.6291, label: "Porto, Portugal" },
    client: "Norte Creative Group",
    photographerCredit: "Simão Ribeiro",

    concept:
      "The building already existed. Our task was not to replace it, but to listen to what remained and build the minimum necessary around it.",

    description: "The renovation of a 19th-century townhouse into a collaborative design studio.",

    story:
      "The brief called for a space that could accommodate a growing team while preserving the character of the original building. We removed later partitions to reveal the original double-height volume, inserting a mezzanine that expands the floor area without closing the room. Existing timber beams are left exposed; the material palette is restrained — concrete, steel, and birch ply.",

    chapters: [
      {
        heading: "The Existing Building",
        body: "The townhouse had been subdivided in the 1970s into apartments — suspended ceilings, plasterboard partitions, and vinyl floors had buried a generous 19th-century shell. A structural survey revealed the original load-bearing stone walls intact, the timber roof structure in good condition, and a double-height rear volume that had been entirely hidden.",
      },
      {
        heading: "The Intervention",
        body: "The decision was made to strip the building back to its structural skeleton and make all new elements clearly legible as additions. The mezzanine is a freestanding steel frame — it touches the existing walls at four points only, never pretending to be original. The concrete floor slab was poured over new underfloor heating, covering the original flagstone which is preserved beneath.",
        image: {
          src: "/images/projects/atelier-norte-hero.jpg",
          alt: "Double-height studio interior showing steel mezzanine",
          narrative:
            "The steel mezzanine lands on four isolated pad foundations — a deliberate gap of 20mm between the new structure and the original masonry. New and old never touch. The joint is the architectural statement.",
          intent: "construction",
          fullBleed: true,
        },
      },
      {
        heading: "Light in a Dense City",
        body: "The building is wedged between party walls with light available only from the street facade and a small rear courtyard. We opened the rear courtyard to the studio through a full-height glazed wall, transforming what was a forgotten utility space into the primary light source for the workspace.",
        image: {
          src: "/images/projects/atelier-norte-02.jpg",
          alt: "Mezzanine level with view to rear courtyard",
          narrative:
            "The rear courtyard — previously accessible only through a service door — becomes the visual anchor of the studio. Its walls are painted white to maximize light reflection into the deep plan.",
          intent: "environmental",
          fullBleed: false,
        },
      },
    ],

    materialNarrative: [
      {
        name: "Exposed Original Masonry",
        rationale:
          "The granite party walls were cleaned of later finishes but not repointed. The raw, uneven surface of the original stone is left visible throughout the studio — a direct connection to the building's 19th-century construction.",
      },
      {
        name: "Mild Steel",
        rationale:
          "The mezzanine structure uses mild steel rather than stainless — a deliberate choice. The material will develop a patina over time, darkening in tone as the studio ages. The building's history will continue to be written on the surfaces.",
      },
      {
        name: "Baltic Birch Ply",
        rationale:
          "Used for worksurfaces, storage, and the stair treads. Birch ply is durable, workable, and honest — a material that architects understand and that clients can see being used with confidence.",
      },
    ],

    lightStrategy:
      "In a dense urban block, light is scarce and directional. The rear courtyard was treated as a light well — its white-painted surfaces reflecting northern sky light deep into the studio plan. The street facade retains its original window rhythm but the glazing bars were removed, maximising the glass area without altering the facade composition.",

    siteResponse:
      "The project does not add to Porto's skyline. It works entirely within the existing building envelope — an internal transformation that is invisible from the street. The facade was cleaned and the original lime render repaired rather than replaced, returning the building to its 19th-century appearance.",

    beforeAfter: {
      before: {
        src: "/images/studio/studio-materials.jpg",
        alt: "Original 19th century derelict townhouse structure before renovation",
      },
      after: {
        src: "/images/projects/atelier-norte-hero.jpg",
        alt: "Transformed double-height studio interior after adaptive reuse",
      },
      caption: "19th-century townhouse — before and after",
    },
    heroImage: {
      src: "/images/projects/atelier-norte-hero.jpg",
      alt: "Atelier Norte studio interior",
    },
    gallery: [
      {
        src: "/images/projects/atelier-norte-01.jpg",
        alt: "Double-height workspace",
        caption: "Ground floor workspace, east light",
        fullBleed: true,
      } as ChapterImage,
      {
        src: "/images/projects/atelier-norte-02.jpg",
        alt: "Mezzanine level",
        caption: "Mezzanine meeting level",
        fullBleed: false,
      } as ChapterImage,
      {
        src: "/images/projects/atelier-norte-03.jpg",
        alt: "Material palette detail",
        caption: "Steel, stone, and birch ply",
        narrative:
          "The three materials — granite, steel, and birch — were selected to be visually honest about their structural role. No material performs anything other than its actual function.",
        intent: "materiality",
        fullBleed: false,
      } as ChapterImage,
    ],
    team: {
      partnerInCharge: "Rafael Mendes",
      projectLead: "Tiago Martins",
      team: ["Ana Pereira"],
      collaborators: ["Norte Reabilitação (Contractor)"],
    },
    services: ["architecture", "interior-design", "renovation"],
    details: {
      area: "180 m²",
      materials: ["Concrete", "Steel", "Birch ply", "Existing timber"],
      duration: "10 months",
      construction: "2023 – 2024",
    },
    featured: true,
  },

  // ─── 03 Villa Marim ─────────────────────────────────────────────────────────
  {
    id: "villa-marim",
    slug: "villa-marim",
    title: "Villa Marim",
    subtitle: "Coastal living on the Ria Formosa",
    category: ["architecture", "landscape"],
    typology: ["residential"],
    status: "completed",
    year: 2025,
    areaM2: 280,
    location: { city: "Algarve", country: "Portugal" },
    coordinates: { lat: 37.0315, lng: -7.8241, label: "Ria Formosa, Portugal" },
    client: "Private Client",
    photographerCredit: "Francisco Nogueira",

    concept:
      "Three pavilions arranged around a shared courtyard — a family home that works like a village, where privacy and gathering are both possible without negotiation.",

    description:
      "A summer house organized around a series of courtyards, blurring the boundary between inside and out.",

    story:
      "The project takes its cue from the vernacular architecture of the Ria Formosa — white volumes, shaded patios, and a porous relationship between interior and landscape. Three pavilions are arranged around a central courtyard, connected by covered walkways. Each pavilion opens fully onto its own garden, allowing the family to occupy the spaces differently throughout the day and across seasons.",

    chapters: [
      {
        heading: "Vernacular Reference",
        body: "The Ria Formosa's historic fishing villages organise their buildings around shared open space — the street, the dock, the square. The pavilion arrangement at Villa Marim borrows this logic: shared space at the centre, private space at the periphery. The courtyard is the centre of gravity.",
      },
      {
        heading: "The Three Pavilions",
        body: "The main living pavilion opens on three sides through floor-to-ceiling sliding panels. The bedroom pavilion is more enclosed, with filtered light through limestone brise-soleil. The guest pavilion, smallest of the three, is entirely independent — entered only from the garden, never from inside the main house.",
        image: {
          src: "/images/projects/villa-marim-hero.jpg",
          alt: "Villa Marim central courtyard, afternoon light",
          narrative:
            "The courtyard is not a garden. It is a room without a roof — paved in limestone, furnished simply, sheltered from the prevailing Atlantic wind by the three enclosing volumes. The family takes most meals here.",
          intent: "spatial-experience",
          fullBleed: true,
        },
      },
      {
        heading: "The Landscape",
        body: "The site drops 1.8 metres from north to south, toward the lagoon. Rather than levelling the ground, the covered walkways follow the slope — a gentle ramp that keeps the building connected to the earth rather than sitting above it. The planting is entirely native: lavender, rosemary, cistus, and wild grass.",
        image: {
          src: "/images/projects/villa-marim-02.jpg",
          alt: "Covered walkway between pavilions",
          narrative:
            "The walkway roofs are continuous with the pavilion overhangs — a single horizontal line at 2.7 metres that unifies the composition. Below, the ground is allowed to find its own level.",
          intent: "site-relationship",
          fullBleed: false,
        },
      },
    ],

    materialNarrative: [
      {
        name: "White Hydraulic Lime Render",
        rationale:
          "The white render is a direct inheritance from the vernacular architecture of the Algarve. It is not decorative — it is thermally functional, reflecting solar radiation in summer while allowing the walls to breathe in all seasons.",
      },
      {
        name: "Alentejo Limestone",
        rationale:
          "Used for all horizontal surfaces — courtyard paving, walkway floors, and the pool surround. The stone is laid in large format to minimise joints, creating a continuous surface that reads as a single plane in the afternoon light.",
      },
      {
        name: "Cork Insulation",
        rationale:
          "Portuguese cork insulates all roof assemblies. No imported petrochemical insulation was used. The material is harvested 200 kilometres north of the site; its carbon footprint is negative throughout its service life.",
      },
    ],

    lightStrategy:
      "The bedroom pavilion faces east-northeast, receiving direct sun only in the morning and remaining cool through the hottest part of the day. The limestone brise-soleil filters this early light, casting a moving grid of shadow across the bedroom floor — a gentle, natural alarm.",

    siteResponse:
      "The lagoon edge was left entirely unbuilt. A 40-metre setback from the water creates a meadow of native grass that acts as a visual buffer between the architecture and the protected natural habitat. The building never competes with the horizon.",

    heroImage: {
      src: "/images/projects/villa-marim-hero.jpg",
      alt: "Villa Marim courtyard",
    },
    gallery: [
      {
        src: "/images/projects/villa-marim-hero.jpg",
        alt: "Central courtyard looking south",
        caption: "The shared courtyard, late afternoon",
        fullBleed: true,
      } as ChapterImage,
      {
        src: "/images/projects/villa-marim-01.jpg",
        alt: "Courtyard view",
        caption: "Limestone paving and white volume",
        fullBleed: false,
      } as ChapterImage,
      {
        src: "/images/projects/villa-marim-02.jpg",
        alt: "Covered walkway",
        caption: "Covered walkway following the slope",
        narrative:
          "The ramp drops 1.8 metres over 22 metres — enough to feel the connection to the ground without requiring steps. Walking between pavilions is walking with the landscape.",
        intent: "site-relationship",
        fullBleed: false,
      } as ChapterImage,
    ],
    team: {
      partnerInCharge: "Sara Costa",
      projectLead: "Rafael Mendes",
      team: ["Ana Pereira"],
    },
    services: ["architecture", "landscape-design"],
    details: {
      area: "280 m²",
      site: "0.8 hectares",
      materials: ["White render", "Limestone", "Cork", "Glass"],
      duration: "20 months",
      construction: "2023 – 2025",
    },
    featured: true,
  },

  // ─── 04 Baía House ──────────────────────────────────────────────────────────
  {
    id: "baia-house",
    slug: "baia-house",
    title: "Baía House",
    subtitle: "Reimagining a mid-century villa",
    category: ["renovation", "interior"],
    typology: ["adaptive-reuse"],
    status: "completed",
    year: 2024,
    areaM2: 200,
    location: { city: "Lisbon", country: "Portugal" },
    coordinates: { lat: 38.7223, lng: -9.1393, label: "Lisbon Hills, Portugal" },
    client: "Private Client",
    photographerCredit: "Clara Monteiro",

    concept:
      "Respect the original architect's intelligence. Correct what decades of alteration had obscured. Add only what the building was always missing.",

    description: "A sensitive renovation of a mid-century modern villa in the hills above Lisbon.",

    story:
      "The original house was designed in 1962 by a student of Francisco Keil do Amaral. Our task was to update it for contemporary living while respecting the spirit of the original design. We restored the original cedar brise-soleil, opened the kitchen to the garden, and introduced a warm material palette of terracotta, oak, and linen.",

    chapters: [
      {
        heading: "The Original House",
        body: "Designed in 1962, the villa expressed a confident mid-century modernism: flat roofs, horizontal cedar brise-soleil, and an open plan that was progressive for its time. Later owners had closed the kitchen, painted the cedar, and tiled over the original terrazzo floors. By 2022, the character of the original design was barely legible.",
      },
      {
        heading: "The Restoration Logic",
        body: "Before any new design work began, we commissioned a historical survey to identify every original element that had survived. The survey found the floor terrazzo intact under vinyl, the cedar brise-soleil structurally sound beneath layers of paint, and the original floor plan preserved in a 1964 construction drawing held by the Lisbon municipal archive.",
        image: {
          src: "/images/projects/baia-house-hero.jpg",
          alt: "Baía House exterior with restored cedar brise-soleil",
          narrative:
            "The cedar brise-soleil was stripped of paint by hand, preserving the original tongue-and-groove joints. The wood was treated with a single coat of natural tung oil — nothing that would seal the grain or alter the silver-grey patina it had developed over 60 years.",
          intent: "materiality",
          fullBleed: true,
        },
      },
      {
        heading: "What We Added",
        body: "The kitchen was relocated to the rear of the plan, opened to the garden through a new frameless glazed wall. This was the one addition the original plan had always needed — a direct connection between cooking, eating, and the garden that the 1962 brief had not included. Every other addition was a subtraction: removing later walls, removing false ceilings, removing paint.",
      },
    ],

    materialNarrative: [
      {
        name: "Original Terrazzo",
        rationale:
          "The existing terrazzo — found beneath 40 years of vinyl flooring — was restored by a specialist craftsman using the original aggregate mix. The restored floor is indistinguishable from the original; only the areas where the vinyl had caused moisture damage were re-cast.",
      },
      {
        name: "Terracotta",
        rationale:
          "New terracotta was introduced in the kitchen and bathrooms as a counterpoint to the terrazzo — warmer, more tactile, and clearly contemporary. The tone was matched to the garden's clay soil, rooting the interior in the hillside landscape.",
      },
      {
        name: "Linen",
        rationale:
          "All soft furnishings use undyed natural linen. The material ages and softens with use, developing a patina that echoes the timber, terrazzo, and clay that surround it.",
      },
    ],

    lightStrategy:
      "The original cedar brise-soleil was designed to block summer sun above 55° elevation on the west facade. The restoration preserved this geometry exactly. The result is a west-facing living room that receives warm afternoon light in autumn and winter but remains shaded and cool during the summer.",

    siteResponse:
      "The garden is on a steep slope below the house. Rather than terracing for a flat lawn, the garden was replanted with native hillside species — cistus, lavender, and wild olive — that require no irrigation and provide a natural visual screen from the street below.",

    heroImage: {
      src: "/images/projects/baia-house-hero.jpg",
      alt: "Baía House exterior with brise-soleil",
    },
    gallery: [
      {
        src: "/images/projects/baia-house-hero.jpg",
        alt: "West facade, restored cedar brise-soleil",
        caption: "Restored mid-century facade",
        fullBleed: true,
      } as ChapterImage,
      {
        src: "/images/projects/baia-house-01.jpg",
        alt: "Living room with restored terrazzo",
        caption: "Living room, original terrazzo restored",
        narrative:
          "The terrazzo was poured in 1962. The aggregate — small fragments of local marble and pink quartz — remains the same. The restored sections are invisible to any eye that does not already know where they are.",
        intent: "materiality",
        fullBleed: false,
      } as ChapterImage,
    ],
    team: {
      partnerInCharge: "Rafael Mendes",
      projectLead: "Sara Costa",
      team: ["Tiago Martins"],
    },
    services: ["architecture", "interior-design", "renovation"],
    details: {
      area: "200 m²",
      materials: ["Terracotta", "Oak", "Linen", "Cedar"],
      duration: "14 months",
      construction: "2023 – 2024",
    },
    featured: false,
  },

  // ─── 05 Largo Gallery ───────────────────────────────────────────────────────
  {
    id: "largo-gallery",
    slug: "largo-gallery",
    title: "Largo Gallery",
    subtitle: "A contemporary art space in a historic palace",
    category: ["architecture", "interior"],
    typology: ["cultural"],
    status: "completed",
    year: 2026,
    areaM2: 350,
    location: { city: "Lisbon", country: "Portugal" },
    coordinates: { lat: 38.7105, lng: -9.1415, label: "Chiado, Lisbon" },
    client: "Largo Arts Foundation",
    photographerCredit: "Simão Ribeiro",

    concept:
      "Art and architecture in conversation — neither one subservient. A gallery that exists as a guest inside a palace, never forgetting whose house it is.",

    description:
      "A contemporary art gallery inserted into the ground floor of a 17th-century palace.",

    story:
      "The challenge was to create a neutral exhibition space within a building with strong existing character. We designed a series of freestanding white volumes within the original rooms, creating a gallery-within-a-palace. The interstitial spaces — between the old walls and the new volumes — become circulation and contemplation areas. The project explores the tension between preservation and intervention.",

    chapters: [
      {
        heading: "The Palace",
        body: "The 17th-century palace had been used as government offices for 80 years. The ground floor rooms — vaulted ceilings, painted azulejo dados, and original stone floors — were intact but inaccessible to the public. The brief required an art programme that would open these spaces without compromising them.",
      },
      {
        heading: "The Gallery Strategy",
        body: "The solution was a series of freestanding white volumes: self-contained exhibition rooms placed within the existing rooms. Each volume is slightly smaller than the room it occupies, creating a gap between the new wall and the old that becomes a corridor, a threshold, or a moment of pause. From inside the white volumes, the palace walls and vaults are invisible. From outside, the palace remains intact.",
        image: {
          src: "/images/projects/largo-gallery-hero.jpg",
          alt: "Freestanding white volume inside vaulted palace room",
          narrative:
            "The gap between the new white volume and the 17th-century wall is exactly 60 centimetres — wide enough to walk through, narrow enough to create intimacy. This corridor is not a service space; it is a deliberate architectural threshold between the contemporary and the historical.",
          intent: "design-intent",
          fullBleed: true,
        },
      },
      {
        heading: "The Detail of Reversibility",
        body: "The freestanding volumes are bolted to the existing stone floor — not embedded. The electrical conduit runs within the new walls only. The climate control system serves only the new volumes, not the original rooms. Every element can be removed without leaving a trace on the palace fabric. In 50 years, if the brief changes, the palace will be as it was.",
      },
    ],

    materialNarrative: [
      {
        name: "White Plaster",
        rationale:
          "The gallery volumes are finished in a warm white plaster — not pure brilliant white, which would compete with the azulejo tiles and painted ceilings of the palace. The slight cream cast makes the new volumes feel deliberate rather than clinical.",
      },
      {
        name: "Felt Acoustic Panels",
        rationale:
          "Dark grey compressed felt panels line the interior ceilings of the gallery volumes, absorbing sound and preventing the hard reflections that would disturb both the art and the visitor. The felt reads as shadow against the white walls — a material choice made from acoustic necessity that also carries visual weight.",
      },
    ],

    lightStrategy:
      "The palace windows were retained but covered by translucent polycarbonate panels inside the new gallery volumes — admitting diffused daylight without glare or UV damage to the artworks. The exhibition lighting within the volumes is entirely artificial and adjustable, independent of the natural light condition.",

    siteResponse:
      "The building sits on a protected street in Chiado. No exterior modifications were made — the facade, entrance doors, and street relationship are entirely unchanged. The gallery can only be understood from inside.",

    beforeAfter: {
      before: {
        src: "/images/journal/material-stories-concrete.jpg",
        alt: "17th Century palace vaulting prior to restoration and conversion",
      },
      after: {
        src: "/images/projects/largo-gallery-hero.jpg",
        alt: "Contemporary white gallery volume inserted into historic vaulted space",
      },
      caption: "The existing palace — and the completed gallery",
    },
    heroImage: {
      src: "/images/projects/largo-gallery-hero.jpg",
      alt: "Largo Gallery interior",
    },
    gallery: [
      {
        src: "/images/projects/largo-gallery-hero.jpg",
        alt: "Gallery volume inside vaulted room",
        caption: "New volume within the historic vault",
        fullBleed: true,
      } as ChapterImage,
      {
        src: "/images/projects/largo-gallery-01.jpg",
        alt: "Exhibition space interior",
        caption: "Exhibition space, diffused daylight",
        narrative:
          "Inside the gallery volume, the 17th-century palace is invisible. The space is neutral, quiet, and entirely focused on the art. The transition from palace to gallery takes only a step.",
        intent: "spatial-experience",
        fullBleed: false,
      } as ChapterImage,
    ],
    team: {
      partnerInCharge: "Rafael Mendes",
      projectLead: "Ana Pereira",
      team: ["Sara Costa", "Tiago Martins"],
    },
    awards: [
      {
        title: "Architecture Prize — Cultural Category",
        year: 2026,
        organization: "Ordem dos Arquitectos",
      },
    ],
    services: ["architecture", "interior-design", "visualization"],
    details: {
      area: "350 m²",
      materials: ["White plaster", "Limestone", "Steel", "Felt"],
      duration: "18 months",
      construction: "2024 – 2026",
    },
    featured: false,
  },

  // ─── 06 Studio Patio ────────────────────────────────────────────────────────
  {
    id: "studio-patio",
    slug: "studio-patio",
    title: "Studio Patio",
    subtitle: "An architect's own workspace",
    category: ["architecture"],
    typology: ["commercial"],
    status: "completed",
    year: 2023,
    areaM2: 65,
    location: { city: "Porto", country: "Portugal" },
    coordinates: { lat: 41.1496, lng: -8.611, label: "Ribeira, Porto" },
    client: "RAFA Design Hub",
    photographerCredit: "Simão Ribeiro",

    concept:
      "The patio was already there. We built the studio around it rather than replacing it — the open sky is the most important element in the room.",

    description: "A small studio built around an existing patio in Porto's historic centre.",

    story:
      "This was our own studio — a narrow plot in the historic centre with a derelict structure and an overgrown patio. We kept the patio as the heart of the project, building two simple volumes around it: a workspace and a meeting room. The patio provides natural light, ventilation, and a visual connection to the sky throughout the day.",

    chapters: [
      {
        heading: "The Site",
        body: "A derelict narrow-fronted building in the historic Ribeira district. The existing structure was beyond repair — but the patio at the rear, approximately 18 square metres, was overgrown and forgotten beneath collapsed roofing. The first design decision was to treat the patio as the given and build the studio in response to it.",
      },
      {
        heading: "The Two Volumes",
        body: "The workspace occupies the street-facing volume: a single deep room with a north-facing clerestory that provides consistent, shadowless light for drawing work. The meeting room occupies a smaller volume perpendicular to the workspace, opening through a full-height sliding door onto the patio. Neither volume is larger than it needs to be.",
        image: {
          src: "/images/projects/studio-patio-hero.jpg",
          alt: "Studio Patio — view from workspace into patio",
          narrative:
            "The patio is visible from every point in the studio. Even from the most enclosed corner of the workspace, the sky is present — a reminder that this is a practice that works with the outdoor world.",
          intent: "spatial-experience",
          fullBleed: true,
        },
      },
      {
        heading: "Building Our Own Studio",
        body: "Designing one's own workspace is the most revealing architectural exercise. There are no clients to negotiate with, no brief to compromise against — only the unfiltered question of what environment produces the best thinking. The answer, for us, was small, quiet, and connected to the outside.",
        image: {
          src: "/images/projects/studio-patio-01.jpg",
          alt: "Workspace interior with natural light",
          narrative:
            "The north clerestory eliminates direct sun from the workspace entirely — important for screen work and for consistent colour rendering when reviewing drawings and material samples.",
          intent: "environmental",
          fullBleed: false,
        },
      },
    ],

    materialNarrative: [
      {
        name: "Polished Concrete",
        rationale:
          "The floor and one wall of the workspace are poured concrete — thermally massive, easy to clean, and a neutral background for architectural models, samples, and drawings. The mass helps regulate temperature in the narrow urban building.",
      },
      {
        name: "Existing Granite",
        rationale:
          "The patio walls are the original granite of the historic building — consolidated rather than rebuilt. The texture of the old stone, worn by weather and time, is a daily reminder of the district's age and permanence.",
      },
    ],

    lightStrategy:
      "The north-facing clerestory provides shadow-free, consistent light throughout the workday — ideal for architectural work. The south-facing patio reflects warm afternoon light into the meeting room. The studio experiences light in two entirely different registers: cool and consistent in the workspace; warm and changing in the meeting room.",

    siteResponse:
      "The building sits within a UNESCO World Heritage zone. All new elements are set behind the historic street line. The facade reads as a restoration of the original narrow-fronted building; the patio and new volumes are entirely invisible from the street.",

    heroImage: {
      src: "/images/projects/studio-patio-hero.jpg",
      alt: "Studio Patio courtyard",
    },
    gallery: [
      {
        src: "/images/projects/studio-patio-hero.jpg",
        alt: "View from workspace into patio",
        caption: "The patio — heart of the studio",
        fullBleed: true,
      } as ChapterImage,
      {
        src: "/images/projects/studio-patio-01.jpg",
        alt: "Workspace interior",
        caption: "Workspace, north clerestory light",
        fullBleed: false,
      } as ChapterImage,
      {
        src: "/images/projects/studio-patio-02.jpg",
        alt: "Patio view upward to sky",
        caption: "Looking up from the patio",
        narrative:
          "From the patio, the sky is framed by four walls — a composition that changes with weather, season, and hour. This is the studio's most important window.",
        intent: "spatial-experience",
        fullBleed: false,
      } as ChapterImage,
    ],
    team: {
      partnerInCharge: "Rafael Mendes",
      projectLead: "Sara Costa",
      team: ["Ana Pereira", "Tiago Martins"],
    },
    services: ["architecture"],
    details: {
      area: "65 m²",
      site: "90 m²",
      materials: ["Concrete", "Glass", "Steel", "Existing stone"],
      duration: "8 months",
      construction: "2022 – 2023",
    },
    featured: false,
  },
];

const allCategories: ProjectCategory[] = [
  "architecture",
  "interior",
  "landscape",
  "urban-design",
  "master-planning",
  "research",
  "renovation",
  "visualization",
];

export function getProjects(): Project[] {
  return [...projects].sort((a, b) => b.year - a.year);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectByTitle(title: string): Project | undefined {
  const normalized = title.trim().toLowerCase();
  return projects.find((p) => p.title.trim().toLowerCase() === normalized);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category.includes(category));
}

export function getCategories(): ProjectCategory[] {
  return allCategories;
}

export function getActiveCategories(): ProjectCategory[] {
  const active = new Set<ProjectCategory>();
  projects.forEach((p) => p.category.forEach((c) => active.add(c)));
  return allCategories.filter((c) => active.has(c));
}

export function getRelatedProjects(project: Project, count = 3): Project[] {
  // Score every other project by shared typology, categories, and location
  const scored = projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => {
      let score = 0;
      // Matching Typology gets highest weight (+3)
      if (p.typology && project.typology && p.typology === project.typology) {
        score += 3;
      }
      // Shared Discipline/Category (+2 per match)
      const sharedCategories = p.category.filter((c) => project.category.includes(c));
      score += sharedCategories.length * 2;
      // Matching Country (+1)
      if (p.location.country === project.location.country) {
        score += 1;
      }
      return { project: p, score };
    })
    .sort((a, b) => b.score - a.score || b.project.year - a.project.year);

  // Take top scored matching projects
  const topMatches = scored.filter((item) => item.score > 0).map((item) => item.project);

  // If fewer than count matches, backfill with remaining newest projects
  if (topMatches.length >= count) {
    return topMatches.slice(0, count);
  }

  const existingSlugs = new Set(topMatches.map((p) => p.slug));
  existingSlugs.add(project.slug);

  const fallback = projects
    .filter((p) => !existingSlugs.has(p.slug))
    .sort((a, b) => b.year - a.year);

  return [...topMatches, ...fallback].slice(0, count);
}
