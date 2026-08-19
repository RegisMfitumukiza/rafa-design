"use client";

import type { ContactInformation as ContactInfo } from "@/content/company/contact";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Stagger } from "@/motion";

interface ContactInformationProps {
  info: ContactInfo;
  className?: string;
}

/**
 * ContactInformation
 *
 * Ruled Architectural Specification Index of the practice's ateliers and studios.
 *
 * Structure per office row:
 *   01 // PORTO ATELIER
 *   Address · GPS Coordinates · Opening Hours · Direct Phone · Open in Maps ↗
 */
export function ContactInformation({ info, className }: ContactInformationProps) {
  const socialLinks = info.socialLinks.filter((link) => link.url !== "#");

  return (
    <div className={cn("space-y-xl", className ?? "")}>
      {/* Studio Header & Direct Contact */}
      <div>
        <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-xs">
          {ui.contact.directInquiryOverline}
        </p>
        <div className="space-y-xs font-mono text-sm">
          <p>
            <span className="text-foreground/40 mr-2 uppercase text-[10px] tracking-wider">EMAIL:</span>
            <a
              href={`mailto:${info.email}`}
              className="text-foreground/90 hover:text-foreground font-medium underline underline-offset-4 transition-colors"
            >
              {info.email}
            </a>
          </p>
          <p>
            <span className="text-foreground/40 mr-2 uppercase text-[10px] tracking-wider">PHONE:</span>
            <a
              href={`tel:${info.phone.replace(/\s+/g, "")}`}
              className="text-foreground/90 hover:text-foreground font-medium transition-colors"
            >
              {info.phone}
            </a>
          </p>
        </div>
      </div>

      {/* Ruled Office Specification Index */}
      <div>
        <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-md">
          {ui.contact.ateliersOverline}
        </p>
        <Stagger className="border-border/40 divide-border/40 divide-y border-y" stagger={0.06}>
          {info.offices.map((office, index) => (
            <div key={office.id} className="py-md space-y-xs">
              {/* Monospace Code & Name */}
              <div className="flex items-baseline justify-between gap-sm">
                <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-foreground">
                  {String(index + 1).padStart(2, "0")} // {office.name}
                </h3>
                <span className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                  {office.hours}
                </span>
              </div>

              {/* Address & Coordinates */}
              <p className="text-foreground/70 text-sm leading-relaxed">
                {office.address}
              </p>

              {/* Coordinates & Maps Link */}
              <div className="pt-xs flex flex-wrap items-center justify-between gap-sm font-mono text-[10px] tracking-widest uppercase text-foreground/50">
                <span>GPS // {office.coordinates}</span>
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground inline-flex items-center gap-xs underline underline-offset-2 transition-colors"
                >
                  <span>Open in Maps</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          ))}
        </Stagger>
      </div>

      {/* Social Networks */}
      {socialLinks.length > 0 && (
        <div>
          <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-sm">
            {ui.sections.follow}
          </p>
          <div className="gap-xs flex flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border/50 text-foreground/70 hover:border-foreground hover:bg-foreground hover:text-background px-md py-xs inline-flex items-center rounded-xs border font-mono text-[10px] font-medium tracking-wider uppercase transition-all duration-300"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
