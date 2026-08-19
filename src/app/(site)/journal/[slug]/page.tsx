import { notFound } from "next/navigation";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/config/schema";
import { getArticles, getArticleBySlug, getRelatedArticles } from "@/content/journal";
import { RelatedArticlesCarousel } from "@/features/journal/related-articles-carousel";
import {
  EssayTemplate,
  ProjectStoryTemplate,
  MaterialStudyTemplate,
  EventTemplate,
  NewsTemplate,
  AwardTemplate,
} from "@/features/journal/templates";

// Import templates

const categoryLabels: Record<string, string> = {
  news: "News",
  research: "Research",
  awards: "Awards",
  events: "Events",
  ideas: "Ideas",
  publications: "Publications",
};

export function generateStaticParams() {
  return getArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const categoryLabel = categoryLabels[article.category] || article.category;

  // Determine which template to use based on article type
  const renderTemplate = () => {
    const type = article.type || "essay"; // Default to essay if no type

    switch (type) {
      case "essay":
        return <EssayTemplate article={article} categoryLabel={categoryLabel} />;

      case "project-story":
        return <ProjectStoryTemplate article={article} categoryLabel={categoryLabel} />;

      case "material-study":
        return <MaterialStudyTemplate article={article} categoryLabel={categoryLabel} />;

      case "event":
        return <EventTemplate article={article} categoryLabel={categoryLabel} />;

      case "news":
        return <NewsTemplate article={article} categoryLabel={categoryLabel} />;

      case "award":
        return <AwardTemplate article={article} categoryLabel={categoryLabel} />;

      default:
        // Fallback to essay template
        return <EssayTemplate article={article} categoryLabel={categoryLabel} />;
    }
  };

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Journal", path: "/journal" },
          { name: article.title, path: `/journal/${article.slug}` },
        ])}
      />

      {/* Render appropriate template based on article type */}
      {renderTemplate()}

      {/* Related Articles Carousel */}
      {related.length > 0 && (
        <Section container="wide" className="mt-2xl">
          <RelatedArticlesCarousel articles={related} />
        </Section>
      )}
    </>
  );
}
