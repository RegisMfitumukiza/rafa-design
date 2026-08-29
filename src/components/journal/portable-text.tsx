/**
 * Portable Text Components
 *
 * Custom React components for rendering Sanity portable text content blocks.
 * These components handle the rich editorial content from the Journal schema.
 *
 * @see src/sanity/schemas/journal.ts for content block definitions
 */

import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";

interface ImageBlockValue {
  asset?: unknown;
  layout?: string;
  alt?: string;
  caption?: string;
  credit?: string;
  [key: string]: unknown;
}

interface GalleryImageItem {
  asset?: unknown;
  alt?: string;
  caption?: string;
  [key: string]: unknown;
}

interface GalleryBlockValue {
  images?: GalleryImageItem[];
  columns?: number;
  [key: string]: unknown;
}

interface PullQuoteBlockValue {
  content?: string;
  author?: string;
  [key: string]: unknown;
}

interface VideoBlockValue {
  url?: string;
  caption?: string;
  credit?: string;
  [key: string]: unknown;
}

interface ProjectReferenceBlockValue {
  project?: {
    slug?: { current?: string };
    heroImage?: { alt?: string; [key: string]: unknown };
    title?: string;
    subtitle?: string;
    year?: number | string;
    location?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

interface DividerBlockValue {
  style?: string;
  [key: string]: unknown;
}

/**
 * Image Block Component
 */
function ImageBlock({ value }: { value: ImageBlockValue }) {
  if (!value?.asset) return null;

  const imageUrl = urlForImage(value)?.url();
  if (!imageUrl) return null;

  const layout = value.layout || "contained";
  const layoutClasses = {
    contained: "max-w-4xl mx-auto",
    wide: "max-w-6xl mx-auto",
    full: "w-full",
  };

  return (
    <figure className={`my-xl ${layoutClasses[layout as keyof typeof layoutClasses]}`}>
      <div className="aspect-landscape bg-surface relative overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={value.alt || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
      {(value.caption || value.credit) && (
        <figcaption className="text-foreground/60 mt-sm text-sm">
          {value.caption && <span className="block">{value.caption}</span>}
          {value.credit && <span className="text-foreground/40 block text-xs">{value.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Gallery Block Component
 */
function GalleryBlock({ value }: { value: GalleryBlockValue }) {
  if (!value?.images || value.images.length === 0) return null;

  const columns = value.columns || 3;
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={`my-2xl gap-md grid ${gridClasses[columns as keyof typeof gridClasses]}`}>
      {value.images.map((image: GalleryImageItem, index: number) => {
        const imageUrl = urlForImage(image)?.url();
        if (!imageUrl) return null;

        return (
          <figure key={index} className="group">
            <div className="bg-surface aspect-landscape relative overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={image.alt || ""}
                fill
                className="duration-slow object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
            {image.caption && (
              <figcaption className="text-foreground/60 mt-sm text-xs">{image.caption}</figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}

/**
 * Pull Quote Block Component
 */
function PullQuoteBlock({ value }: { value: PullQuoteBlockValue }) {
  if (!value?.content) return null;

  return (
    <blockquote className="border-l-border my-2xl py-md pl-xl pr-md border-l-4">
      <p className="text-foreground font-display text-2xl leading-snug font-medium md:text-3xl">
        {value.content}
      </p>
      {value.author && (
        <cite className="text-foreground/60 mt-md block text-sm not-italic">— {value.author}</cite>
      )}
    </blockquote>
  );
}

/**
 * Video Block Component
 */
function VideoBlock({ value }: { value: VideoBlockValue }) {
  if (!value?.url) return null;

  // Extract video ID for different platforms
  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      )?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    // Vimeo
    if (url.includes("vimeo.com")) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }
    // Direct video URL
    return url;
  };

  const embedUrl = getEmbedUrl(value.url);
  if (!embedUrl) return null;

  const isDirectVideo = !embedUrl.includes("youtube.com") && !embedUrl.includes("vimeo.com");

  return (
    <figure className="my-2xl">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        {isDirectVideo ? (
          <video src={embedUrl} controls className="h-full w-full" />
        ) : (
          <iframe
            src={embedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {(value.caption || value.credit) && (
        <figcaption className="text-foreground/60 mt-sm text-sm">
          {value.caption && <span className="block">{value.caption}</span>}
          {value.credit && <span className="text-foreground/40 block text-xs">{value.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Project Reference Block Component
 */
function ProjectReferenceBlock({ value }: { value: ProjectReferenceBlockValue }) {
  const project = value.project;
  if (!project) return null;

  const slug = project.slug?.current || "";

  return (
    <Link
      href={`/projects/${slug}`}
      className="border-border hover:border-foreground/20 group my-xl block overflow-hidden rounded-lg border transition-colors"
    >
      {project.heroImage && (
        <div className="aspect-landscape bg-surface relative overflow-hidden">
          <Image
            src={urlForImage(project.heroImage)?.url() || ""}
            alt={project.heroImage.alt || project.title || ""}
            fill
            className="duration-slow object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      )}
      <div className="p-lg">
        <p className="text-foreground/40 mb-xs text-xs tracking-wider uppercase">Related Project</p>
        <h3 className="text-foreground mb-xs text-xl font-medium">{project.title}</h3>
        {project.subtitle && <p className="text-foreground/60 text-sm">{project.subtitle}</p>}
        {(project.year || project.location) && (
          <p className="text-foreground/40 mt-sm text-xs">
            {project.year && <span>{project.year}</span>}
            {project.year && project.location && <span className="mx-xs">·</span>}
            {project.location && <span>{project.location}</span>}
          </p>
        )}
      </div>
    </Link>
  );
}

/**
 * Divider Block Component
 */
function DividerBlock({ value }: { value: DividerBlockValue }) {
  const style = value.style || "space";

  if (style === "line") {
    return <hr className="border-border my-2xl border-t" />;
  }

  if (style === "ruled") {
    return (
      <div className="my-2xl flex items-center justify-center">
        <div className="border-border h-px w-1/3 border-t" />
      </div>
    );
  }

  // Space
  return <div className="my-2xl" />;
}

/**
 * Portable Text Component Configuration
 */
const portableTextComponents: PartialPortableTextComponents = {
  types: {
    image: ImageBlock,
    gallery: GalleryBlock,
    pullQuote: PullQuoteBlock,
    video: VideoBlock,
    projectReference: ProjectReferenceBlock,
    divider: DividerBlock,
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-foreground mb-md mt-2xl font-display text-3xl font-medium tracking-tight md:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-foreground mb-sm mt-xl font-display text-2xl font-medium tracking-tight md:text-3xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-foreground/80 mb-md text-lg leading-relaxed md:text-xl md:leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-border my-lg py-sm pl-lg border-l-4">
        <p className="text-foreground/70 text-lg leading-relaxed italic md:text-xl">{children}</p>
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          className="text-foreground hover:text-foreground/60 decoration-foreground/20 hover:decoration-foreground/40 underline underline-offset-4 transition-colors"
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-lg ml-lg space-y-xs list-disc">{children}</ul>,
    number: ({ children }) => <ol className="mb-lg ml-lg space-y-xs list-decimal">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-foreground/80 text-lg leading-relaxed md:text-xl">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-foreground/80 text-lg leading-relaxed md:text-xl">{children}</li>
    ),
  },
};

/**
 * Main Portable Text Component
 */
export function ArticleContent({ content }: { content: Array<Record<string, unknown>> }) {
  if (!content || content.length === 0) {
    return <p className="text-foreground/40 italic">No content available</p>;
  }

  return (
    <div className="prose-lg mx-auto max-w-4xl">
      <PortableText
        value={content as unknown as Parameters<typeof PortableText>[0]["value"]}
        components={portableTextComponents}
      />
    </div>
  );
}

// Type helper
type PartialPortableTextComponents = Partial<PortableTextComponents>;
