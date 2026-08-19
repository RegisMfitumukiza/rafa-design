export type { ImageAsset, Location, SocialLink } from "./types";

export { pageContent } from "./pages";
export { ui } from "./ui";
export { footerContent } from "./footer";
export type { FooterContent } from "./footer";
export { primaryNavLinks, supportingNavLinks } from "./navigation";
export type { NavLink } from "./navigation";

export {
  getArticleBySlug,
  getArticles,
  getArticlesByCategory,
  getFeaturedArticle,
  getRelatedArticles,
} from "./journal";
export type { JournalArticle, JournalCategory } from "./journal";

export { getProcessSteps } from "./process";
export type { ProcessStep } from "./process";

export {
  getCategories,
  getFeaturedProjects,
  getProjectBySlug,
  getProjects,
  getProjectsByCategory,
  getRelatedProjects,
  getActiveCategories,
} from "./projects";
export type { Project, ProjectCategory } from "./projects";

export { getRelatedProjectsForService, getServiceBySlug, getServices } from "./services";
export type { Service } from "./services";

export {
  awards,
  clientReferencesNote,
  clientSectors,
  studioContent,
  teamMembers,
  timeline,
  timelineIntro,
} from "./studio";
export type {
  Award,
  ClientSector,
  Studio,
  StudioPrinciple,
  TeamMember,
  TimelineEvent,
  WorkingMethod,
} from "./studio";

export { contactInformation } from "./company/contact";
export type { ContactInformation, Office } from "./company/contact";

export { benefits, careerPositions } from "./company/careers";
export type { Benefit, CareerPosition, PositionType } from "./company/careers";
