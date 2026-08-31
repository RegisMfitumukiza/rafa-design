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
    contained: "max-w-4xl mx-auto my-2xl",
    wide: "max-w-5xl mx-auto my-3xl",
    full: "w-full my-3xl",
  };

  return (
    <figure className={layoutClasses[layout as keyof typeof layoutClasses] || "my-2xl"}>
      <div className="bg-surface relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageUrl}
          alt={value.alt || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
        />
      </div>
      {(value.caption || value.credit) && (
        <figcaption className="text-foreground/50 mt-sm gap-x-md flex flex-wrap items-baseline justify-between text-xs">
          {value.caption && <span>{value.caption}</span>}
          {value.credit && (
            <span className="text-foreground/35 font-mono text-[10px] tracking-widest uppercase">
              Photo: {value.credit}
            </span>
          )}
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
    <div
      className={`my-2xl gap-md grid ${gridClasses[columns as keyof typeof gridClasses] || "grid-cols-3"}`}
    >
      {value.images.map((image: GalleryImageItem, index: number) => {
        const imageUrl = urlForImage(image)?.url();
        if (!imageUrl) return null;

        return (
          <figure key={index} className="group">
            <div className="bg-surface relative aspect-[4/3] overflow-hidden">
              <Image
                src={imageUrl}
                alt={image.alt || ""}
                fill
                className="duration-slow object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
            {image.caption && (
              <figcaption className="text-foreground/40 mt-xs font-mono text-[10px] tracking-wider uppercase">
                {image.caption}
              </figcaption>
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
    <blockquote className="border-l-foreground/30 my-3xl py-md pl-xl pr-md border-l-2">
      <p className="font-display text-foreground text-2xl leading-snug font-medium tracking-tight sm:text-3xl md:text-4xl">
        &ldquo;{value.content}&rdquo;
      </p>
      {value.author && (
        <cite className="text-foreground/40 mt-md block font-mono text-[10px] tracking-widest uppercase not-italic">
          — {value.author}
        </cite>
      )}
    </blockquote>
  );
}

/**
 * Video Block Component
 */
function VideoBlock({ value }: { value: VideoBlockValue }) {
  if (!value?.url) return null;

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      )?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(value.url);
  if (!embedUrl) return null;

  const isDirectVideo = !embedUrl.includes("youtube.com") && !embedUrl.includes("vimeo.com");

  return (
    <figure className="my-2xl">
      <div className="relative aspect-video overflow-hidden bg-black">
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
        <figcaption className="text-foreground/50 mt-sm flex items-baseline justify-between text-xs">
          {value.caption && <span>{value.caption}</span>}
          {value.credit && (
            <span className="text-foreground/35 font-mono text-[10px] tracking-widest uppercase">
              {value.credit}
            </span>
          )}
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

  const rawSlug = project.slug;
  const slug = (typeof rawSlug === "object" ? rawSlug?.current : rawSlug) || "";

  return (
    <Link
      href={`/projects/${slug}`}
      className="border-border/40 hover:border-foreground/40 bg-foreground/[0.02] group my-2xl block overflow-hidden border transition-all duration-300"
    >
      <div className="grid items-stretch sm:grid-cols-12">
        {project.heroImage && (
          <div className="bg-surface relative aspect-[4/3] overflow-hidden sm:col-span-5">
            <Image
              src={urlForImage(project.heroImage)?.url() || ""}
              alt={project.heroImage.alt || project.title || ""}
              fill
              className="duration-slow object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        )}
        <div
          className={
            project.heroImage
              ? "p-lg flex flex-col justify-between sm:col-span-7"
              : "p-lg flex flex-col justify-between sm:col-span-12"
          }
        >
          <div>
            <p className="text-foreground/40 mb-xs font-mono text-[10px] tracking-widest uppercase">
              Specification // Project Reference
            </p>
            <h3 className="font-display text-foreground group-hover:text-foreground/70 mb-xs text-xl font-medium tracking-tight transition-colors">
              {project.title}{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </h3>
            {project.subtitle && (
              <p className="text-foreground/60 text-sm leading-relaxed">{project.subtitle}</p>
            )}
          </div>

          {(project.year || project.location) && (
            <p className="text-foreground/40 mt-md border-border/20 pt-sm border-t font-mono text-[10px] tracking-widest uppercase">
              {project.location && <span>{project.location}</span>}
              {project.year && project.location && <span className="mx-xs">·</span>}
              {project.year && <span>{project.year}</span>}
            </p>
          )}
        </div>
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
    return <hr className="border-border/30 my-2xl border-t" />;
  }

  if (style === "ruled") {
    return (
      <div className="my-2xl flex items-center justify-center">
        <div className="border-border/40 h-px w-24 border-t" />
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
    h2: ({ children, value }) => {
      const text =
        (value?.children as Array<{ text?: string }> | undefined)
          ?.map((c) => c.text || "")
          .join("") || "";
      const id = text
        ? text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        : undefined;
      const match = text.match(/^(\d{2})\s*\/\/\s*(.+)$/);
      const number = match?.[1];
      const title = match?.[2]?.trim();

      return (
        <div id={id} className="mt-3xl mb-lg border-border/20 pt-xl scroll-mt-28 border-t">
          {number && (
            <p className="text-foreground/35 mb-1.5 font-mono text-[10px] tracking-widest uppercase">
              {number} {"//"} Section
            </p>
          )}
          <h2 className="font-display text-foreground text-2xl leading-tight font-medium tracking-tight sm:text-3xl lg:text-4xl">
            {number ? title : children}
          </h2>
        </div>
      );
    },
    h3: ({ children }) => (
      <h3 className="text-foreground mb-sm mt-2xl font-display text-xl font-medium tracking-tight sm:text-2xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-foreground/85 mb-lg text-lg leading-[1.8] sm:text-xl sm:leading-[1.8]">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-foreground/30 my-xl py-sm pl-lg border-l-2">
        <p className="text-foreground/75 text-xl leading-relaxed italic">{children}</p>
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
          className="text-foreground hover:text-foreground/60 decoration-foreground/30 hover:decoration-foreground underline underline-offset-4 transition-colors"
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
    bullet: ({ children }) => (
      <ul className="mb-lg ml-lg space-y-xs text-foreground/80 list-disc">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-lg ml-lg space-y-xs text-foreground/80 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-foreground/85 text-lg leading-[1.8] sm:text-xl">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-foreground/85 text-lg leading-[1.8] sm:text-xl">{children}</li>
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
    <div className="space-y-xl text-foreground/85 leading-[1.8]">
      <PortableText
        value={content as unknown as Parameters<typeof PortableText>[0]["value"]}
        components={portableTextComponents}
      />
    </div>
  );
}

// Type helper
type PartialPortableTextComponents = Partial<PortableTextComponents>;
