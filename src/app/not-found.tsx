import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/typography/Heading";
import { Text } from "@/components/typography/Text";

export default function NotFound() {
  return (
    <PageContainer>
      <Section container="narrow">
        <Heading variant="display">404</Heading>
        <Text variant="body" className="mt-lg text-foreground/60 text-balance">
          The page you are looking for does not exist or has moved.
        </Text>
        <Link
          href="/"
          className="link-underline mt-lg inline-block text-sm font-medium tracking-wide uppercase"
        >
          Back to home
        </Link>
      </Section>
    </PageContainer>
  );
}
