import { Heading } from "@/components/typography/Heading";
import type { HeadingTag } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { CareerPosition } from "@/content/company/careers";

interface PositionCardProps {
  position: CareerPosition;
  index?: number;
  titleAs?: HeadingTag;
  className?: string;
}

export function PositionCard({ position, index, titleAs = "h3", className }: PositionCardProps) {
  const positionNumber = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <Card variant="bordered" className={className ?? ""}>
      <Card.Content>
        <div className="gap-sm flex items-center justify-between">
          <Heading as={titleAs} variant="h3">
            {positionNumber && (
              <span className="text-foreground/30 font-mono text-sm mr-sm">
                {positionNumber} //
              </span>
            )}
            {position.title}
          </Heading>
          <Badge variant="outline" size="sm">
            {position.type.replace("-", " ")}
          </Badge>
        </div>
        <Text variant="small" className="mt-xs text-foreground/50">
          {position.location}
        </Text>
        <Text variant="body" className="mt-md text-foreground/60">
          {position.description}
        </Text>
        {position.requirements.length > 0 && (
          <ul className="mt-md space-y-xs">
            {position.requirements.map((req, i) => (
              <li key={i} className="gap-sm text-foreground/60 flex text-sm">
                <span className="text-foreground/30">—</span>
                {req}
              </li>
            ))}
          </ul>
        )}
      </Card.Content>
    </Card>
  );
}
