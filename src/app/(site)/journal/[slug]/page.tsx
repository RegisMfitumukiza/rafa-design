import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/config/schema";
import {
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
} from "@/content/journal/sanity-adapter";
import { JournalDocumentSanity } from "@/features/journal/document/journal-document-sanity";
import { RelatedArticlesCarousel } from "@/features/journal/related-articles-carousel";

const categoryLabels: Record<string, string> = {
  news: "News",
  research: "Research",
  awards: "Awards",
  events: "Events",
  ideas: "Ideas",
  publications: "Publications",
};

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.hero?.src
        ? [{ url: article.hero.src, alt: article.hero.alt || article.title }]
        : [],
      type: "article",
      publishedTime: article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.hero?.src ? [article.hero.src] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);
  const categoryLabel = categoryLabels[article.category] || article.category;

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Journal", path: "/journal" },
          { name: article.title, path: `/journal/${article.slug}` },
        ])}
      />

      {/* Sanity Article - Portable Text Editorial Document */}
      <JournalDocumentSanity article={article} categoryLabel={categoryLabel} />

      {/* Related Articles Carousel */}
      {related.length > 0 && (
        <Section container="wide" className="mt-2xl">
          <RelatedArticlesCarousel articles={related} />
        </Section>
      )}
    </>
  );
}
