import type { ImageBlock as ImageBlockType } from "@/content/journal";
import { Image } from "@/components/media/Image";
import { cn } from "@/lib/cn";

interface ImageBlockProps {
  block: ImageBlockType;
  className?: string;
}

export function ImageBlock({ block, className }: ImageBlockProps) {
  const { media, layout = "contained" } = block;
  
  const aspectRatioMap = {
    landscape: "aspect-[3/2]",
    portrait: "aspect-[2/3]",
    square: "aspect-square",
    wide: "aspect-[21/9]",
    hero: "aspect-hero",
  };

  const layoutClasses = {
    full: "w-full",
    wide: "w-full max-w-[90%] mx-auto",
    contained: "w-full",
  };

  return (
    <figure className={cn("my-xl", className)}>
      <div className={cn(layoutClasses[layout])}>
        <Image
          asset={{
            src: media.src,
            alt: media.alt,
          }}
          className={cn(
            "w-full",
            media.aspectRatio && aspectRatioMap[media.aspectRatio],
          )}
          sizes={layout === "full" ? "100vw" : "(max-width: 1024px) 100vw, 80vw"}
        />
      </div>
      {(media.caption || media.credit) && (
        <figcaption className="mt-md max-w-2xl">
          {media.caption && (
            <p className="text-foreground/70 text-sm leading-relaxed mb-sm">
              {media.caption}
            </p>
          )}
          {media.credit && (
            <>
              {media.caption && <div className="w-16 h-px bg-border/50 mb-sm" />}
              <p className="font-mono text-xs text-foreground/40 tracking-wide">
                {media.credit.role.charAt(0).toUpperCase() + media.credit.role.slice(1)}
                : {media.credit.name}
                {media.credit.organization && (
                  <span className="text-foreground/30"> / {media.credit.organization}</span>
                )}
              </p>
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
