import type { Route } from "next";

import Link from "next/link";

import { Image } from "@/components/media/Image";
import type { HeadingTag } from "@/components/typography/Heading";
import type { JournalArticle } from "@/content/journal";
import { cn } from "@/lib/cn";

interface JournalCardProps {
  article: JournalArticle;
  titleAs?: HeadingTag;
  className?: string;
}

const categoryLabels: Record<string, string> = {
  news: "News",
  research: "Research",
  awards: "Awards",
  events: "Events",
  ideas: "Ideas",
  publications: "Publications",
};

export function JournalCard({ article, titleAs = "h3", className }: JournalCardProps) {
  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const Title = titleAs;

  // Handle both new and legacy formats
  const coverImage = article.hero || (article as any).coverImage;
  const authorName = typeof article.author === "object" 
    ? article.author?.name 
    : article.author;

  return (
    <article className={cn("group", className ?? "")}>
      <Link href={`/journal/${article.slug}` as Route} className="block">
        {coverImage && (
          <Image
            asset={{
              src: coverImage.src,
              alt: coverImage.alt,
            }}
            className="aspect-[16/9] w-full mb-md"
            imgClassName="transition-micro motion-safe:group-hover:scale-(--micro-scale)"
            sizes="(max-width: 48rem) 100vw, (max-width: 64rem) 50vw, 33vw"
          />
        )}
        <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-xs">
          Specification // {categoryLabels[article.category] || article.category}
        </p>
        <Title className="text-foreground group-hover:text-foreground/70 font-display text-xl font-medium leading-tight tracking-tight transition-colors sm:text-2xl mb-sm">
          {article.title}
        </Title>
        <p className="text-foreground/40 font-mono text-xs">
          {authorName && `${authorName} · `}
          {formattedDate}
        </p>
      </Link>
    </article>
  );
}
