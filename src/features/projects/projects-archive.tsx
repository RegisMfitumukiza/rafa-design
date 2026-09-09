"use client";

import { gsap } from "gsap";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Image } from "@/components/media/Image";
import type { Project, ProjectCategory } from "@/content/projects";
import { FeaturedProjectCard } from "@/features/projects/featured-project-card";
import { ProjectCard } from "@/features/projects/project-card";
import { cn } from "@/lib/cn";
import { Reveal, Stagger, useReducedMotion } from "@/motion";

type ViewMode = "grid" | "list" | "map";

export interface ProjectsIntro {
  overline?: string;
  title?: string;
  description?: string;
}

interface ProjectsArchiveProps {
  initialProjects: Project[];
  categories: ProjectCategory[];
  intro?: ProjectsIntro;
}

/**
 * Derives an editorial grid pattern for a set of projects.
 * Rows alternate between: [full], [2-col], [3-col], with a repeat accent [full] every 7 items.
 *
 * Layout key:
 *   "full"   → col-span-full (editorial accent)
 *   "half"   → md:col-span-1 (2-col row pair)
 *   "third"  → lg:col-span-1 (3-col row trio)
 */
function getEditorialSpan(index: number): string {
  const pos = index % 11;
  // Full-width accent mid-way through cycle at pos 6 (featured hero card at top is the single primary hero)
  if (pos === 6) return "col-span-full";
  return "md:col-span-1 lg:col-span-1";
}

function getEditorialAspect(index: number): string {
  const pos = index % 11;
  if (pos === 6) return "aspect-[21/9]";
  return "aspect-[4/3]";
}

const BATCH_SIZE = 12;

export function ProjectsArchive({ initialProjects, categories, intro }: ProjectsArchiveProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTypology, setSelectedTypology] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);

  // Reset visible batch count whenever active filters change
  useEffect(() => {
    setTimeout(() => setVisibleCount(BATCH_SIZE), 0);
  }, [selectedCategory, selectedTypology, searchQuery]);

  // Cursor-following image preview state (list view only)
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Animated commission counter
  const countRef = useRef<HTMLSpanElement>(null);
  const prevCountRef = useRef<number | null>(null);

  // Extract unique typologies
  const typologies = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.typology && Array.isArray(p.typology) && p.typology.length > 0) {
        p.typology.forEach((t) => set.add(t));
      }
    });
    return Array.from(set);
  }, [initialProjects]);

  // Category & Typology counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProjects.length };
    categories.forEach((cat) => {
      counts[cat] = initialProjects.filter((p) =>
        p.category.includes(cat as ProjectCategory),
      ).length;
    });
    return counts;
  }, [initialProjects, categories]);

  const typologyCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProjects.length };
    typologies.forEach((typ) => {
      counts[typ] = initialProjects.filter((p) => p.typology?.includes(typ)).length;
    });
    return counts;
  }, [initialProjects, typologies]);

  // Filtered projects (sorted chronologically newest to oldest)
  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((project) => {
        if (
          selectedCategory !== "all" &&
          !project.category.includes(selectedCategory as ProjectCategory)
        ) {
          return false;
        }
        if (selectedTypology !== "all" && !project.typology?.includes(selectedTypology)) {
          return false;
        }
        if (searchQuery.trim() !== "") {
          const query = searchQuery.toLowerCase();
          const matchTitle = project.title.toLowerCase().includes(query);
          const matchLocation =
            project.location.city.toLowerCase().includes(query) ||
            project.location.country.toLowerCase().includes(query);
          const matchTypology =
            project.typology?.some((t) => t.toLowerCase().includes(query)) ?? false;
          if (!matchTitle && !matchLocation && !matchTypology) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }
        return b.year - a.year;
      });
  }, [initialProjects, selectedCategory, selectedTypology, searchQuery]);

  // ── Table Sorting (Spec Table Mode B) ──────────────────────────────────────
  type SortField = "ref" | "title" | "year" | "area" | "typology";
  type SortDirection = "asc" | "desc";

  const [tableSort, setTableSort] = useState<{ field: SortField; direction: SortDirection }>({
    field: "ref",
    direction: "asc",
  });

  const handleSortToggle = useCallback((field: SortField) => {
    setTableSort((prev) => {
      if (prev.field === field) {
        return { field, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { field, direction: field === "year" || field === "area" ? "desc" : "asc" };
    });
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedTypology("all");
    setSearchQuery("");
  }, []);

  const hasActiveFilters =
    selectedCategory !== "all" || selectedTypology !== "all" || searchQuery.trim() !== "";

  const sortedTableProjects = useMemo(() => {
    if (viewMode !== "list") return filteredProjects;
    return [...filteredProjects].sort((a, b) => {
      let comparison = 0;
      if (tableSort.field === "title") {
        comparison = a.title.localeCompare(b.title);
      } else if (tableSort.field === "year") {
        comparison = a.year - b.year;
      } else if (tableSort.field === "area") {
        comparison = (a.areaM2 ?? 0) - (b.areaM2 ?? 0);
      } else if (tableSort.field === "typology") {
        const typA = a.typology?.[0] ?? "";
        const typB = b.typology?.[0] ?? "";
        comparison = typA.localeCompare(typB);
      } else {
        return 0;
      }
      return tableSort.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredProjects, viewMode, tableSort]);

  // ── Animated count ─────────────────────────────────────────────────────────
  useEffect(() => {
    const el = countRef.current;
    if (!el || reduced) {
      if (el) el.textContent = String(filteredProjects.length).padStart(2, "0");
      return;
    }
    const from = prevCountRef.current ?? filteredProjects.length;
    const to = filteredProjects.length;
    if (from === to) return;

    const obj = { val: from };
    gsap.to(obj, {
      val: to,
      duration: 0.5,
      ease: "power2.out",
      onUpdate() {
        if (el) el.textContent = String(Math.round(obj.val)).padStart(2, "0");
      },
    });
    prevCountRef.current = to;
  }, [filteredProjects.length, reduced]);

  // ── Cursor follower (list view) ────────────────────────────────────────────
  useEffect(() => {
    if (viewMode !== "list" || reduced) return;
    const el = followerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(el, {
        x: e.clientX + 24,
        y: e.clientY - 80,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [viewMode, reduced]);

  // Show/hide follower
  useEffect(() => {
    const el = followerRef.current;
    if (!el || reduced) return;
    gsap.to(el, {
      autoAlpha: hoveredProject ? 1 : 0,
      scale: hoveredProject ? 1 : 0.88,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [hoveredProject, reduced]);

  const handleRowEnter = useCallback((project: Project) => {
    setHoveredProject(project);
  }, []);

  const handleRowLeave = useCallback(() => {
    setHoveredProject(null);
  }, []);

  // Slice displayed projects according to progressive visible batch limit
  const displayedProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount],
  );

  // Split featured card from rest for grid view
  const [featured, ...restProjects] = displayedProjects;

  return (
    <div className="gap-xl flex flex-col">
      {/* ── 01. EDITORIAL 12-COLUMN HEADER (Pattern B) ── */}
      <Reveal visible>
        <div className="gap-x-xl gap-y-md grid items-start md:grid-cols-12">
          {/* Left 6 cols: Title & Overline */}
          <div className="md:col-span-6 lg:col-span-6">
            <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
              {intro?.overline ?? "INDEX // ARCHITECTURAL PORTFOLIO"}
            </p>
            <h1 className="font-display text-foreground mt-sm text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {intro?.title ?? "Projects"}
            </h1>
          </div>
          {/* Right 6 cols: Narrative Statement & Archival Ledger */}
          <div className="md:pt-md md:col-span-6 lg:col-span-6">
            <p className="text-foreground/75 text-xl leading-relaxed font-light md:text-2xl">
              {intro?.description ??
                "Our projects are physical inquiries into space, light, and material longevity."}
            </p>

            {/* Archival Specification Ledger */}
            <div className="border-border/30 mt-lg pt-sm gap-x-md gap-y-xs flex flex-wrap items-baseline justify-between border-t font-mono text-[10px] tracking-widest uppercase">
              <div className="text-foreground/60 flex items-center gap-2">
                <span
                  className="bg-accent inline-block h-1.5 w-1.5 rounded-full"
                  aria-hidden="true"
                />
                <span>
                  <span ref={countRef} className="text-foreground font-bold">
                    {String(filteredProjects.length).padStart(2, "0")}
                  </span>{" "}
                  COMMISSIONS ARCHIVED
                </span>
              </div>
              <div className="gap-md text-foreground/40 flex items-center">
                <span className="hidden sm:inline">EST. 2020 — 2026</span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-accent hover:text-foreground underline underline-offset-2 transition-colors"
                  >
                    [ RESET FILTERS ]
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Taxonomy Toolbar ────────────────────────────────────────────────── */}
      <Reveal delay={0.1}>
        <div className="border-border/30 divide-border/30 divide-y border-y">
          {/* Row 1 — View mode switcher + search */}
          <div className="py-sm gap-sm flex flex-col justify-between sm:flex-row sm:items-center">
            {/* View mode */}
            <div className="gap-md flex items-center font-mono text-xs">
              {(["grid", "list", "map"] as ViewMode[]).map((mode, i) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "gap-xs flex items-center py-0.5 uppercase transition-colors",
                    viewMode === mode
                      ? "text-foreground font-medium"
                      : "text-foreground/40 hover:text-foreground/70",
                  )}
                >
                  {/* Active dot indicator */}
                  <span
                    className={cn(
                      "inline-block h-1 w-1 rounded-full transition-all duration-300",
                      viewMode === mode ? "bg-accent scale-100" : "scale-0 bg-transparent",
                    )}
                    aria-hidden="true"
                  />
                  0{i + 1}{" "}
                  {mode === "grid" ? "GRID" : mode === "list" ? "SPEC TABLE" : "GEOGRAPHIC INDEX"}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="[ SEARCH ARCHIVE_ ]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border/30 focus:border-foreground placeholder:text-foreground/35 py-xs w-full border-b bg-transparent font-mono text-xs transition-colors outline-none sm:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-foreground/40 hover:text-foreground absolute right-0 font-mono text-xs"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Row 2 — Category + Typology filter rails (Horizontal Scroll Rails with Gradient Fade & Count Badges) */}
          <div className="py-sm gap-sm flex flex-col font-mono text-xs">
            {/* Discipline Scroll Rail */}
            <div className="relative flex min-w-0 items-center">
              <span className="text-foreground/35 mr-md w-20 flex-shrink-0 text-[10px] tracking-widest uppercase select-none">
                Discipline
              </span>
              <div className="relative min-w-0 flex-1 overflow-hidden">
                <div className="gap-sm scrollbar-hide pr-lg flex items-center overflow-x-auto py-0.5 whitespace-nowrap">
                  {["all", ...categories].map((cat) => {
                    const count = categoryCounts[cat] ?? 0;
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "px-xs flex flex-shrink-0 items-center gap-1 py-0.5 tracking-wide uppercase transition-colors",
                          isActive
                            ? "text-foreground decoration-accent font-medium underline underline-offset-4"
                            : "text-foreground/40 hover:text-foreground/70",
                        )}
                      >
                        <span>{cat === "all" ? "All" : cat.replace("-", " ")}</span>
                        <span
                          className={cn(
                            "font-mono text-[9px]",
                            isActive ? "text-accent font-semibold" : "text-foreground/35",
                          )}
                        >
                          ({count})
                        </span>
                      </button>
                    );
                  })}
                </div>
                {/* Right fade gradient */}
                <div
                  aria-hidden="true"
                  className="from-background pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l to-transparent"
                />
              </div>
            </div>

            {/* Typology Scroll Rail */}
            {typologies.length > 0 && (
              <div className="border-border/15 pt-xs relative flex min-w-0 items-center border-t">
                <span className="text-foreground/35 mr-md w-20 flex-shrink-0 text-[10px] tracking-widest uppercase select-none">
                  Typology
                </span>
                <div className="relative min-w-0 flex-1 overflow-hidden">
                  <div className="gap-sm scrollbar-hide pr-lg flex items-center overflow-x-auto py-0.5 whitespace-nowrap">
                    {["all", ...typologies].map((typ) => {
                      const count = typologyCounts[typ] ?? 0;
                      const isActive = selectedTypology === typ;
                      return (
                        <button
                          key={typ}
                          onClick={() => setSelectedTypology(typ)}
                          className={cn(
                            "px-xs flex flex-shrink-0 items-center gap-1 py-0.5 tracking-wide uppercase transition-colors",
                            isActive
                              ? "text-foreground decoration-accent font-medium underline underline-offset-4"
                              : "text-foreground/40 hover:text-foreground/70",
                          )}
                        >
                          <span>{typ === "all" ? "All" : typ}</span>
                          <span
                            className={cn(
                              "font-mono text-[9px]",
                              isActive ? "text-accent font-semibold" : "text-foreground/35",
                            )}
                          >
                            ({count})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Right fade gradient */}
                  <div
                    aria-hidden="true"
                    className="from-background pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l to-transparent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* ── View Modes ─────────────────────────────────────────────────────── */}
      {filteredProjects.length === 0 ? (
        <div className="border-border/30 py-2xl my-xl flex flex-col items-center justify-center border text-center">
          <p className="text-foreground/35 font-mono text-[10px] tracking-widest uppercase">
            CRITERIA RETURNED 0 COMMISSIONS
          </p>
          <p className="font-display text-foreground mt-sm text-2xl font-medium tracking-tight">
            No architectural projects match your current selection
          </p>
          <p className="text-foreground/50 mt-xs max-w-md text-sm font-light">
            Try adjusting your discipline, typology, or search query to browse our wider portfolio
            archive.
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-lg py-sm border-border/60 hover:border-foreground hover:bg-foreground hover:text-background mt-lg rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
            >
              [ RESET ALL FILTERS ]
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        /* ── MODE A: Editorial Grid ─────────────────────────────────────────── */
        <div className="gap-xl flex flex-col">
          {/* Featured cinematic hero card — always first */}
          {featured && (
            <Reveal>
              <FeaturedProjectCard project={featured} />
            </Reveal>
          )}

          {/* Editorial grid — non-uniform column rhythm */}
          {restProjects.length > 0 && (
            <Stagger
              className="gap-xl grid items-start md:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0"
              stagger={0.07}
            >
              {restProjects.map((project, idx) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  variant="flat"
                  aspectClassName={getEditorialAspect(idx)}
                  className={getEditorialSpan(idx)}
                  titleAs="h2"
                />
              ))}
            </Stagger>
          )}

          {/* Progressive Load More Action Button */}
          {visibleCount < filteredProjects.length && (
            <div className="pt-xl border-border/20 flex flex-col items-center justify-center border-t">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + BATCH_SIZE)}
                className="px-lg py-md border-border/40 hover:border-foreground text-foreground group gap-md flex items-center border font-mono text-xs tracking-widest uppercase transition-all duration-300"
              >
                <span>LOAD MORE COMMISSIONS</span>
                <span className="text-foreground/40 group-hover:text-foreground font-light">
                  [{displayedProjects.length} / {filteredProjects.length}] ↓
                </span>
              </button>
            </div>
          )}
        </div>
      ) : viewMode === "list" ? (
        /* ── MODE B: Architectural Spec Table with cursor preview ───────────── */
        <div className="relative">
          {/* Cursor-following image preview (desktop only) */}
          <div
            ref={followerRef}
            aria-hidden="true"
            style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
            className="fixed top-0 left-0 z-[100] hidden h-40 w-56 overflow-hidden shadow-2xl md:block"
          >
            {hoveredProject && (
              <Image
                asset={hoveredProject.heroImage}
                className="h-full w-full object-cover"
                sizes="224px"
              />
            )}
          </div>

          <div className="border-border/30 divide-border/30 divide-y overflow-x-auto border-y">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-foreground/35 border-border/30 border-b uppercase">
                  <th
                    className="py-sm px-xs hover:text-foreground cursor-pointer font-mono font-medium tracking-widest select-none"
                    onClick={() => handleSortToggle("ref")}
                  >
                    REF{" "}
                    {tableSort.field === "ref" ? (tableSort.direction === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="py-sm px-xs hover:text-foreground cursor-pointer font-mono font-medium tracking-widest select-none"
                    onClick={() => handleSortToggle("title")}
                  >
                    PROJECT TITLE{" "}
                    {tableSort.field === "title" ? (tableSort.direction === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="py-sm px-xs hover:text-foreground cursor-pointer font-mono font-medium tracking-widest select-none"
                    onClick={() => handleSortToggle("typology")}
                  >
                    TYPOLOGY{" "}
                    {tableSort.field === "typology"
                      ? tableSort.direction === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th className="py-sm px-xs font-mono font-medium tracking-widest">LOCATION</th>
                  <th
                    className="py-sm px-xs hover:text-foreground cursor-pointer font-mono font-medium tracking-widest select-none"
                    onClick={() => handleSortToggle("area")}
                  >
                    AREA (M²){" "}
                    {tableSort.field === "area" ? (tableSort.direction === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="py-sm px-xs hover:text-foreground cursor-pointer font-mono font-medium tracking-widest select-none"
                    onClick={() => handleSortToggle("year")}
                  >
                    YEAR{" "}
                    {tableSort.field === "year" ? (tableSort.direction === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th className="py-sm px-xs font-mono font-medium tracking-widest">STATUS</th>
                  <th className="py-sm px-xs text-right font-mono font-medium tracking-widest">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-border/30 divide-y">
                {sortedTableProjects.map((project, i) => (
                  <tr
                    key={project.slug}
                    className="group hover:bg-foreground/[0.025] transition-colors"
                    onMouseEnter={() => handleRowEnter(project)}
                    onMouseLeave={handleRowLeave}
                  >
                    <td className="py-md px-xs text-foreground/30">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="py-md px-xs text-foreground font-medium underline-offset-4 group-hover:underline">
                      <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                    </td>
                    <td className="py-md px-xs text-foreground/55">
                      {project.typology &&
                      Array.isArray(project.typology) &&
                      project.typology.length > 0
                        ? project.typology.join(", ")
                        : "—"}
                    </td>
                    <td className="py-md px-xs text-foreground/55">
                      {project.location.city}, {project.location.country}
                    </td>
                    <td className="py-md px-xs text-foreground/55">
                      {project.areaM2 ? `${project.areaM2} m²` : "—"}
                    </td>
                    <td className="py-md px-xs text-foreground/55">{project.year}</td>
                    <td className="py-md px-xs text-foreground/55 uppercase">{project.status}</td>
                    <td className="py-md px-xs text-right">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="text-foreground/60 hover:text-foreground font-medium transition-colors"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        VIEW →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ── MODE C: Geographic Index ─────────────────────────────────────────── */
        <div>
          {/* Section header */}
          <div className="mb-md flex items-center justify-between">
            <p className="text-foreground/35 font-mono text-[10px] tracking-widest uppercase">
              GEOGRAPHIC INDEX // LOCATIONS PLOTTED
            </p>
            <span className="text-foreground/35 font-mono text-[10px]">
              {filteredProjects.length} COMMISSIONS
            </span>
          </div>

          <div className="border-border/30 flex flex-col gap-px border-t">
            {filteredProjects.map((project, i) => (
              /**
               * Stretched-link card pattern — avoids nesting <a> inside <a>.
               * The Link uses `after:absolute after:inset-0` to make the whole
               * card clickable. The coordinates <a> sits at relative z-10 above.
               */
              <div
                key={project.slug}
                className="group border-border/30 hover:bg-foreground/[0.02] relative border-b transition-colors"
              >
                <div className="gap-md p-md grid items-start md:grid-cols-[2rem_1fr_auto]">
                  {/* REF number */}
                  <span className="text-foreground/25 hidden pt-[3px] font-mono text-[10px] tracking-widest md:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Main content */}
                  <div className="min-w-0">
                    {/* Location label + coordinates */}
                    <div className="mb-xs gap-x-md gap-y-xs flex flex-wrap items-center">
                      <span className="text-foreground/40 font-mono text-[10px] tracking-wider uppercase">
                        {project.coordinates?.label ??
                          `${project.location.city}, ${project.location.country}`}
                      </span>
                      {project.coordinates ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${project.coordinates.lat},${project.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Open ${project.title} site on satellite maps`}
                          className="text-foreground/35 hover:text-foreground relative z-10 font-mono text-[10px] tracking-wide underline-offset-4 transition-colors hover:underline"
                        >
                          {project.coordinates.lat}°N {project.coordinates.lng}°W ↗
                        </a>
                      ) : (
                        <span className="text-foreground/20 font-mono text-[10px]">COORDS N/A</span>
                      )}
                    </div>

                    {/* Title — stretched link covers entire card */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="after:absolute after:inset-0 after:z-0"
                    >
                      <h3 className="text-foreground text-xl font-medium tracking-tight underline-offset-4 group-hover:underline">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Metadata row */}
                    <div className="mt-xs gap-x-sm gap-y-xs flex flex-wrap items-center">
                      {/* Status dot */}
                      <span className="gap-xs text-foreground/40 flex items-center font-mono text-[10px] tracking-widest uppercase">
                        <span
                          className={cn(
                            "inline-block h-1.5 w-1.5 rounded-full",
                            project.status === "completed"
                              ? "bg-accent"
                              : project.status === "ongoing"
                                ? "bg-foreground/40"
                                : "bg-foreground/20",
                          )}
                          aria-hidden="true"
                        />
                        {project.status}
                      </span>
                      <span className="text-foreground/20 font-mono text-[10px]">·</span>
                      <span className="text-foreground/40 font-mono text-[10px]">
                        {project.typology &&
                        Array.isArray(project.typology) &&
                        project.typology.length > 0
                          ? project.typology.join(", ")
                          : project.category[0]}
                      </span>
                      <span className="text-foreground/20 font-mono text-[10px]">·</span>
                      <span className="text-foreground/40 font-mono text-[10px]">
                        {project.year}
                      </span>
                      {project.areaM2 && (
                        <>
                          <span className="text-foreground/20 font-mono text-[10px]">·</span>
                          <span className="text-foreground/40 font-mono text-[10px]">
                            {project.areaM2} m²
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Hero image thumbnail — visible on hover (desktop) */}
                  <div className="hidden h-16 w-24 flex-shrink-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
                    <Image
                      asset={project.heroImage}
                      className="h-full w-full object-cover"
                      sizes="96px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
