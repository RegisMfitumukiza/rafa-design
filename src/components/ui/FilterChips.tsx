"use client";

import { useRouter } from "next/navigation";

import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";

interface FilterChipsProps<T extends string> {
  categories: T[];
  active: T | null;
  className?: string | undefined;
}

export function FilterChips<T extends string>({
  categories,
  active,
  className,
}: FilterChipsProps<T>) {
  const router = useRouter();

  function select(category: T | null) {
    const params = new URLSearchParams();
    if (category) {
      params.set("category", category);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className={cn("mb-xl gap-sm flex flex-wrap", className)}>
      <button
        type="button"
        onClick={() => select(null)}
        className={cn(
          "px-md min-h-(--touch-target) rounded-full text-sm transition-colors",
          active === null
            ? "bg-foreground text-background"
            : "bg-muted text-foreground/60 hover:text-foreground",
        )}
        aria-pressed={active === null}
      >
        {ui.filters.all}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => select(cat)}
          className={cn(
            "px-md min-h-(--touch-target) rounded-full text-sm capitalize transition-colors",
            active === cat
              ? "bg-foreground text-background"
              : "bg-muted text-foreground/60 hover:text-foreground",
          )}
          aria-pressed={active === cat}
        >
          {cat.replace("-", " ")}
        </button>
      ))}
    </div>
  );
}
