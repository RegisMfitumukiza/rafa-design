"use client";

// ============================================================================
// READING INDEX
// Scroll-aware navigation for long-form articles
// ============================================================================

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/cn";
import type { JournalSection } from "@/content/journal";

interface ReadingIndexProps {
  sections: JournalSection[];
  estimatedReadingTime?: number;
  className?: string;
}

export function ReadingIndex({ 
  sections, 
  estimatedReadingTime,
  className 
}: ReadingIndexProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Only show for articles with 4+ sections or 5+ min reading time
  const shouldShow = sections.length >= 4 || (estimatedReadingTime && estimatedReadingTime >= 5);

  useEffect(() => {
    if (!shouldShow) return;

    // Show index after scrolling past hero (600px)
    // Hide when reaching footer (detect related articles or footer section)
    const handleScroll = () => {
      const scrolled = window.scrollY > 600;
      
      // Check if we're near the bottom (hide Reading Index before footer)
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      const nearBottom = distanceFromBottom < 800; // Hide 800px before bottom
      
      setIsVisible(scrolled && !nearBottom);

      // Calculate read progress
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadProgress(Math.min(100, Math.max(0, progress)));
    };

    // Track which section is in view
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with highest intersection ratio
        let maxRatio = 0;
        let activeId: string | null = null;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            if (entry.target instanceof HTMLElement) {
              activeId = entry.target.id;
            }
          }
        });

        if (activeId) {
          setActiveSection(activeId);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, shouldShow]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!shouldShow) return null;

  // Filter out introduction section for cleaner display
  const displaySections = sections.filter(s => s.id !== "introduction");

  return (
    <aside
      className={cn(
        "hidden xl:block fixed top-1/2 -translate-y-1/2 right-8 w-64 transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none",
        className,
      )}
      aria-label="Article navigation"
    >
      {/* Progress indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border">
        <div
          className="w-full bg-foreground/20 transition-all duration-300"
          style={{ height: `${readProgress}%` }}
        />
      </div>

      <div className="pl-md">
        <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-md">
          Index
        </p>

        <nav>
          <ul className="space-y-sm">
            {displaySections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "text-left text-sm transition-all duration-200 hover:text-foreground w-full group",
                    activeSection === section.id
                      ? "text-foreground font-medium"
                      : "text-foreground/40",
                  )}
                >
                  {section.number && (
                    <span className="font-mono text-xs mr-sm">
                      {section.number}
                    </span>
                  )}
                  <span className={cn(
                    "inline-block transition-transform",
                    activeSection === section.id && "translate-x-1",
                  )}>
                    {section.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {estimatedReadingTime && (
          <p className="text-foreground/30 font-mono text-xs mt-lg">
            {estimatedReadingTime} min
          </p>
        )}
      </div>
    </aside>
  );
}
