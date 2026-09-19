"use client";

import Link from "next/link";
import { Fragment, type ReactNode } from "react";

import { Logo } from "@/components/layout/Logo";
import { footerContent } from "@/content/footer";
import { supportingNavLinks } from "@/content/navigation";
import { ui } from "@/content/ui";
import { useContact } from "@/features/contact/contact-context";
import { MenuSearch } from "@/features/navigation/menu-search";
import { useNavigation } from "@/features/navigation/navigation-context";
import { PrimaryNavIndex } from "@/features/navigation/primary-nav-index";
import { useServices } from "@/features/services/services-context";
import { useSiteConfig } from "@/features/site/site-config-context";
import { capitalize } from "@/lib/capitalize";
import { cn } from "@/lib/cn";
import { useStudioTime } from "@/lib/studio-time";

interface FooterProps {
  className?: string;
}

const overlineClassName =
  "text-foreground/40 mb-md font-mono text-overline tracking-[0.2em] uppercase";
const directoryLinkClassName =
  "text-foreground/60 hover:text-foreground inline-flex min-h-(--touch-target) items-center text-sm transition-colors";

export function Footer({ className }: FooterProps) {
  const contactInformation = useContact();
  const config = useSiteConfig();
  const services = useServices();
  const { careersCount } = useNavigation();
  const { studio, rights } = footerContent;
  const year = new Date().getFullYear();
  const socialLinks = contactInformation.socialLinks.filter((link) => link.url !== "#");
  const { formatted: studioTimeFormatted } = useStudioTime();
  const phoneHref = contactInformation.phone
    ? `tel:${contactInformation.phone.replace(/\s+/g, "")}`
    : null;

  // Derive city and country from the primary office; fall back to address string.
  const primaryOffice = contactInformation.offices?.[0];
  const studioCity = primaryOffice?.city ?? "";
  const studioCountry = primaryOffice?.country ?? "";
  const studioLocation =
    studioCity && studioCountry
      ? `${studioCity}, ${studioCountry}`
      : (contactInformation.address ?? "");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const subFooterItems: ReactNode[] = socialLinks.map((link) => (
    <a
      key={`${link.platform}-${link.url}`}
      href={link.url}
      className="hover:text-foreground inline-flex min-h-(--touch-target) items-center font-mono text-xs transition-colors"
      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
      rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
    >
      {link.label || capitalize(link.platform)}
    </a>
  ));

  subFooterItems.push(
    <button
      key="back-to-top"
      type="button"
      onClick={scrollToTop}
      className="hover:text-foreground gap-xs inline-flex min-h-(--touch-target) items-center font-mono text-xs transition-colors"
    >
      Back to top &uarr;
    </button>,
  );

  return (
    <footer className={cn("border-border bg-background border-t", className)}>
      <div className="container-standard py-xl md:py-2xl">
        <div className="gap-xl lg:gap-md grid items-start lg:grid-cols-12">
          {/* Brand & Studio Location Anchor */}
          <div className="gap-sm flex flex-col lg:col-span-4">
            <Logo variant="footer" />
            <p className="text-foreground/60 max-w-[20rem] text-sm">
              {config.tagline ?? studio.tagline}
            </p>
            <p className="text-foreground/40 text-overline font-mono tracking-[0.2em] uppercase">
              {studioLocation}
              {contactInformation.coordinates ? ` [${contactInformation.coordinates}]` : ""} ·{" "}
              {studioTimeFormatted}
            </p>

            <div className="border-border/30 mt-md pt-md border-t">
              <MenuSearch />
            </div>
          </div>

          {/* Directory Column 1 — General Primary Index */}
          <nav aria-label={ui.navigation.footer} className="lg:col-span-2">
            <p className={overlineClassName}>{ui.navigation.general}</p>
            <PrimaryNavIndex variant="compact" />
          </nav>

          {/* Directory Column 2 — Disciplines */}
          <div className="lg:col-span-3">
            <p className={overlineClassName}>{ui.navigation.disciplines}</p>
            <ul className="gap-xs flex flex-col">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className={directoryLinkClassName}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory Column 3 — Practice & Connect */}
          <div className="lg:col-span-3">
            <p className={overlineClassName}>
              {ui.navigation.menu} {/* Practice */}
            </p>
            <ul className="gap-xs flex flex-col">
              {supportingNavLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className={directoryLinkClassName}>
                    {link.label}
                    {link.path === "/careers" && careersCount > 0 && (
                      <span className="text-accent ml-xs font-medium">({careersCount})</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="gap-xs mt-md pt-xs border-border/30 flex flex-col border-t">
              <a href={`mailto:${contactInformation.email}`} className={directoryLinkClassName}>
                {contactInformation.email}
              </a>
              {phoneHref && (
                <a href={phoneHref} className={directoryLinkClassName}>
                  {contactInformation.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Sub-footer Bar */}
        <div className="border-border/40 text-foreground/40 mt-xl gap-sm pt-md flex flex-col items-center justify-between border-t text-xs md:flex-row">
          <p>
            &copy; {year} {config.name}. {rights}
          </p>
          <div className="gap-sm lg:gap-md flex flex-wrap items-center justify-center">
            {subFooterItems.map((item, index) => (
              <Fragment key={index}>
                {index > 0 && (
                  <span aria-hidden="true" className="text-foreground/30">
                    &bull;
                  </span>
                )}
                {item}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
