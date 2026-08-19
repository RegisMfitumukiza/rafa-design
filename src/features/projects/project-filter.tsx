"use client";

import { FilterChips } from "@/components/ui/FilterChips";
import type { ProjectCategory } from "@/content/projects";

interface ProjectFilterProps {
  categories: ProjectCategory[];
  active: ProjectCategory | null;
  className?: string;
}

export function ProjectFilter({ categories, active, className }: ProjectFilterProps) {
  return <FilterChips categories={categories} active={active} className={className} />;
}
