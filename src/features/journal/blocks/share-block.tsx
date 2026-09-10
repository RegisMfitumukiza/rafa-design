"use client";

// ============================================================================
// SHARE BLOCK
// Social sharing functionality with architectural styling
// ============================================================================

import { useState } from "react";

import { cn } from "@/lib/cn";

interface ShareBlockProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareBlock({ title, url, className }: ShareBlockProps) {
  const [copied, setCopied] = useState(false);

  // Build full URL
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420,noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, "_blank", "width=550,height=420,noopener,noreferrer");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`Read: ${title}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className={cn("border-border py-xl my-2xl border-y", className)}>
      <p className="text-foreground/40 mb-md text-overline font-mono tracking-widest uppercase">
        Specification // Share Article
      </p>

      <div className="gap-md flex flex-wrap items-center">
        <button
          onClick={handleTwitterShare}
          className="group text-foreground/60 hover:text-foreground font-mono text-xs tracking-wider uppercase transition-colors"
          aria-label="Share on Twitter"
        >
          Twitter
          <span
            className="ml-xs inline-block transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>

        <span className="text-foreground/20" aria-hidden="true">
          ·
        </span>

        <button
          onClick={handleLinkedInShare}
          className="group text-foreground/60 hover:text-foreground font-mono text-xs tracking-wider uppercase transition-colors"
          aria-label="Share on LinkedIn"
        >
          LinkedIn
          <span
            className="ml-xs inline-block transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>

        <span className="text-foreground/20" aria-hidden="true">
          ·
        </span>

        <button
          onClick={handleEmailShare}
          className="group text-foreground/60 hover:text-foreground font-mono text-xs tracking-wider uppercase transition-colors"
          aria-label="Share via Email"
        >
          Email
          <span
            className="ml-xs inline-block transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </button>

        <span className="text-foreground/20" aria-hidden="true">
          ·
        </span>

        <button
          onClick={handleCopyLink}
          className={cn(
            "group font-mono text-xs tracking-wider uppercase transition-colors",
            copied ? "text-foreground" : "text-foreground/60 hover:text-foreground",
          )}
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          {copied ? "Copied!" : "Copy Link"}
          {!copied && (
            <span
              className="ml-xs inline-block transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
