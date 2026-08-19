import type { EventDetails } from "@/content/journal";
import { Link as TextLink } from "@/components/ui/Link";
import { cn } from "@/lib/cn";

interface EventDetailsBlockProps {
  details: EventDetails;
  className?: string;
}

export function EventDetailsBlock({ details, className }: EventDetailsBlockProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateRange = () => {
    if (!details.endDate || details.date === details.endDate) {
      return formatDate(details.date);
    }
    const start = new Date(details.date);
    const end = new Date(details.endDate);
    return `${start.getDate()}–${end.getDate()} ${end.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    })}`;
  };

  const formatTime = () => {
    if (!details.time) return null;
    const timeStr = details.endTime
      ? `${details.time}–${details.endTime}`
      : details.time;
    return details.timezone ? `${timeStr} ${details.timezone}` : timeStr;
  };

  // Generate .ics file content
  const generateICS = () => {
    const startDate = new Date(details.date + (details.time ? `T${details.time}` : ""));
    const endDate = details.endDate
      ? new Date(details.endDate + (details.endTime ? `T${details.endTime}` : ""))
      : new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours

    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//RAFA Design Hub//Journal//EN",
      "BEGIN:VEVENT",
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${details.venue || "Event"}`,
      details.location ? `LOCATION:${details.location}` : "",
      details.address ? `DESCRIPTION:${details.address}` : "",
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .filter(Boolean)
      .join("\r\n");

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  };

  return (
    <div className={cn("border-border border-y py-2xl my-2xl", className)}>
      <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase mb-md">
        Specification // Event Details
      </p>

      <div className="gap-y-lg grid md:grid-cols-12">
        {/* Date */}
        <div className="md:col-span-3">
          <p className="text-foreground/50 font-mono text-xs uppercase tracking-wider mb-xs">
            Date
          </p>
          <p className="text-foreground text-base">{formatDateRange()}</p>
        </div>

        {/* Time */}
        {formatTime() && (
          <div className="md:col-span-3">
            <p className="text-foreground/50 font-mono text-xs uppercase tracking-wider mb-xs">
              Time
            </p>
            <p className="text-foreground text-base">{formatTime()}</p>
          </div>
        )}

        {/* Location */}
        {details.location && (
          <div className="md:col-span-3">
            <p className="text-foreground/50 font-mono text-xs uppercase tracking-wider mb-xs">
              Location
            </p>
            <p className="text-foreground text-base">{details.venue || details.location}</p>
            {details.address && (
              <p className="text-foreground/60 text-sm mt-xs">{details.address}</p>
            )}
          </div>
        )}

        {/* Admission */}
        {details.admission && (
          <div className="md:col-span-3">
            <p className="text-foreground/50 font-mono text-xs uppercase tracking-wider mb-xs">
              Admission
            </p>
            <p className="text-foreground text-base">{details.admission}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="gap-md mt-lg flex flex-wrap items-center">
        <a
          href={generateICS()}
          download="event.ics"
          className="group inline-flex items-center gap-xs font-mono text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors"
        >
          Add to Calendar
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>

        {details.moreInfoLink && (
          <>
            <span className="text-foreground/30 text-xs">·</span>
            <TextLink
              href={details.moreInfoLink}
              external
              variant="underline"
              className="font-mono text-xs uppercase tracking-wider"
            >
              More Information
            </TextLink>
          </>
        )}

        {details.registrationLink && (
          <>
            <span className="text-foreground/30 text-xs">·</span>
            <TextLink
              href={details.registrationLink}
              external
              variant="underline"
              className="font-mono text-xs uppercase tracking-wider"
            >
              Register
            </TextLink>
          </>
        )}
      </div>
    </div>
  );
}
