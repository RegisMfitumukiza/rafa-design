"use client";

// ============================================================================
// READING INDEX MOBILE
// Bottom sheet navigation for mobile devices
// ============================================================================

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { JournalSection } from "@/content/journal";

interface ReadingIndexMobileProps {
  sections: JournalSection[];
  currentSection?: string;
  className?: string;
}

export function ReadingIndexMobile({ 
  sections, 
  currentSection,
  className 
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
  const displaySections = sections.filter(s => s.id !== "introduction");
  
  const currentSectionData = displaySections.find(s => s.id === currentSection);
  const currentIndex = displaySections.findIndex(s => s.id === currentSection);

  return (
    <>
      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "xl:hidden fixed bottom-6 right-6 z-40",
          "bg-background border-border border shadow-lg rounded-sm",
          "px-md py-sm",
          "flex items-center gap-xs",
          "transition-all duration-300",
          "hover:shadow-xl",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
          className,
        )}
        aria-label="Open article navigation"
        aria-expanded={isOpen}
      >
        <span className="font-mono text-xs text-foreground/60">
          ≡ {currentIndex + 1}/{displaySections.length}
        </span>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={cn(
          "xl:hidden fixed bottom-0 left-0 right-0 z-50",
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
          <div className="flex items-center justify-between mb-lg">
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
                      "text-left w-full py-sm transition-colors",
                      section.id === currentSection
                        ? "text-foreground font-medium"
                        : "text-foreground/60",
                    )}
                  >
                    {section.number && (
                      <span className="font-mono text-xs text-foreground/40 mr-sm">
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
