"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { PageContainer } from "./PageContainer";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <>
      {!isLanding && <Header />}
      <PageContainer unpadded={isLanding}>{children}</PageContainer>
      {!isLanding && <Footer />}
    </>
  );
}
