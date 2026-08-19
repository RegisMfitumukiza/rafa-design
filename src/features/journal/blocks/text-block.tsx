import { Text } from "@/components/typography/Text";
import type { TextBlock as TextBlockType } from "@/content/journal";
import { cn } from "@/lib/cn";

interface TextBlockProps {
  block: TextBlockType;
  isFirstInSection?: boolean;
  className?: string;
}

export function TextBlock({ block, isFirstInSection, className }: TextBlockProps) {
  return (
    <Text
      variant="body"
      className={cn(
        "text-foreground/80 leading-relaxed",
        isFirstInSection && "text-lg font-medium md:text-xl",
        className,
      )}
    >
      {block.content}
    </Text>
  );
}
