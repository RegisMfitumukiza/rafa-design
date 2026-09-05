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

    const senderAddress = process.env.RESEND_FROM_EMAIL || "noreply@rafadesignhub.com";
    const fromEmail = senderAddress.includes("<")
      ? senderAddress
      : `RAFA Design Hub <${senderAddress}>`;

    // Fetch studio recipient email from Sanity CMS, fallback to static config (rafadesignhub@gmail.com)
    const cmsContact = await getContactInformation().catch(() => null);
    const studioEmail = cmsContact?.email || contactInformation.email;

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

    // 1. Send inquiry details to studio inbox (rafadesignhub@gmail.com)
    await resend.emails.send({
      from: fromEmail,
      to: studioEmail,
      replyTo: email,
      subject: subject?.trim() || `[Inquiry] ${projectType || "Project"} — ${name}`,
      text: emailBody,
    });

    // 2. Send automated confirmation to the client
    try {
      const clientConfirmationBody = [
        `Dear ${name},`,
        "",
        "Thank you for contacting RAFA Design Hub.",
        "",
        `We have received your project brief regarding ${projectType || "your upcoming project"} and our team is currently reviewing your inquiry. We respond to all new engagements within two working days.`,
        "",
        "--- Summary of Your Inquiry ---",
        `Discipline: ${projectType || "Architecture & Design"}`,
        organization ? `Organization: ${organization}` : null,
        location ? `Location: ${location}` : null,
        timeline ? `Timeline: ${timeline}` : null,
        "",
        "Brief:",
        message,
        "",
        `If you have architectural plans, drawings, or reference material to share in the meantime, please reply directly to this email or write to ${studioEmail}.`,
        "",
        "Kind regards,",
        "",
        "RAFA Design Hub",
        "Kigali, Rwanda",
        "https://rafadesignhub.com",
      ]
        .filter(Boolean)
        .join("\n");

      await resend.emails.send({
        from: fromEmail,
        to: email,
        replyTo: studioEmail,
        subject: `Inquiry Received // RAFA Design Hub`,
        text: clientConfirmationBody,
      });
    } catch (clientEmailError) {
      console.warn("Could not send client confirmation email:", clientEmailError);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send your message. Please try again." },
      { status: 500 },
    );
  }
}
