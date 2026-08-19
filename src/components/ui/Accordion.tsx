"use client";

import { ChevronDown } from "lucide-react";
import { createContext, useContext, useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("AccordionItem must be used within an Accordion");
  return ctx;
}

interface AccordionProps {
  children: ReactNode;
  type?: "single" | "multiple";
  className?: string;
}

export function Accordion({ children, type = "single", className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      if (type === "single") {
        return prev.includes(value) ? [] : [value];
      }
      return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("divide-border divide-y", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value, title, children, className }: AccordionItemProps) {
  const { openItems, toggleItem } = useAccordion();
  const isOpen = openItems.includes(value);
  const buttonId = useId();
  const contentId = useId();

  return (
    <div className={cn("py-sm", className)}>
      <button
        id={buttonId}
        onClick={() => toggleItem(value)}
        className="text-foreground flex w-full items-center justify-between text-left text-sm font-medium"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        {title}
        <ChevronDown
          className={cn(
            "text-foreground/50 motion-safe:duration-base size-4 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "transition-grid motion-safe:duration-base grid",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-sm text-foreground/60 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
