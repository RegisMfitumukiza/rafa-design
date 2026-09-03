import { NextResponse } from "next/server";

import { contactInformation } from "@/content/company/contact";
import { getContactInformation } from "@/sanity/lib";

interface ContactPayload {
  name: string;
  email: string;
  organization?: string;
  projectType?: string;
  location?: string;
  timeline?: string;
  subject?: string;
  message: string;
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, organization, projectType, location, timeline, subject, message } = payload;

  if (!name || !name.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  if (!message || !message.trim()) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "The contact form is not configured yet. Please email us directly.",
      },
      { status: 503 },
    );
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const fromEmail = process.env.RESEND_FROM_EMAIL || "RAFA Design Hub <onboarding@resend.dev>";
    // Fetch recipient email from Sanity CMS, fallback to static config
    const cmsContact = await getContactInformation().catch(() => null);
    const toEmail = cmsContact?.email || contactInformation.email;

    const emailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : null,
      projectType ? `Project Type: ${projectType}` : null,
      location ? `Location: ${location}` : null,
      timeline ? `Timeline: ${timeline}` : null,
      "",
      "--- Project Brief ---",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: subject?.trim() || `[Inquiry] ${projectType || "Project"} — ${name}`,
      text: emailBody,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send your message. Please try again." },
      { status: 500 },
    );
  }
}
