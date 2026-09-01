import { useEffect, useState } from "react";

export interface TimeInfo {
  timeString: string;
  timezoneLabel: string;
  formatted: string;
}

export interface DualTimeInfo {
  /** Studio time — always Kigali (CAT, UTC+2) */
  studio: TimeInfo;
  /** Visitor's browser-local time — whatever timezone they are in */
  visitor: TimeInfo;
  /** Whether the visitor is in the same timezone as the studio */
  sameZone: boolean;
}

// ─── Backwards-compatible alias ───────────────────────────────────────────────
/** @deprecated Use TimeInfo instead */
export type StudioTimeInfo = TimeInfo;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(date: Date, timeZone?: string): TimeInfo {
  try {
    const opts: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      ...(timeZone ? { timeZone } : {}),
    };
    const timeString = new Intl.DateTimeFormat("en-GB", opts).format(date);

    const tzParts = new Intl.DateTimeFormat("en-GB", {
      timeZoneName: "short",
      ...(timeZone ? { timeZone } : {}),
    }).formatToParts(date);

    const tzLabel = tzParts.find((p) => p.type === "timeZoneName")?.value ?? "";

    return { timeString, timezoneLabel: tzLabel, formatted: `${timeString} ${tzLabel}` };
  } catch {
    return { timeString: "--:--", timezoneLabel: "", formatted: "--:--" };
  }
}

// ─── Core getters ─────────────────────────────────────────────────────────────

/** Kigali studio time (always Africa/Kigali) */
export function getStudioTime(): TimeInfo {
  try {
    return formatTime(new Date(), "Africa/Kigali");
  } catch {
    return { timeString: "12:00", timezoneLabel: "CAT", formatted: "12:00 CAT" };
  }
}

/** Both studio (Kigali) and visitor (browser-local) times */
export function getDualTime(): DualTimeInfo {
  const now = new Date();
  const studio = formatTime(now, "Africa/Kigali");
  const visitor = formatTime(now); // no timeZone → browser locale

  const sameZone = studio.timezoneLabel === visitor.timezoneLabel;

  return { studio, visitor, sameZone };
}

// ─── React hooks ──────────────────────────────────────────────────────────────

/** Kigali-only time hook (backwards-compatible, used in Splash Screen & Footer) */
export function useStudioTime(): TimeInfo {
  const [timeInfo, setTimeInfo] = useState<TimeInfo | null>(null);

  useEffect(() => {
    const update = () => setTimeInfo(getStudioTime());
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  // Return a stable placeholder until client hydration completes
  return timeInfo ?? { timeString: "", timezoneLabel: "", formatted: "" };
}

/** Dual time hook — studio (Kigali) + visitor's local time, updates every 30s */
export function useDualTime(): DualTimeInfo {
  const [info, setInfo] = useState<DualTimeInfo | null>(null);

  useEffect(() => {
    const update = () => setInfo(getDualTime());
    update();
    const interval = setInterval(update, 30_000);
    return () => clearInterval(interval);
  }, []);

  const empty: TimeInfo = { timeString: "", timezoneLabel: "", formatted: "" };
  return info ?? { studio: empty, visitor: empty, sameZone: true };
}
