import type { ImageAsset, SocialLink } from "@/content/types";

/**
 * A secondary role or affiliation a team member holds outside of RAFA.
 * Used to communicate credibility and wider industry presence.
 */
export interface OtherRole {
  title: string; // e.g. "Junior Architect"
  company: string; // e.g. "Foster + Partners Lisbon"
  location?: string; // e.g. "Lisbon, Portugal"
}

export interface TeamMember {
  id: string;
  name: string;
  role: string; // Their role at RAFA Design Hub
  biography: string; // Short editorial bio / personal story
  image: ImageAsset;
  disciplines?: string[];
  experience?: number; // Years of experience
  interests?: string[];
  socialLinks?: SocialLink[]; // Instagram, LinkedIn, website, etc.
  email?: string | undefined; // Direct contact email
  phone?: string | undefined; // Direct contact phone
  otherRoles?: OtherRole[] | undefined; // Roles at other studios, universities, etc.
}

export interface Award {
  title: string;
  organization: string;
  year: number;
  project?: string;
  citation?: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface StudioPrinciple {
  code: string;
  title: string;
  statement: string;
}

export interface WorkingMethod {
  code: string;
  title: string;
  description: string;
}

export interface ClientSector {
  code: string;
  title: string;
  description: string;
  projects?: string[];
  collaborators?: string[];
  clients?: string[];
}

export interface Studio {
  name: string;
  overline: string;
  manifesto: string;
  introduction: string;
  philosophy: string;
  beliefs: StudioPrinciple[];
  workingMethods: WorkingMethod[];
  history?: string;
  images: ImageAsset[];
  visit: {
    overline: string;
    heading: string;
    body: string;
    visits: string;
  };
}

export const studioContent: Studio = {
  name: "RAFA Design Hub",
  overline: "Architecture & Interior Design // Porto",
  manifesto:
    "We build less, better. Architecture begins with subtraction — removing until only what is essential remains.",
  introduction:
    "RAFA Design Hub is an architecture and interior design studio founded on the belief that the spaces we inhabit shape how we live, work, and connect. Every project is a dialogue between the built and the natural, the permanent and the ephemeral.",
  philosophy:
    "We approach every project as a dialogue between the built and the natural, the permanent and the ephemeral. Our work is rooted in context — the land, the light, the culture, and the people who will occupy the space. We believe in subtraction — the discipline of removing rather than adding — until only what is essential remains.",
  beliefs: [
    {
      code: "PRINCIPLE 01",
      title: "Context",
      statement:
        "The land, the light, the climate, the culture — we design from the site outward, never from a style inward.",
    },
    {
      code: "PRINCIPLE 02",
      title: "Materiality",
      statement:
        "Honest materials age with the building. Wood patinas, stone weathers, and concrete records its making.",
    },
    {
      code: "PRINCIPLE 03",
      title: "Light",
      statement:
        "Light is the first material. We shape spaces around its movement across the day and the seasons.",
    },
    {
      code: "PRINCIPLE 04",
      title: "Craft",
      statement:
        "Every junction, joint, and threshold is a decision. Detailing is not the finish of the design — it is the design.",
    },
    {
      code: "PRINCIPLE 05",
      title: "Clarity",
      statement:
        "A building should be legible at first glance and reveal more with time. Simplicity is complexity resolved.",
    },
  ],
  workingMethods: [
    {
      code: "METHOD 01",
      title: "Model Making",
      description:
        "Every project begins as a physical object. Study models are built early and tested by hand — mass, proportion, and light resolved in three dimensions before they are drawn.",
    },
    {
      code: "METHOD 02",
      title: "Material Research",
      description:
        "A material library is assembled for every project — stone, timber, metal, textiles. Samples are selected by hand, on site, in real light.",
    },
    {
      code: "METHOD 03",
      title: "Design Review",
      description:
        "The studio critiques in the open. Weekly reviews at the model table — every decision defended, tested, or revised.",
    },
    {
      code: "METHOD 04",
      title: "Site & Construction",
      description:
        "Architecture is completed on site, not in the office. We supervise construction, test mock-ups, and refine details against real hands and real light.",
    },
  ],
  history:
    "Founded in 2018, the studio began as a small practice focused on residential projects in northern Portugal. Over the years, our work has expanded across the country and into new typologies — commercial, cultural, and interior — while maintaining the same principles of material honesty and spatial clarity.",
  images: [
    {
      src: "/images/studio/studio-atelier.jpg",
      alt: "The RAFA Design Hub studio in Porto",
      caption: "The atelier in Porto's historic centre",
    },
    {
      src: "/images/studio/studio-materials.jpg",
      alt: "Material samples and models in the studio",
      caption: "Material samples and study models at the work table",
    },
  ],
  visit: {
    overline: "The Studio // Porto",
    heading: "The studio is open — to the work and to those who commission it.",
    body: "Conversations begin informally. Write to us, or visit the atelier in Porto's historic centre, where the practice lives beside its models and its material library.",
    visits: "Studio visits by appointment",
  },
};

export const teamMembers: TeamMember[] = [
  {
    id: "rafael-mendes",
    name: "Rafael Mendes",
    role: "Founder & Lead Architect",
    experience: 18,
    disciplines: ["Architecture", "Master Planning"],
    interests: ["Monolithic form", "Stone construction", "Site-specific massing"],
    biography:
      "Rafael founded RAFA Design Hub in 2018 after a decade working with respected practices in Lisbon and London. His work is shaped by a deep interest in how architecture mediates between people and the natural environment.",
    image: { src: "/images/team/rafael-mendes.jpg", alt: "Rafael Mendes" },
    email: "rafael@rafadesign.pt",
    phone: "+351 912 000 001",
    socialLinks: [
      { platform: "linkedin", url: "#" },
      { platform: "instagram", url: "#" },
      { platform: "website", url: "#", label: "Portfolio" },
    ],
    otherRoles: [
      {
        title: "Guest Critic",
        company: "Faculdade de Arquitectura da Universidade do Porto",
        location: "Porto, Portugal",
      },
    ],
  },
  {
    id: "sara-costa",
    name: "Sara Costa",
    role: "Senior Architect",
    experience: 12,
    disciplines: ["Architecture", "Landscape Integration"],
    interests: ["Topography", "Native planting", "Threshold spaces"],
    biography:
      "Sara brings a background in landscape architecture to every project, ensuring that buildings and their surroundings are conceived as a single, integrated system.",
    image: { src: "/images/team/sara-costa.jpg", alt: "Sara Costa" },
    email: "sara@rafadesign.pt",
    phone: "+351 912 000 002",
    socialLinks: [
      { platform: "linkedin", url: "#" },
      { platform: "website", url: "#", label: "Portfolio" },
    ],
    otherRoles: [{ title: "Architect", company: "Atelier Bugio", location: "Lisboa, Portugal" }],
  },
  {
    id: "tiago-martins",
    name: "Tiago Martins",
    role: "Interior Designer",
    experience: 8,
    disciplines: ["Interior Design"],
    interests: ["Materiality", "Texture", "Sensory atmosphere"],
    biography:
      "Tiago leads the interior design practice, focusing on materiality, texture, and the sensory experience of space. He believes interiors should feel like they have grown out of the architecture.",
    image: { src: "/images/team/tiago-martins.jpg", alt: "Tiago Martins" },
    email: "tiago@rafadesign.pt",
    socialLinks: [
      { platform: "instagram", url: "#" },
      { platform: "linkedin", url: "#" },
      { platform: "pinterest", url: "#" },
    ],
  },
  {
    id: "ana-pereira",
    name: "Ana Pereira",
    role: "Architect & Project Lead",
    experience: 10,
    disciplines: ["Architecture", "Project Delivery"],
    interests: ["Precision detailing", "Site supervision", "Construction logic"],
    biography:
      "Ana manages the studio's project delivery, bringing rigorous attention to detail and a collaborative approach that keeps clients engaged throughout the design and construction process.",
    image: { src: "/images/team/ana-pereira.jpg", alt: "Ana Pereira" },
    email: "ana@rafadesign.pt",
    phone: "+351 912 000 004",
    socialLinks: [{ platform: "linkedin", url: "#" }],
    otherRoles: [
      { title: "Junior Project Architect", company: "OODA", location: "Porto, Portugal" },
      { title: "Architecture Tutor", company: "Universidade Lusíada", location: "Porto, Portugal" },
    ],
  },
];

export const awards: Award[] = [
  {
    title: "ArchDaily Building of the Year",
    organization: "ArchDaily",
    year: 2025,
    project: "Casa Monte",
    citation:
      "Awarded for the resolution of a monolithic stone volume within its coastal landscape.",
  },
  {
    title: "European Architecture Prize — Honourable Mention",
    organization: "European Centre for Architecture",
    year: 2024,
    project: "Atelier Norte",
    citation:
      "Recognised for the adaptive transformation of a 19th-century workshop into a working atelier.",
  },
  {
    title: "Best Residential Project",
    organization: "Portuguese Architecture Awards",
    year: 2024,
    project: "Villa Marim",
    citation:
      "Awarded for the restraint of its material palette and the quiet orchestration of light.",
  },
  {
    title: "Emerging Practice of the Year",
    organization: "Architectural Review",
    year: 2023,
    citation:
      "Selected among Europe's emerging practices for the coherence of the studio's built work.",
  },
];

export const timelineIntro =
  "From a two-person atelier in Porto to cultural projects across the country — the practice has grown around the same principles.";

export const timeline: TimelineEvent[] = [
  {
    year: 2018,
    title: "Studio Founded",
    description: "RAFA Design Hub established in Porto, focused on residential architecture.",
  },
  {
    year: 2020,
    title: "First International Project",
    description:
      "Completed our first project outside Portugal — a private residence in Galicia, Spain.",
  },
  {
    year: 2022,
    title: "Studio Patio Completed",
    description:
      "Moved into our own studio space — a renovation of a 19th-century building in Porto's historic centre.",
  },
  {
    year: 2023,
    title: "Interior Design Practice Launched",
    description: "Formalised the interior design practice under Tiago Martins' leadership.",
  },
  {
    year: 2025,
    title: "Casa Monte Awarded",
    description:
      "Casa Monte recognised as ArchDaily Building of the Year, marking the studio's growing international recognition.",
  },
  {
    year: 2026,
    title: "Largo Gallery Completed",
    description:
      "Opened our largest cultural project to date — a contemporary gallery in a 17th-century Lisbon palace.",
  },
];

export const clientSectors: ClientSector[] = [
  {
    code: "SECTOR 01",
    title: "Private Residences",
    description: "Homes designed from the site outward, across Portugal and Spain.",
    projects: ["Casa Monte", "Villa Marim", "Baía House"],
    clients: ["Private Clients", "Family Estates"],
    collaborators: ["Atelier Bugio", "Souto de Moura Engineering"],
  },
  {
    code: "SECTOR 02",
    title: "Commercial & Workspaces",
    description: "Working environments shaped for their users and their urban context.",
    projects: ["Atelier Norte", "Studio Patio"],
    clients: ["Norte Creative Group", "Patio Co-Working"],
    collaborators: ["OODA Associates"],
  },
  {
    code: "SECTOR 03",
    title: "Cultural",
    description: "Public rooms and institutions conceived for collective life.",
    projects: ["Largo Gallery"],
    clients: ["Lisbon Cultural Heritage Foundation"],
    collaborators: ["Largo Conservation Workshop"],
  },
  {
    code: "SECTOR 04",
    title: "Hospitality & Retail",
    description: "Spaces of exchange, materially grounded and built to endure.",
    clients: ["Douro Boutique Hotels Group"],
  },
];

export const clientReferencesNote = "Full client references available on request.";
