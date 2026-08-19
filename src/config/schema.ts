import { siteConfig } from "@/config/site";
import { contactInformation } from "@/content/company/contact";
import type { JournalArticle } from "@/content/journal";
import type { Project } from "@/content/projects";
import type { Service } from "@/content/services";

const baseUrl = siteConfig.url.replace(/\/$/, "");

function absolute(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  return `${baseUrl}${src.startsWith("/") ? src : `/${src}`}`;
}

export function organizationSchema(): Record<string, unknown> {
  const social = contactInformation.socialLinks
    .map((link) => link.url)
    .filter((url) => url.length > 0 && url !== "#");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: baseUrl,
    logo: absolute("/icon.svg"),
    email: contactInformation.email,
    telephone: contactInformation.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: contactInformation.offices[0]?.address,
      addressLocality: contactInformation.offices[0]?.city,
      addressCountry: contactInformation.offices[0]?.country,
    },
    ...(social.length > 0 ? { sameAs: social } : {}),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
    inLanguage: siteConfig.locale,
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function projectSchema(project: Project): Record<string, unknown> {
  const images = [project.heroImage, ...project.gallery].map((image) => absolute(image.src));

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: absolute(`/projects/${project.slug}`),
    image: images,
    dateCreated: String(project.year),
    locationCreated: {
      "@type": "Place",
      name: project.location.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location.city,
        addressCountry: project.location.country,
      },
    },
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
    keywords: project.category.join(", "),
  };
}

export function articleSchema(article: JournalArticle): Record<string, unknown> {
  // Handle both new format (hero) and legacy format (coverImage)
  const coverImage = article.hero || (article as any).coverImage;
  const imageSrc = coverImage?.src;
  
  // Handle both new format (author object) and legacy format (author string)
  const authorName = typeof article.author === "object" 
    ? article.author?.name 
    : article.author;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: absolute(`/journal/${article.slug}`),
    ...(imageSrc ? { image: [absolute(imageSrc)] } : {}),
    author: {
      "@type": "Person",
      name: authorName ?? siteConfig.creator,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
    mainEntityOfPage: absolute(`/journal/${article.slug}`),
  };
}

export function serviceSchema(service: Service): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absolute(`/services/${service.slug}`),
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
  };
}
