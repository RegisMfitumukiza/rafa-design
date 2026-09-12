import { NextResponse } from "next/server";

import { contactInformation } from "@/content/company/contact";
import { generateEditorialReminderEmail } from "@/lib/email/editorial-reminder-template";
import { client, getContactInformation, latestPublishedArticleQuery } from "@/sanity/lib";

interface LatestArticleRaw {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
}

interface EmailDeliveryTelemetry {
  attempted: boolean;
  sent: boolean;
  recipient?: string | undefined;
  subject?: string | undefined;
  id?: string | undefined;
  reason?: string | undefined;
  error?: string | undefined;
  dryRun?: boolean | undefined;
}

/**
 * GET /api/cron/editorial-reminder
 *
 * Automated Editorial Inactivity Cron Reminder & Email Dispatcher.
 * Audits the publishing cadence of the RAFA Journal archive.
 *
 * When no new article has been published for 6+ months (>= 180 days),
 * it formats a museum-grade architectural dispatch and sends an email alert
 * to the studio curation team via Resend.
 *
 * Invocation:
 *   - Vercel Cron: Scheduled monthly ("0 0 1 * *" in vercel.json)
 *   - Direct API request with header: `Authorization: Bearer <CRON_SECRET>`
 *
 * Diagnostic Parameters:
 *   - ?force=true   -> Force email generation regardless of elapsed duration
 *   - ?dryRun=true  -> Preview evaluation and email payload without sending via Resend
 */
export async function GET(request: Request) {
  // Authorization check (bypassed in development unless CRON_SECRET is configured)
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const url = new URL(request.url);
  const force = url.searchParams.get("force") === "true";
  const dryRun = url.searchParams.get("dryRun") === "true";

  // 1. Ultra-lightweight GROQ projection for the single latest published article
  let latestArticle: LatestArticleRaw | null = null;
  try {
    latestArticle = await client.fetch<LatestArticleRaw | null>(
      latestPublishedArticleQuery,
      {},
      { next: { revalidate: 0 } },
    );
  } catch (error) {
    console.error("[cron/editorial-reminder] Failed to fetch latest article from Sanity:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Failed to query Sanity CMS archive.",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }

  if (!latestArticle || !latestArticle.publishedAt) {
    return NextResponse.json(
      {
        status: "warning",
        alert: true,
        message: "No published articles found in the Sanity archive.",
      },
      { status: 200 },
    );
  }

  // 2. Elapsed duration calculations
  const latestDate = new Date(latestArticle.publishedAt);
  const now = new Date();
  const diffInMs = Math.max(0, now.getTime() - latestDate.getTime());
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInMonths = parseFloat((diffInDays / 30.44).toFixed(1));

  const INACTIVE_THRESHOLD_MONTHS = 6;
  const isInactive = diffInMonths >= INACTIVE_THRESHOLD_MONTHS;
  const shouldAlert = isInactive || force;

  // 3. Dynamic recipient resolution (CMS contact -> env var -> static fallback)
  let studioEmail = process.env.EDITORIAL_NOTIFICATION_EMAIL;
  if (!studioEmail) {
    try {
      const cmsContact = await getContactInformation();
      if (cmsContact?.email) {
        studioEmail = cmsContact.email;
      }
    } catch {
      // Fallback silently if CMS fetch fails
    }
  }
  if (!studioEmail) {
    studioEmail = contactInformation.email;
  }

  // 4. Resolve public site URL for email action buttons
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rafadesignhub.com";

  // 5. Generate branded architectural email templates
  const { subject, html, text } = generateEditorialReminderEmail({
    latestArticle,
    diffInDays,
    diffInMonths,
    thresholdMonths: INACTIVE_THRESHOLD_MONTHS,
    siteUrl,
  });

  // 6. Dispatch via Resend (or dry-run simulation)
  let emailDelivery: EmailDeliveryTelemetry = {
    attempted: false,
    sent: false,
  };

  if (shouldAlert) {
    if (dryRun) {
      emailDelivery = {
        attempted: false,
        sent: false,
        dryRun: true,
        recipient: studioEmail,
        subject,
      };
    } else {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        emailDelivery = {
          attempted: false,
          sent: false,
          recipient: studioEmail,
          reason: "RESEND_API_KEY environment variable is not configured.",
        };
      } else {
        try {
          const { Resend } = await import("resend");
          const resend = new Resend(apiKey);

          const senderAddress = process.env.RESEND_FROM_EMAIL || "editorial@rafadesignhub.com";
          const fromEmail = senderAddress.includes("<")
            ? senderAddress
            : `RAFA Design Hub <${senderAddress}>`;

          const sendResult = await resend.emails.send({
            from: fromEmail,
            to: studioEmail,
            subject,
            html,
            text,
          });

          emailDelivery = {
            attempted: true,
            sent: true,
            recipient: studioEmail,
            subject,
            ...(sendResult.data?.id ? { id: sendResult.data.id } : {}),
          };
        } catch (dispatchError) {
          console.error(
            "[cron/editorial-reminder] Failed to deliver notification email via Resend:",
            dispatchError,
          );
          emailDelivery = {
            attempted: true,
            sent: false,
            recipient: studioEmail,
            error: dispatchError instanceof Error ? dispatchError.message : String(dispatchError),
          };
        }
      }
    }
  }

  // 7. Structured operational response
  const payload = {
    status: isInactive ? "warning" : "active",
    alert: shouldAlert,
    forced: force,
    message: isInactive
      ? `INACTIVE EDITORIAL REMINDER: No new article published for ${diffInMonths} months (${diffInDays} days).`
      : force
        ? `CADENCE FORCED ALERT: Diagnostic trigger requested. Latest article published ${diffInMonths} months ago.`
        : `Editorial archive active. Latest article published ${diffInMonths} months ago.`,
    latestArticle: {
      title: latestArticle.title,
      slug: latestArticle.slug,
      publishedAt: latestArticle.publishedAt,
    },
    metrics: {
      inactiveDays: diffInDays,
      inactiveMonths: diffInMonths,
      thresholdMonths: INACTIVE_THRESHOLD_MONTHS,
    },
    actionRequired:
      isInactive || force
        ? "Studio curation team should compose and publish a new research essay, project monograph, or material study."
        : "None.",
    email: emailDelivery,
  };

  return NextResponse.json(payload, { status: 200 });
}
