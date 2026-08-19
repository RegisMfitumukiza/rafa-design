import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { Stagger } from "@/motion";

interface DisciplineApproachProps {
  service: Service;
  className?: string;
}

/**
 * DisciplineApproach
 *
 * Numbered methodological approach points ("01"–"04") for a discipline,
 * rendered as a ruled editorial list. Layout per row:
 *   [2] number  |  [4] title  |  [6] statement
 */
export function DisciplineApproach({ service, className }: DisciplineApproachProps) {
  return (
    <Stagger
      className={cn("border-border/40 divide-border/40 divide-y border-y", className ?? "")}
      stagger={0.05}
    >
      {service.approach.map((point, index) => (
        <div
          key={point.title}
          className="gap-x-md gap-y-sm py-md grid items-center md:grid-cols-12"
        >
          <span className="text-foreground/40 font-mono text-[10px] tracking-wider uppercase md:col-span-2">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-foreground/90 font-display text-xl font-medium tracking-tight md:col-span-4">
            {point.title}
          </h3>
          <p className="text-foreground/60 text-sm leading-relaxed md:col-span-6">
            {point.statement}
          </p>
        </div>
      ))}
    </Stagger>
  );
}
