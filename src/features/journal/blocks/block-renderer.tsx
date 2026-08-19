// ============================================================================
// BLOCK RENDERER
// Orchestrates rendering of different journal block types
// ============================================================================

import type { JournalBlock } from "@/content/journal";

import { CreditsBlock } from "./credits-block";
import { DividerBlock } from "./divider-block";
import { EventBlock } from "./event-block";
import { ExternalLinkBlock } from "./external-link-block";
import { GalleryBlock } from "./gallery-block";
import { HeadingBlock } from "./heading-block";
import { ImageBlock } from "./image-block";
import { ProjectReferenceBlock } from "./project-reference-block";
import { PullQuoteBlock } from "./pullquote-block";
import { TextBlock } from "./text-block";

interface BlockRendererProps {
  block: JournalBlock;
  index: number;
  isFirstInSection?: boolean;
  sectionNumber?: string;
}

export function BlockRenderer({
  block,
  index,
  isFirstInSection,
  sectionNumber,
}: BlockRendererProps) {
  const key = `block-${index}`;

  switch (block.type) {
    case "text":
      return (
        <TextBlock
          key={key}
          block={block}
          {...(isFirstInSection !== undefined && { isFirstInSection })}
        />
      );

    case "heading":
      return (
        <HeadingBlock
          key={key}
          block={block}
          {...(sectionNumber !== undefined && { sectionNumber })}
        />
      );

    case "image":
      return <ImageBlock key={key} block={block} />;

    case "gallery":
      return <GalleryBlock key={key} block={block} />;

    case "pullquote":
      return <PullQuoteBlock key={key} block={block} />;

    case "project-reference":
      return <ProjectReferenceBlock key={key} block={block} />;

    case "event":
      return <EventBlock key={key} block={block} />;

    case "credits":
      return <CreditsBlock key={key} block={block} />;

    case "external-link":
      return <ExternalLinkBlock key={key} block={block} />;

    case "divider":
      return <DividerBlock key={key} block={block} />;

    default:
      return null;
  }
}
