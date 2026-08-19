import type { HeadingTag } from "@/components/typography/Heading";
import type { ProcessStep as ProcessStepType } from "@/content/process";
import { cn } from "@/lib/cn";
import { Stagger } from "@/motion";

import { ProcessStep } from "./process-step";

interface ProcessTimelineProps {
  steps: ProcessStepType[];
  titleAs?: HeadingTag;
  className?: string;
}

/**
 * ProcessTimeline
 *
 * The methodology rendered as a ruled editorial index — a hairline-bordered
 * column of phases, one per row, staggered into view as you read. Replaces
 * the original vertical "numbered circles + connector" timeline with the
 * same editorial rhythm used across the practice pages.
 */
export function ProcessTimeline({ steps, titleAs = "h3", className }: ProcessTimelineProps) {
  return (
    <Stagger
      className={cn("border-border/40 divide-border/40 divide-y border-y", className ?? "")}
      stagger={0.06}
    >
      {steps.map((step, index) => (
        <ProcessStep key={step.id} step={step} index={index} titleAs={titleAs} />
      ))}
    </Stagger>
  );
}
