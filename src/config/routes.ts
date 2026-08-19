export const routes = {
  home: {
    label: "Landing",
    path: "/",
    status: "active",
  },
  projects: {
    label: "Projects",
    path: "/projects",
    status: "active",
  },
  projectDetails: {
    label: "Project Details",
    path: "/projects/[slug]",
    status: "active",
  },
  services: {
    label: "Services",
    path: "/services",
    status: "active",
  },
  serviceDetails: {
    label: "Service Details",
    path: "/services/[slug]",
    status: "active",
  },
  studio: {
    label: "Studio",
    path: "/studio",
    status: "active",
  },
  process: {
    label: "Process",
    path: "/process",
    status: "active",
  },
  journal: {
    label: "Journal",
    path: "/journal",
    status: "active",
  },
  articleDetails: {
    label: "Article Details",
    path: "/journal/[slug]",
    status: "active",
  },
  contact: {
    label: "Contact",
    path: "/contact",
    status: "active",
  },
  careers: {
    label: "Careers",
    path: "/careers",
    status: "active",
  },
  sustainability: {
    label: "Sustainability",
    path: "/sustainability",
    status: "active",
  },
  privacy: {
    label: "Privacy",
    path: "/privacy",
    status: "planned",
  },
  notFound: {
    label: "404",
    path: "/not-found",
    status: "active",
  },
} as const;

export type RouteKey = keyof typeof routes;
export type PlannedRoute = (typeof routes)[RouteKey];
