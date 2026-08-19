"use client";

// ============================================================================
// SCROLL PROGRESS BAR
// Global reading progress indicator at top of page
// ============================================================================

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (400px)
      setIsVisible(window.scrollY > 400);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] bg-border/20 z-50 transition-opacity duration-300">
      <div
        className="h-full bg-foreground/30 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  );
}
