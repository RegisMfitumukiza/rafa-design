"use client";

import { useEffect, useState } from "react";

import type { ExtractedHeading } from "@/features/journal/document/heading-utils";
import { cn } from "@/lib/cn";

interface ReadingIndexRailProps {
  headings: ExtractedHeading[];
  className?: string;
}

export function ReadingIndexRail({ headings, className }: ReadingIndexRailProps) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id || null);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      // 160px from top represents the natural reading baseline
      const scrollPosition = window.scrollY + 160;
      let currentActive = headings[0]?.id || null;

      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        if (!heading) continue;
        const el = document.getElementById(heading.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            currentActive = heading.id;
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className={cn("space-y-md sticky top-28", className)} aria-label="Table of Contents">
      <div className="border-border/20 pt-sm border-t">
        <p className="text-foreground/35 mb-md font-mono text-[10px] tracking-widest uppercase">
          Index {"//"} Sections
        </p>

        <nav>
          <ul className="border-border/20 space-y-1 border-l pl-2">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              return (
                <li key={heading.id}>
                  <button
                    type="button"
                    onClick={() => scrollToHeading(heading.id)}
                    className={cn(
                      "group flex w-full items-baseline gap-2 rounded-xs px-2 py-1.5 text-left text-xs leading-relaxed transition-all duration-200",
                      isActive
                        ? "bg-foreground/[0.08] text-foreground border-foreground -ml-[9px] border-l-2 pl-2 font-medium"
                        : "text-foreground/45 hover:bg-foreground/[0.03] hover:text-foreground/85",
                    )}
                  >
                    {heading.number ? (
                      <span
                        className={cn(
                          "shrink-0 font-mono text-[10px] tracking-wider transition-colors",
                          isActive ? "text-foreground font-semibold" : "text-foreground/40",
                        )}
                      >
                        {heading.number}
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                          isActive ? "bg-foreground" : "bg-transparent",
                        )}
                      />
                    )}
                    <span className="line-clamp-2">{heading.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
