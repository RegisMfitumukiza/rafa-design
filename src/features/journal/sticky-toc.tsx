"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

interface TOCSection {
  id: string;
  title: string;
}

interface StickyTOCProps {
  sections: TOCSection[];
  className?: string;
}

export function StickyTOC({ sections, className }: StickyTOCProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show TOC after scrolling past hero
    const handleScroll = () => {
      const scrolled = window.scrollY > 600;
      setIsVisible(scrolled);
    };

    // Track which section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      },
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [sections]);

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

  if (sections.length < 3) return null; // Don't show for short articles

  return (
    <aside
      className={cn(
        "fixed top-32 right-8 hidden w-60 transition-opacity duration-300 xl:block",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
    >
      <div className="border-border pl-md border-l">
        <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
          Specification // Index
        </p>

        <nav aria-label="Article sections">
          <ul className="space-y-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "hover:text-foreground w-full text-left text-sm transition-colors",
                    activeSection === section.id
                      ? "text-foreground font-medium"
                      : "text-foreground/40",
                  )}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
