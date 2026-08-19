"use client";

// ============================================================================
// READING INDEX MOBILE
// Bottom sheet navigation for mobile devices
// ============================================================================

import { useState, useEffect } from "react";

import type { JournalSection } from "@/content/journal";
import { cn } from "@/lib/cn";

interface ReadingIndexMobileProps {
  sections: JournalSection[];
  currentSection?: string;
  className?: string;
}

export function ReadingIndexMobile({
  sections,
  currentSection,
  className,
}: ReadingIndexMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Only show for articles with 4+ sections
  const shouldShow = sections.length >= 4;

  useEffect(() => {
    if (!shouldShow) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 400;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [shouldShow]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  if (!shouldShow) return null;

  // Filter out introduction
  const displaySections = sections.filter((s) => s.id !== "introduction");

  const currentIndex = displaySections.findIndex((s) => s.id === currentSection);

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed right-6 bottom-6 z-40 xl:hidden",
          "bg-background border-border rounded-sm border shadow-lg",
          "px-md py-sm",
          "gap-xs flex items-center",
          "transition-all duration-300",
          "hover:shadow-xl",
          isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
          className,
        )}
        aria-label="Open article navigation"
        aria-expanded={isOpen}
      >
        <span className="text-foreground/60 font-mono text-xs">
          ≡ {currentIndex + 1}/{displaySections.length}
        </span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm xl:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={cn(
          "fixed right-0 bottom-0 left-0 z-50 xl:hidden",
          "bg-background border-border border-t",
          "rounded-t-lg shadow-2xl",
          "transition-transform duration-300",
          "max-h-[70vh] overflow-y-auto",
          isOpen ? "translate-y-0" : "translate-y-full",
        )}
        role="dialog"
        aria-label="Article navigation"
      >
        <div className="p-lg">
          {/* Header */}
          <div className="mb-lg flex items-center justify-between">
            <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
              Index
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-foreground/60 hover:text-foreground text-2xl leading-none"
              aria-label="Close navigation"
            >
              ×
            </button>
          </div>

          {/* Sections */}
          <nav>
            <ul className="space-y-md">
              {displaySections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "py-sm w-full text-left transition-colors",
                      section.id === currentSection
                        ? "text-foreground font-medium"
                        : "text-foreground/60",
                    )}
                  >
                    {section.number && (
                      <span className="text-foreground/40 mr-sm font-mono text-xs">
                        {section.number}
                      </span>
                    )}
                    <span className="text-base">{section.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
