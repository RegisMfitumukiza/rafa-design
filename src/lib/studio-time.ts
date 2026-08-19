import { useEffect, useState } from "react";

export interface StudioTimeInfo {
  timeString: string;
  timezoneLabel: string;
  formatted: string;
}

export function getStudioTime(): StudioTimeInfo {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Lisbon",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const timeString = formatter.format(now);

    // Determine standard/daylight abbreviation for Portugal
    const tzFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Lisbon",
      timeZoneName: "short",
    });
    const parts = tzFormatter.formatToParts(now);
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    const timezoneLabel = tzPart ? tzPart.value : "WET";

    return {
      timeString,
      timezoneLabel,
      formatted: `${timeString} ${timezoneLabel}`,
    };
  } catch {
    return {
      timeString: "15:00",
      timezoneLabel: "WET",
      formatted: "15:00 WET",
    };
  }
}

export function useStudioTime(): StudioTimeInfo {
  // Start with null to avoid server/client hydration mismatch.
  // Time is only populated on the client after mount.
  const [timeInfo, setTimeInfo] = useState<StudioTimeInfo | null>(null);

  useEffect(() => {
    const update = () => setTimeInfo(getStudioTime());
    update();
    const interval = setInterval(update, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  // Return a stable placeholder until client hydration completes
  return timeInfo ?? { timeString: "", timezoneLabel: "", formatted: "" };
}
