import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
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

export function Logo({
  className,
  imgClassName,
  variant = "header",
  showWordmark,
}: LogoProps) {
  const sizeClass = imgClassName ?? variantSizes[variant];

  return (
    <Link
      href="/"
      className={cn("inline-flex min-h-(--touch-target) items-center gap-xs select-none", className)}
      aria-label={`${siteConfig.name} — Home`}
    >
      <Image
        src="/logo/rafa-bg-black.png"
        alt={siteConfig.name}
        width={2325}
        height={2159}
        priority
        className={cn(
          "w-auto object-contain invert dark:invert-0 transition-opacity hover:opacity-85",
          sizeClass,
        )}
      />
      {showWordmark && (
        <span className="inline-flex items-center gap-xs font-mono text-xs tracking-[0.2em] uppercase">
          <span className="font-semibold text-foreground">RAFA</span>
          <span className="text-foreground/30">|</span>
          <span className="font-light text-foreground/70">DESIGN HUB</span>
        </span>
      )}
    </Link>
  );
}
