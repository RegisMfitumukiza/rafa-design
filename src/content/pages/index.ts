const numberWords = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
];

export function getServicesDescription(count: number): string {
  const word = numberWords[count] ?? String(count);
  return `${word} disciplines, one practice — every engagement begins with the same conviction: architecture that is quiet, considered, and rooted in its place.`;
}

export interface PageIntroCta {
  overline?: string;
  heading?: string;
  body?: string;
  action?: string;
}

export interface PageIntro {
  overline?: string;
  title?: string;
  description?: string;
  cta?: PageIntroCta;
}

export interface PageIntroContact {
  overline?: string;
  title?: string;
  description?: string;
  briefHeading?: string;
  closingHeading?: string;
  closingBody?: string;
  editorialOverline?: string;
  dialogueOverline?: string;
}

export interface PageIntroSustainability {
  overline?: string;
  heading?: string;
  body?: string;
}

/** Editable page introductions fetched from Sanity (singleton `pageIntros`). */
export interface PageIntros {
  projects?: PageIntro;
  services?: PageIntro;
  journal?: PageIntro;
  process?: PageIntro;
  sustainability?: PageIntroSustainability;
  contact?: PageIntroContact;
}

export const pageContent = {
  projects: {
    title: "Projects",
    description:
      "A selection of recent residential, cultural, and public architecture by RAFA Design Hub.",
  },
  services: {
    title: "Services",
    overline: "Disciplines // Services",
    description: undefined as string | undefined,
    cta: {
      overline: "Disciplines // Contact",
      heading: "Have a project in mind?",
      body: "Tell us about the place, the ambition and the challenge.",
      action: "Start a project",
    },
  },
  process: {
    title: "Methodology",
    overline: "Specification // Methodology",
    description:
      "Every project follows a clear arc — from discovery to completion. The path is never linear, but the principles remain the same: listen, conceive, refine, build.",
    cta: {
      overline: "Process // Contact",
      heading: "Have a project in mind?",
      body: "Tell us about the place, the ambition and the challenge.",
      action: "Start a project",
    },
  },
  journal: {
    title: "Journal",
    overline: "Specification // Journal",
    description:
      "Essays, research, and observations on architecture, craft, material culture, and the ideas behind the work.",
  },
  contact: {
    title: "Contact",
    overline: "Specification // Contact",
    description:
      "Tell us about the project, place, ambition, or question you would like to explore with RAFA Design Hub.",
    briefHeading: "Project Brief",
    closingHeading: "EVERY PROJECT BEGINS WITH A CONVERSATION.",
    closingBody:
      "Whether the idea is fully formed or still taking shape, we would be glad to hear from you.",
    editorialOverline: "The Practice // Working Environment",
    dialogueOverline: "Specification // Dialogue",
  },
  careers: {
    title: "Careers",
    description:
      "We are always looking for talented people who care about architecture. If one of the roles below is not quite right, write to us anyway.",
    emptyState: {
      message:
        "We don't have any open positions at the moment, but we are always interested in meeting talented people who care about architecture. If you would like to introduce yourself, please send an ",
      linkText: "open application",
    },
    banner: {
      prefix: "We're hiring",
      suffix: "open position",
      suffixPlural: "open positions",
      cta: "View opportunities",
    },
  },
  sustainability: {
    title: "Sustainability",
    description:
      "Our commitment to responsible architecture — designing spaces that respect the land, reduce environmental impact, and endure beyond their generation.",
  },
  studio: {
    title: "Studio",
    description:
      "The people, philosophy, and history behind RAFA Design Hub — an architecture and interior design studio.",
  },
} as const;
