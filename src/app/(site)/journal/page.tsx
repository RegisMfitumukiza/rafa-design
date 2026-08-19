import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/config/schema";
import {
  getArticles,
  getFeaturedArticle,
  getActiveCategories,
  type JournalCategory,
} from "@/content/journal";
import { pageContent } from "@/content/pages";
import { CategoryFilter } from "@/features/journal/category-filter";
import { FeaturedArticle } from "@/features/journal/featured-article";
import { PaginatedArticles } from "@/features/journal/paginated-articles";
import { Reveal } from "@/motion";

export const metadata: Metadata = {
  title: pageContent.journal.title,
  description: pageContent.journal.description,
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const articles = getArticles(); // Already sorted by date (latest first)
  const categories = getActiveCategories();
  const { category } = await searchParams;
  const activeCategory = (category ?? null) as JournalCategory | null;

  const filtered = activeCategory
    ? articles.filter((a) => a.category === activeCategory)
    : articles;
  const featured = getFeaturedArticle(); // Latest article
  const rest = filtered.filter((a) => a.slug !== featured.slug);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Journal", path: "/journal" }])} />

      {/* Pattern B: 12-Column Split Header */}
      <Section container="wide">
        <Reveal>
          <div className="mb-2xl gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            <div className="md:col-span-5 lg:col-span-5">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {pageContent.journal.overline}
              </p>
              <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {pageContent.journal.title}
              </h1>
            </div>
            <div className="md:pt-md md:col-span-7 lg:col-span-7">
              <p className="text-foreground/70 w-full text-xl leading-relaxed md:text-2xl">
                {pageContent.journal.description}
              </p>
            </div>
          </div>
        </Reveal>

        {activeCategory === null && <FeaturedArticle article={featured} className="mb-2xl" />}

        <CategoryFilter categories={categories} active={activeCategory} className="mb-xl" />

        <PaginatedArticles articles={rest} />
      </Section>
    </>
  );
}
