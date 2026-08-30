import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/config/schema";
import type { JournalCategory } from "@/content/journal";
import {
  getArticles,
  getFeaturedArticle,
  getActiveCategories,
} from "@/content/journal/sanity-adapter";
import { pageContent } from "@/content/pages";
import { FeaturedArticle } from "@/features/journal/featured-article";
import { JournalIndexHeader } from "@/features/journal/journal-index-header";
import { PaginatedArticles } from "@/features/journal/paginated-articles";

export const metadata: Metadata = {
  title: pageContent.journal.title,
  description: pageContent.journal.description,
};

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = (category ?? null) as JournalCategory | null;

  // Fetch from Sanity CMS
  const allArticles = await getArticles();
  const featured = await getFeaturedArticle();
  const categories = await getActiveCategories();

  // Filter by category when a filter is active
  const filtered = activeCategory
    ? allArticles.filter((a) => a.category === activeCategory)
    : allArticles;

  // Remove featured article from the grid to avoid duplication
  const rest = featured ? filtered.filter((a) => a.slug !== featured.slug) : filtered;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Journal", path: "/journal" }])} />

      <Section container="wide">
        {/* Title + inline category filters */}
        <JournalIndexHeader categories={categories} active={activeCategory} />

        {/* Cinematic featured article — hidden when filtering by category */}
        {activeCategory === null && featured && <FeaturedArticle article={featured} />}

        {/* Editorial grid */}
        <PaginatedArticles articles={rest} />
      </Section>
    </>
  );
}
