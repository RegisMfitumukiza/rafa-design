import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import type { StudioVideo } from "@/content/studio";
import { cn } from "@/lib/cn";
import { Reveal } from "@/motion";

interface StudioFilmProps {
  video: StudioVideo;
  className?: string;
}

/**
 * StudioFilm
 *
 * Cinematic monograph essay presenting studio atmosphere, model-making,
 * material studies, and practice life.
 */
export function StudioFilm({ video, className }: StudioFilmProps) {
  if (!video?.url) return null;

  return (
    <Section container="wide" className={cn("py-xl", className)}>
      <Reveal>
        <div className="mb-md">
          <p className="text-foreground/50 mb-xs text-overline font-mono tracking-widest uppercase">
            03 // The Atelier Film
          </p>
          <Heading variant="h2">Practice Atmosphere</Heading>
        </div>
      </Reveal>

      <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black lg:aspect-[21/9]">
        <video
          src={video.url}
          poster={video.poster?.src}
          controls
          playsInline
          className="h-full w-full object-cover"
        />
      </div>

      {(video.caption || video.credit) && (
        <Reveal delay={0.1}>
          <div className="mt-sm gap-sm text-foreground/50 flex items-baseline justify-between">
            <p className="text-foreground/60 text-label font-mono">
              {video.caption ||
                "Atmosphere, material investigations, and life within the practice."}
            </p>
            {video.credit && (
              <p className="text-foreground/35 text-overline font-mono tracking-widest uppercase">
                Film: {video.credit}
              </p>
            )}
          </div>
        </Reveal>
      )}
    </Section>
  );
}
