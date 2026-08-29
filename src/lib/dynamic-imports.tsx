/**
 * Dynamic Import Utilities
 *
 * Centralized dynamic imports for heavy components to optimize bundle size.
 * These components are loaded on-demand only when needed.
 */

import dynamic from "next/dynamic";

/**
 * Heavy interactive components that should be code-split
 */

// Project lightbox - only loaded when opening gallery images
export const ProjectLightbox = dynamic(
  () =>
    import("@/features/projects/project-lightbox").then((mod) => ({
      default: mod.ProjectLightbox,
    })),
  {
    ssr: false,
    loading: () => null,
  },
);

// Drawing viewer - only loaded when viewing technical drawings
export const ProjectDrawingViewer = dynamic(
  () =>
    import("@/features/projects/project-drawing-viewer").then((mod) => ({
      default: mod.ProjectDrawingViewer,
    })),
  {
    ssr: false,
    loading: () => null,
  },
);

// Team member modal - only loaded when clicking team members
export const TeamMemberModal = dynamic(
  () =>
    import("@/features/studio/team-member-modal").then((mod) => ({ default: mod.TeamMemberModal })),
  {
    ssr: false,
    loading: () => null,
  },
);

/**
 * Feature-specific bundles that can be lazy loaded
 */

// Before/After slider - only on project detail pages with renovation content
export const BeforeAfterSlider = dynamic(
  () =>
    import("@/features/projects/before-after-slider").then((mod) => ({
      default: mod.BeforeAfterSlider,
    })),
  {
    loading: () => (
      <div
        className="aspect-landscape bg-muted animate-pulse"
        role="status"
        aria-label="Loading comparison slider"
      />
    ),
  },
);

// Projects archive - heavy component with filtering and search
export const ProjectsArchive = dynamic(
  () =>
    import("@/features/projects/projects-archive").then((mod) => ({
      default: mod.ProjectsArchive,
    })),
  {
    loading: () => (
      <div className="py-xl min-h-screen" role="status" aria-label="Loading projects">
        <div className="container-wide">
          <div className="gap-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-standard bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    ),
  },
);

// Contact form - only on contact page
export const ContactForm = dynamic(
  () => import("@/features/contact/contact-form").then((mod) => ({ default: mod.ContactForm })),
  {
    loading: () => (
      <div className="space-y-md" role="status" aria-label="Loading contact form">
        <div className="bg-muted h-12 animate-pulse" />
        <div className="bg-muted h-12 animate-pulse" />
        <div className="bg-muted h-32 animate-pulse" />
        <div className="bg-muted h-12 w-32 animate-pulse" />
      </div>
    ),
  },
);

// Splash screen - only on first visit
export const SplashScreen = dynamic(
  () => import("@/components/splash/SplashScreen").then((mod) => ({ default: mod.SplashScreen })),
  {
    ssr: false,
    loading: () => null,
  },
);
