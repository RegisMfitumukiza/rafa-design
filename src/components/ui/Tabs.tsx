"use client";

import { useId, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id);
  const baseId = useId();
  const tablistRef = useRef<HTMLDivElement>(null);

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeTab),
  );

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const nextIndex = (() => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          return (activeIndex + 1) % tabs.length;
        case "ArrowLeft":
        case "ArrowUp":
          return (activeIndex - 1 + tabs.length) % tabs.length;
        case "Home":
          return 0;
        case "End":
          return tabs.length - 1;
        default:
          return undefined;
      }
    })();

    if (nextIndex === undefined) return;

    e.preventDefault();
    const nextTab = tabs[nextIndex];
    if (!nextTab) return;
    handleTabClick(nextTab.id);
    tablistRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${nextTab.id}"]`)?.focus();
  };

  return (
    <div className={className}>
      <div
        ref={tablistRef}
        className="border-border flex border-b"
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              id={`${baseId}-tab-${tab.id}`}
              data-tab-id={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "px-md py-sm motion-safe:duration-base text-sm font-medium transition-colors",
                isActive
                  ? "border-foreground text-foreground border-b-2"
                  : "text-foreground/50 hover:text-foreground/80",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== activeTab}
          className="pt-md"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
