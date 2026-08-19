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
        <p className="text-foreground/40 mb-xs font-mono text-[10px] tracking-widest uppercase">
          {ui.contact.directInquiryOverline}
        </p>
        <div className="space-y-xs font-mono text-sm">
          <p>
            <span className="text-foreground/40 mr-2 text-[10px] tracking-wider uppercase">
              EMAIL:
            </span>
            <a
              href={`mailto:${info.email}`}
              className="text-foreground/90 hover:text-foreground font-medium underline underline-offset-4 transition-colors"
            >
              {info.email}
            </a>
          </p>
          <p>
            <span className="text-foreground/40 mr-2 text-[10px] tracking-wider uppercase">
              PHONE:
            </span>
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
        <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
          {ui.contact.ateliersOverline}
        </p>
        <Stagger className="border-border/40 divide-border/40 divide-y border-y" stagger={0.06}>
          {info.offices.map((office, index) => (
            <div key={office.id} className="py-md space-y-xs">
              {/* Monospace Code & Name */}
              <div className="gap-sm flex items-baseline justify-between">
                <h3 className="text-foreground font-mono text-xs font-medium tracking-wider uppercase">
                  {String(index + 1).padStart(2, "0")} {"//"} {office.name}
                </h3>
                <span className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
                  {office.hours}
                </span>
              </div>

              {/* Address & Coordinates */}
              <p className="text-foreground/70 text-sm leading-relaxed">{office.address}</p>

              {/* Coordinates & Maps Link */}
              <div className="pt-xs gap-sm text-foreground/50 flex flex-wrap items-center justify-between font-mono text-[10px] tracking-widest uppercase">
                <span>GPS // {office.coordinates}</span>
                <a
                  href={office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground gap-xs inline-flex items-center underline underline-offset-2 transition-colors"
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
          <p className="text-foreground/40 mb-sm font-mono text-[10px] tracking-widest uppercase">
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
