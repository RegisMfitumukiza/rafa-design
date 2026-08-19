import { Image } from "@/components/media/Image";
import type { GalleryBlock as GalleryBlockType } from "@/content/journal";
import { cn } from "@/lib/cn";

interface GalleryBlockProps {
  block: GalleryBlockType;
  className?: string;
}

export function GalleryBlock({ block, className }: GalleryBlockProps) {
  const { images, columns = 2, layout = "grid" } = block;

  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={cn("my-2xl", className)}>
      <div className={cn("gap-md grid", layout === "grid" && gridClasses[columns])}>
        {images.map((media, idx) => (
          <figure key={idx}>
            <Image
              asset={{
                src: media.src,
                alt: media.alt,
              }}
              className="w-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {(media.caption || media.credit) && (
              <figcaption className="mt-xs text-foreground/60 text-sm">
                {media.caption && <p className="mb-xs">{media.caption}</p>}
                {media.credit && (
                  <p className="text-foreground/40 font-mono text-xs">
                    {media.credit.role.charAt(0).toUpperCase() + media.credit.role.slice(1)}:{" "}
                    {media.credit.name}
                  </p>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
