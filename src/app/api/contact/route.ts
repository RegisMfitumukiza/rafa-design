import { NextResponse } from "next/server";

import { contactInformation } from "@/content/company/contact";

interface ContactPayload {
  name: string;
  email: string;
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

  const { name, email, subject, message } = payload;

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

    await resend.emails.send({
      from: "RAFA Design Hub <onboarding@resend.dev>",
      to: contactInformation.email,
      replyTo: email,
      subject: subject?.trim() || `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send your message. Please try again." },
      { status: 500 },
    );
  }
}
