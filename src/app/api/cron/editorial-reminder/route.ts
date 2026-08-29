import { NextResponse } from "next/server";

import { getArticles } from "@/content/journal/sanity-adapter";

/**
 * GET /api/cron/editorial-reminder
 *
 * Automated Editorial Inactivity Cron Reminder.
 * Checks the publishing frequency of the RAFA Journal archive.
 *
 * If no new article has been published for 6+ months (>= 180 days),
 * it returns a structured warning alert payload (and optionally triggers
 * an email notification to studio admins).
 *
 * Can be triggered via:
 *   - Vercel Cron (configured in vercel.json)
 *   - GitHub Actions / Scheduled cron
 *   - Direct API request with Authorization: Bearer <CRON_SECRET>
 */
export async function GET(request: Request) {
  // Authorization check (skipped in development unless CRON_SECRET is set)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const articles = await getArticles();
  if (!articles || articles.length === 0) {
    return NextResponse.json(
      {
        status: "warning",
        alert: true,
        message: "No articles found in the archive.",
      },
      { status: 200 },
    );
  }

  // Articles are pre-sorted descending by date
  const latestArticle = articles[0]!;
  const latestDate = new Date(latestArticle.publishedAt);
  const now = new Date();

  const diffInMs = now.getTime() - latestDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = parseFloat((diffInDays / 30.44).toFixed(1));

  const INACTIVE_THRESHOLD_MONTHS = 6;
  const isInactive = diffInMonths >= INACTIVE_THRESHOLD_MONTHS;

  const payload = {
    status: isInactive ? "warning" : "active",
    alert: isInactive,
    message: isInactive
      ? `INACTIVE EDITORIAL REMINDER: No new article published for ${diffInMonths} months (${diffInDays} days).`
      : `Editorial archive active. Latest article published ${diffInMonths} months ago.`,
    latestArticle: {
      title: latestArticle.title,
      slug: latestArticle.slug,
      publishedAt: latestArticle.publishedAt,
    },
    inactiveDays: diffInDays,
    inactiveMonths: diffInMonths,
    thresholdMonths: INACTIVE_THRESHOLD_MONTHS,
    actionRequired: isInactive
      ? "Studio admin should compose and publish a new journal story, material study, or project monograph."
      : "None.",
  };

  return NextResponse.json(payload, { status: 200 });
}
