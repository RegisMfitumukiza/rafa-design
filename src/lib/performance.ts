/**
 * Performance Monitoring Utilities
 *
 * Utilities for measuring and optimizing Core Web Vitals
 * and performance metrics in production.
 */

/**
 * Report Web Vitals to analytics
 * Can be integrated with Google Analytics, Vercel Analytics, etc.
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  label: string;
  value: number;
}) {
  // In production, send to analytics
  if (process.env.NODE_ENV === "production") {
    // Example: Google Analytics
    // window.gtag?.('event', metric.name, {
    //   event_category: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js Metric',
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // });
    // Example: Vercel Analytics (automatically captured)
    // Analytics are automatically sent when using Vercel's built-in analytics
  }

  // Development: Log to console
  if (process.env.NODE_ENV === "development") {
    console.log(`[Performance] ${metric.name}:`, {
      value: metric.value,
      label: metric.label,
      id: metric.id,
    });
  }
}

/**
 * Measure and log component render time
 * Useful for identifying performance bottlenecks
 */
export function measureComponentRender(componentName: string) {
  if (typeof performance === "undefined") return () => {};

  const startMark = `${componentName}-render-start`;
  const endMark = `${componentName}-render-end`;
  const measureName = `${componentName}-render`;

  performance.mark(startMark);

  return () => {
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);

    const measure = performance.getEntriesByName(measureName)[0];
    if (measure && process.env.NODE_ENV === "development") {
      console.log(`[Render Time] ${componentName}:`, `${measure.duration.toFixed(2)}ms`);
    }

    // Clean up marks and measures
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);
  };
}

/**
 * Check if the user prefers reduced motion
 * Used for performance optimization and accessibility
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Detect if the device is low-end based on various signals
 * Used to adjust quality settings and disable expensive features
 */
export function isLowEndDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  // Check for save-data preference
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return true;

  // Check for low memory (< 4GB)
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (memory && memory < 4) return true;

  // Check for slow CPU (< 4 logical processors)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) return true;

  return false;
}

/**
 * Get optimal image quality based on device capabilities
 */
export function getOptimalImageQuality(): number {
  if (typeof window === "undefined") return 85;

  // Lower quality for low-end devices
  if (isLowEndDevice()) return 75;

  // Check for save-data
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return 70;

  // Standard quality
  return 85;
}

/**
 * Preload critical resources
 */
export function preloadCriticalAssets() {
  if (typeof document === "undefined") return;

  // Preload critical fonts
  const fonts = [
    "/fonts/CenturyGothicPaneuropeanRegular.ttf",
    "/fonts/CenturyGothicPaneuropeanBold.ttf",
  ];

  fonts.forEach((font) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/ttf";
    link.href = font;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
}

/**
 * Defer non-critical scripts
 */
export function deferNonCriticalScripts(callback: () => void, delay = 0) {
  if (typeof window === "undefined") return;

  if ("requestIdleCallback" in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() =>
      setTimeout(callback, delay),
    );
  } else {
    setTimeout(callback, delay);
  }
}

/**
 * Optimize scroll performance by throttling
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function for expensive operations
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Check if resource hints are supported
 */
export function supportsResourceHints(): boolean {
  if (typeof document === "undefined") return false;
  const link = document.createElement("link");
  return (
    "relList" in link &&
    link.relList?.supports &&
    (link.relList.supports("preload") || link.relList.supports("prefetch"))
  );
}

/**
 * Add resource hint
 */
export function addResourceHint(
  href: string,
  rel: "preconnect" | "dns-prefetch" | "preload" | "prefetch",
  options?: { as?: string; type?: string; crossOrigin?: string },
) {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;

  if (options?.as) link.setAttribute("as", options.as);
  if (options?.type) link.setAttribute("type", options.type);
  if (options?.crossOrigin) link.setAttribute("crossorigin", options.crossOrigin);

  document.head.appendChild(link);
}
