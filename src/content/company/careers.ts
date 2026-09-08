export type PositionType = "full-time" | "internship" | "contract";

export interface CareerPosition {
  id: string;
  title: string;
  discipline?: string;
  location: string;
  type: PositionType;
  description: string;
  requirements: string[];
  applicationLink?: string; // Optional external application link (Google Forms, Typeform, etc.)
}

export interface Benefit {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface CareersContent {
  hero: {
    overline: string;
    heading: string;
    body: string;
  };
  openApplication: {
    overline: string;
    heading: string;
    body: string;
    cta: string;
  };
  studioImage?: {
    src: string;
    alt: string;
    caption: string;
    width?: number;
    height?: number;
  };
}

export const careersContent: CareersContent = {
  hero: {
    overline: "Careers",
    heading: "Join the practice.",
    body: "We are a small studio built on the belief that architecture is a collaborative discipline. Every project is an opportunity to learn — from the site, from the client, from each other. If you care about materiality, craft, and the long-term impact of what we build, we would like to hear from you.",
  },
  openApplication: {
    overline: "Open Applications",
    heading: "Don't see your role?",
    body: "We are always interested in meeting people who think carefully, work collaboratively, and care deeply about the built environment. Whether you are an architect, designer, researcher, or builder, we welcome open applications.",
    cta: "Send an open application",
  },
  studioImage: {
    src: "/images/studio/studio-atelier.jpg",
    alt: "The RAFA Design Hub studio in Porto — architects working at model table",
    caption: "The practice atelier in Porto",
    width: 1600,
    height: 900,
  },
};

export const careerPositions: CareerPosition[] = [
  {
    id: "architect",
    title: "Architect",
    location: "Porto",
    type: "full-time",
    description:
      "We are looking for an architect with 3–5 years of experience to join our design team. You will work across residential and cultural projects, from concept through to construction.",
    requirements: [
      "Degree in architecture and 3+ years of professional experience",
      "Strong design portfolio with built work",
      "Proficiency in Revit, AutoCAD, and Adobe Creative Suite",
      "Excellent communication and teamwork skills",
    ],
  },
  {
    id: "interior-designer",
    title: "Interior Designer",
    location: "Lisbon",
    type: "full-time",
    description:
      "An opportunity to join our interior design practice, working on residential and commercial projects with a focus on materiality and craft.",
    requirements: [
      "Degree in interior design or architecture",
      "Portfolio demonstrating material sensitivity",
      "Experience with FF&E selection and specification",
      "Fluency in Portuguese and English",
    ],
  },
  {
    id: "summer-internship",
    title: "Summer Internship",
    location: "Porto",
    type: "internship",
    description:
      "A 3-month paid internship for final-year architecture students. You will support the design team on live projects and gain hands-on experience of a small studio.",
    requirements: [
      "Enrolled in final year of architecture degree",
      "Strong drawing and model-making skills",
      "Curiosity and a collaborative attitude",
    ],
  },
  {
    id: "visualization-specialist",
    title: "Architectural Visualization Specialist",
    location: "Remote",
    type: "contract",
    description:
      "Freelance opportunity for a skilled visualization artist to produce photorealistic renders and animations for client presentations and publications.",
    requirements: [
      "Exceptional portfolio of architectural renderings",
      "Expertise in 3ds Max, Corona or V-Ray, and Photoshop",
      "Understanding of architectural drawing conventions",
    ],
  },
];

export const benefits: Benefit[] = [
  {
    id: "team",
    number: "01",
    title: "A small team",
    description: "You will work directly with the studio founders on every project.",
  },
  {
    id: "responsibility",
    number: "02",
    title: "Real responsibility",
    description: "From your first week, you will contribute to live projects.",
  },
  {
    id: "culture",
    number: "03",
    title: "Studio culture",
    description: "Site visits, material libraries, and a studio in Porto's historic centre.",
  },
  {
    id: "growth",
    number: "04",
    title: "Growth",
    description: "Annual review, mentorship, and support for professional development.",
  },
];
