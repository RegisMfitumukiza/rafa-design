import type { ImageAsset } from "@/content/types";

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  order: number;
  duration?: string;
  deliverables?: string[];
  visual?: ImageAsset;
}

export interface ProcessPageContent {
  overline?: string;
  title?: string;
  description?: string;
  heroImage?: ImageAsset;
  steps?: ProcessStep[];
  proof?: {
    overline?: string;
    heading?: string;
    body?: string;
    actionText?: string;
    actionUrl?: string;
  };
  cta?: {
    overline?: string;
    heading?: string;
    body?: string;
    action?: string;
    actionUrl?: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
}

const steps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery",
    description:
      "Every project begins with listening. We meet with clients, visit the site, and study the context — the light, the topography, the surrounding architecture, and the local climate. This phase establishes the brief, the budget, and the core aspirations that will guide every decision that follows.",
    order: 1,
    duration: "2 – 4 weeks",
    deliverables: ["Site Analysis", "Client Brief", "Feasibility Study"],
  },
  {
    id: "concept",
    title: "Concept",
    description:
      "Armed with a deep understanding of the site and the brief, we develop the architectural narrative. Sketches, study models, and reference material converge into a clear design direction. We present the concept through drawings, collages, and spatial diagrams that communicate the atmosphere and intent of the project.",
    order: 2,
    duration: "4 – 8 weeks",
    deliverables: ["Concept Drawings", "Spatial Diagrams", "Material Direction"],
    visual: {
      src: "/images/process/concept-sketch.jpg",
      alt: "Concept sketch of a coastal residence",
      caption: "Conceptual spatial diagram and massing study",
    },
  },
  {
    id: "design-development",
    title: "Design Development",
    description:
      "The concept is refined into a detailed architectural proposal. Plans, sections, and elevations are drawn at scale. Materials are selected, tested, and specified. We work closely with engineers, consultants, and artisans to ensure every detail is considered before construction begins.",
    order: 3,
    duration: "8 – 16 weeks",
    deliverables: ["Plans & Sections", "Material Specifications", "Consultant Coordination"],
  },
  {
    id: "documentation",
    title: "Documentation",
    description:
      "Comprehensive construction drawings and specifications are prepared. This phase translates the design into precise instructions for builders — from structural details to joinery schedules, from lighting layouts to landscape plans. Every dimension, every junction, every material is resolved.",
    order: 4,
    duration: "6 – 12 weeks",
    deliverables: ["Construction Drawings", "Joinery Schedules", "Lighting Layouts"],
  },
  {
    id: "construction",
    title: "Construction",
    description:
      "During construction, we visit the site regularly to ensure the work matches the intent. We review samples, coordinate with contractors, and resolve the inevitable questions that arise when a design becomes a building. This phase is a dialogue — between the drawings, the site, and the hands that build.",
    order: 5,
    duration: "12 – 52 weeks",
    deliverables: ["Site Reviews", "Sample Approvals", "Contractor Coordination"],
    visual: {
      src: "/images/process/site-visit.jpg",
      alt: "Site visit during construction",
      caption: "Site observation and structural junction review",
    },
  },
  {
    id: "completion",
    title: "Completion",
    description:
      "A building is never truly finished — it begins its life when people inhabit it. We document the completed work, gather feedback, and stay connected with our clients long after the handover. Many of our projects lead to new ones, as spaces evolve and families grow.",
    order: 6,
    duration: "2 – 4 weeks",
    deliverables: ["Handover Dossier", "As-Built Records", "Post-Occupancy Review"],
  },
];

/**
 * Hero plate for the process page — "work in progress".
 *
 * Reuses the studio atelier's material samples and study models so the lead
 * image means exactly that: ideas still becoming buildings.
 */
export const processHero: ImageAsset = {
  src: "/images/studio/studio-materials.jpg",
  alt: "Material samples and models in the studio",
  caption: "Material samples and study models at the work table",
};

export function getProcessSteps(): ProcessStep[] {
  return steps;
}
