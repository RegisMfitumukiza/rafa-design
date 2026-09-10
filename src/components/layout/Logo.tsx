"use client";

import Image from "next/image";
import Link from "next/link";

import { useSiteConfig } from "@/features/site/site-config-context";
import { cn } from "@/lib/cn";

export interface LogoProps {
  className?: string;
  /** Custom size classes applied to the logo image. */
  imgClassName?: string;
  /** Visual context variant for logo scale. Defaults to 'header'. */
  variant?: "header" | "footer" | "display";
  /** If true, renders adjacent logotype text alongside the mark. */
  showWordmark?: boolean;
}

const variantSizes = {
  header: "h-12 md:h-14",
  footer: "h-20 md:h-24",
  display: "h-36 md:h-52",
};

export function Logo({ className, imgClassName, variant = "header", showWordmark }: LogoProps) {
  const { name } = useSiteConfig();
  const sizeClass = imgClassName ?? variantSizes[variant];

  return (
    <Link
      href="/"
      className={cn(
        "gap-xs inline-flex min-h-(--touch-target) items-center select-none",
        className,
      )}
      aria-label={`${name} — Home`}
    >
      <Image
        src="/logo/rafa-bg-black.png"
        alt={name}
        width={2325}
        height={2159}
        priority
        className={cn(
          "w-auto object-contain invert transition-opacity hover:opacity-85 dark:invert-0",
          sizeClass,
        )}
      />
      {showWordmark && (
        <span className="gap-xs inline-flex items-center font-mono text-xs tracking-[0.2em] uppercase">
          <span className="text-foreground font-semibold">RAFA</span>
          <span className="text-foreground/30">|</span>
          <span className="text-foreground/70 font-light">DESIGN HUB</span>
        </span>
      )}
    </Link>
  );
}
