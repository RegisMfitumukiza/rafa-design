"use client";

import { useReportWebVitals } from "next/web-vitals";

import { reportWebVitals } from "@/lib/performance";

/**
 * Connects Next.js' Core Web Vitals reporting to the analytics/observability
 * pipeline in production. Mounted once in the root layout.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    reportWebVitals(metric);
  });

  return null;
}
