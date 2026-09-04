import type { Metadata } from "next";

import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/config/schema";
import { contactInformation as fallbackContact } from "@/content/company/contact";
import { pageContent } from "@/content/pages";
import { ui } from "@/content/ui";
import { ContactEditorial } from "@/features/contact/contact-editorial";
import { ContactForm } from "@/features/contact/contact-form";
import { ContactInformation } from "@/features/contact/contact-information";
import { OfficeMap } from "@/features/contact/office-map";
import { Reveal } from "@/motion";
import { getContactInformation, getPageIntros } from "@/sanity/lib";

export async function generateMetadata(): Promise<Metadata> {
  const cmsIntros = await getPageIntros();
  const title = cmsIntros.contact?.title ?? pageContent.contact.title;
  const description = cmsIntros.contact?.description ?? pageContent.contact.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ContactPage() {
  const contact = pageContent.contact;
  const cmsContact = await getContactInformation();
  const cmsIntros = await getPageIntros();
  const contactInfo = cmsContact ?? fallbackContact;

  const cmsContactIntro = cmsIntros.contact ?? {};
  const overline = cmsContactIntro.overline ?? contact.overline;
  const title = cmsContactIntro.title ?? contact.title;
  const description = cmsContactIntro.description ?? contact.description;
  const briefHeading = cmsContactIntro.briefHeading ?? contact.briefHeading;

  const { email, editorialImage } = contactInfo;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />

      {/* ── 1. PATTERN B 12-COLUMN SPLIT HEADER ── */}
      <Section container="wide">
        <Reveal>
          <div className="gap-x-xl gap-y-md grid items-start md:grid-cols-12">
            {/* Left 6 cols: Title */}
            <div className="md:col-span-6 lg:col-span-6">
              <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                {overline}
              </p>
              <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                {title}
              </h1>
            </div>
            {/* Right 6 cols: Description */}
            <div className="md:pt-md md:col-span-6 lg:col-span-6">
              <p className="text-foreground/70 w-full text-xl leading-relaxed md:text-2xl">
                {description}
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── 2. STUDIO SPECIFICATION INDEX & PROJECT BRIEF FORM ── */}
      <Section container="wide" className="mt-xl md:mt-2xl">
        <div className="gap-x-2xl gap-y-xl grid items-start md:grid-cols-12">
          {/* Left 5 cols: Architectural Specification Index */}
          <div className="md:col-span-5">
            <Reveal>
              <ContactInformation info={contactInfo} />
            </Reveal>
          </div>

          {/* Right 7 cols: Project Brief Form */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div>
                <p className="text-foreground/40 mb-xs font-mono text-[10px] tracking-widest uppercase">
                  {ui.contact.inquiryOverline}
                </p>
                <h2 className="font-display text-foreground mb-lg text-2xl font-medium tracking-tight md:text-3xl">
                  {briefHeading}
                </h2>
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── 3. ATELIER LOCATION VIEWER ── */}
      <Section container="wide" className="mt-2xl">
        <OfficeMap offices={contactInfo.offices} />
      </Section>

      {/* ── 4. HUMAN CONTEXT & EDITORIAL CLOSING ── */}
      <Section container="wide" className="mt-2xl mb-2xl">
        <ContactEditorial editorialImage={editorialImage} email={email} intro={cmsContactIntro} />
      </Section>
    </>
  );
}
