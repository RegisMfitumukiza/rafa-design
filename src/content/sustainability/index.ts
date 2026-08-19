import type { ImageAsset } from "@/content/types";

export interface SustainabilityCommitment {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface SustainabilityContent {
  manifesto: {
    overline: string;
    heading: string;
    body: string;
  };
  philosophy: {
    heading: string;
    body: string;
  };
  materialImage?: ImageAsset;
  commitments: SustainabilityCommitment[];
  principles: string[];
  certifications: { name: string; description: string }[];
  collaboration: {
    heading: string;
    body: string;
    cta: string;
  };
}

export const sustainabilityContent: SustainabilityContent = {
  manifesto: {
    overline: "Our Responsibility",
    heading: "Architecture that endures — for people and for the planet.",
    body: "Every project is an act of permanence. We consider environmental responsibility not as an additional layer applied to architecture, but as part of the architectural decision-making process from the beginning.",
  },
  philosophy: {
    heading: "Good architecture is inherently sustainable.",
    body: "We believe the most sustainable building is one that is loved and cared for across generations. Longevity is the foundation of our practice. We design with materials that age well, spaces that can adapt, and structures that do not demand replacement. Good architecture, honestly made, is inherently an act of sustainability.",
  },
  materialImage: {
    src: "/images/studio/studio-materials.jpg",
    alt: "Natural material samples — stone, timber, and concrete — laid out at the RAFA Design studio work table",
    caption: "Material samples at the studio table",
    width: 1600,
    height: 900,
  },
  commitments: [
    {
      id: "materials",
      number: "01",
      title: "Material Honesty",
      description:
        "We specify natural, durable materials — stone, timber, concrete, and metal — selected for their provenance, longevity, and capacity to age with dignity rather than deteriorate. We favour local quarries and regional suppliers wherever possible, reducing embodied carbon while supporting the material cultures of the places we build.",
    },
    {
      id: "energy",
      number: "02",
      title: "Passive Design First",
      description:
        "Every project begins with orientation, ventilation, and daylight. We design buildings that work with the climate — capturing winter sun, providing summer shade, encouraging natural cross-ventilation — before specifying mechanical systems. Our goal is to reduce energy demand at source, not simply offset consumption.",
    },
    {
      id: "longevity",
      number: "03",
      title: "Designed to Last",
      description:
        "We resist the short-term. Our buildings are designed with generous floor-to-ceiling heights, structural clarity, and spatial flexibility — so that rooms can change purpose as needs evolve without demolition or reconstruction. Adaptability is the most underrated form of sustainability in architecture.",
    },
    {
      id: "community",
      number: "04",
      title: "Community & Place",
      description:
        "Responsible architecture must be accountable to the communities in which it is built. We engage with local craftspeople, builders, and makers — bringing skill into our projects, supporting regional economies, and creating work that belongs to its place rather than being imposed upon it.",
    },
  ],
  principles: [
    "Use materials only once, and use them well.",
    "Design for the next hundred years, not the next ten.",
    "The best environmental decision is often no building at all.",
    "Renovation before demolition. Adaptation before replacement.",
    "A building in service is a building that endures.",
  ],
  certifications: [
    {
      name: "BREEAM",
      description: "Building Research Establishment Environmental Assessment Method",
    },
    {
      name: "Passive House",
      description: "International Passive House Association standard",
    },
    {
      name: "LEED",
      description: "Leadership in Energy and Environmental Design",
    },
  ],
  collaboration: {
    heading: "Sustainable architecture starts with the brief.",
    body: "If environmental responsibility is important to your project, we would love to talk about how we can build it into the design from day one.",
    cta: "Start a conversation",
  },
};
