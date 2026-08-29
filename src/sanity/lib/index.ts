/**
 * Sanity Library — Public API
 *
 * Central export point for all Sanity functionality.
 * Import from here to access clients, queries, transforms, and fetch utilities.
 *
 * @example
 * import { getArticles, getProjectBySlug } from '@/sanity/lib';
 */

// Export clients
export { client, clientWrite, previewClient, getClient, sanityConfig } from "./client";

// Export all queries
export * from "./queries";

// Export all transforms
export {
  transformSanityProject,
  transformSanityProjects,
  transformSanityArticle,
  transformSanityArticles,
} from "./transforms";

// Export all fetch utilities
export {
  getArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getFeaturedArticle,
  getRelatedArticles,
  getArticleSlugs,
  getProjects,
  getProjectBySlug,
  getProjectsBySlugs,
  getProjectSlugs,
  cacheTags,
} from "./fetch";

// Export image utilities
export {
  sanityImageToAsset,
  sanityImageToChapterImage,
  sanityImagesToChapterImages,
} from "./image";
