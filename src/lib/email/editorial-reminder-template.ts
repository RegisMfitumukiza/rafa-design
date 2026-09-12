/**
 * Editorial Reminder Email Template Generator
 *
 * Formats a museum-grade architectural email notification for studio editors
 * when the Journal archive exceeds the inactivity threshold (6 months / 180 days).
 */

export interface EditorialReminderEmailOptions {
  latestArticle: {
    title: string;
    slug: string;
    publishedAt: string;
  };
  diffInDays: number;
  diffInMonths: number;
  thresholdMonths: number;
  siteUrl: string;
}

export function generateEditorialReminderEmail({
  latestArticle,
  diffInDays,
  diffInMonths,
  thresholdMonths,
  siteUrl,
}: EditorialReminderEmailOptions): { subject: string; html: string; text: string } {
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");
  const studioUrl = `${normalizedSiteUrl}/admin/structure/journalArticle`;
  const archiveUrl = `${normalizedSiteUrl}/journal`;
  const latestArticleUrl = `${normalizedSiteUrl}/journal/${latestArticle.slug}`;
  const formattedDate = new Date(latestArticle.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const subject = `[Editorial Alert] RAFA Journal Inactive for ${diffInMonths} Months`;

  const text = `
RAFA DESIGN // EDITORIAL CADENCE AUDIT
============================================================

STATUS: INACTIVITY THRESHOLD EXCEEDED
No new architectural journal story or monograph has been published for ${diffInDays} days (~${diffInMonths} months).
The studio policy threshold is ${thresholdMonths} months (180 days).

--- EDITORIAL LEDGER ---
• Latest Published Story: "${latestArticle.title}"
• Publication Date:       ${formattedDate}
• Story URL:              ${latestArticleUrl}
• Inactivity Duration:    ${diffInDays} days (${diffInMonths} months)
• Threshold:              ${thresholdMonths} months

--- ACTION REQUIRED ---
Studio curation team should compose and publish a new research essay, project monograph, or material study to maintain architectural thought leadership.

Draft in Sanity Studio:
${studioUrl}

View Published Journal Archive:
${archiveUrl}

============================================================
RAFA Design Hub · Architectural Practice & Thought Leadership
Kigali, Rwanda · Automated Editorial Monitor
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0d0d0d;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #e6e6e6;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0d0d0d;
      padding: 40px 16px;
      box-sizing: border-box;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #141414;
      border: 1px solid #282828;
      border-radius: 4px;
      overflow: hidden;
    }
    .header {
      padding: 24px 32px;
      border-bottom: 1px solid #222222;
      background-color: #161616;
    }
    .brand {
      font-family: "SF Mono", Consolas, "Courier New", monospace;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #8a8a8a;
      margin: 0 0 6px 0;
    }
    .title {
      font-size: 18px;
      font-weight: 500;
      letter-spacing: -0.01em;
      color: #ffffff;
      margin: 0;
    }
    .content {
      padding: 32px;
    }
    .badge-bar {
      display: inline-block;
      background-color: #241414;
      border: 1px solid #4a2222;
      color: #e57373;
      font-family: "SF Mono", Consolas, "Courier New", monospace;
      font-size: 11px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 2px;
      margin-bottom: 20px;
    }
    .narrative {
      font-size: 14px;
      line-height: 1.6;
      color: #b3b3b3;
      margin: 0 0 28px 0;
    }
    .ledger {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 32px;
      background-color: #111111;
      border: 1px solid #222222;
      border-radius: 3px;
    }
    .ledger-row td {
      padding: 12px 16px;
      border-bottom: 1px solid #1a1a1a;
      font-size: 13px;
    }
    .ledger-row:last-child td {
      border-bottom: none;
    }
    .ledger-label {
      width: 38%;
      color: #707070;
      font-family: "SF Mono", Consolas, "Courier New", monospace;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .ledger-value {
      color: #f0f0f0;
      font-weight: 500;
    }
    .cta-container {
      margin-top: 28px;
      padding-top: 24px;
      border-top: 1px solid #222222;
    }
    .button-primary {
      display: inline-block;
      background-color: #f4f4f4;
      color: #0a0a0a !important;
      text-decoration: none;
      font-family: "SF Mono", Consolas, "Courier New", monospace;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 12px 22px;
      border-radius: 2px;
      margin-right: 12px;
      margin-bottom: 10px;
    }
    .button-secondary {
      display: inline-block;
      background-color: transparent;
      color: #999999 !important;
      text-decoration: none;
      border: 1px solid #333333;
      font-family: "SF Mono", Consolas, "Courier New", monospace;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 11px 20px;
      border-radius: 2px;
      margin-bottom: 10px;
    }
    .footer {
      padding: 24px 32px;
      background-color: #0f0f0f;
      border-top: 1px solid #1e1e1e;
      font-family: "SF Mono", Consolas, "Courier New", monospace;
      font-size: 11px;
      color: #555555;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <p class="brand">RAFA DESIGN // EDITORIAL CADENCE AUDIT</p>
        <h1 class="title">Journal Inactivity Reminder</h1>
      </div>
      <div class="content">
        <div class="badge-bar">● Inactive Duration: ${diffInMonths} Months</div>
        <p class="narrative">
          No new architectural journal article, material study, or project monograph has been published to the RAFA Design archive in <strong>${diffInDays} days</strong>. Maintaining regular publishing momentum is vital for the studio's digital thought leadership.
        </p>

        <table class="ledger" cellpadding="0" cellspacing="0">
          <tr class="ledger-row">
            <td class="ledger-label">Latest Story</td>
            <td class="ledger-value">
              <a href="${latestArticleUrl}" style="color: #ffffff; text-decoration: underline;">
                ${latestArticle.title}
              </a>
            </td>
          </tr>
          <tr class="ledger-row">
            <td class="ledger-label">Published Date</td>
            <td class="ledger-value">${formattedDate}</td>
          </tr>
          <tr class="ledger-row">
            <td class="ledger-label">Inactivity</td>
            <td class="ledger-value" style="color: #e57373;">${diffInDays} days (~${diffInMonths} months)</td>
          </tr>
          <tr class="ledger-row">
            <td class="ledger-label">Cadence Goal</td>
            <td class="ledger-value">Publish at least once every ${thresholdMonths} months</td>
          </tr>
        </table>

        <div class="cta-container">
          <a href="${studioUrl}" class="button-primary">Compose in Sanity Studio →</a>
          <a href="${archiveUrl}" class="button-secondary">Browse Archive</a>
        </div>
      </div>
      <div class="footer">
        RAFA Design Hub · Architectural Studio · Kigali, Rwanda<br>
        Automated monthly audit via Vercel Cron · To adjust thresholds, inspect <code>/api/cron/editorial-reminder</code>.
      </div>
    </div>
  </div>
</body>
</html>
`.trim();

  return { subject, html, text };
}
