import { Link as TextLink } from "@/components/ui/Link";
import type { EventBlock as EventBlockType } from "@/content/journal";
import { cn } from "@/lib/cn";

interface EventBlockProps {
  block: EventBlockType;
  className?: string;
}

export function EventBlock({ block, className }: EventBlockProps) {
  const { event } = block;

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
    if (!event.endDate || event.date === event.endDate) {
      return formatDate(event.date);
    }
    const start = new Date(event.date);
    const end = new Date(event.endDate);
    return `${start.getDate()}–${end.getDate()} ${end.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    })}`;
  };

  const formatTime = () => {
    if (!event.time) return null;
    const timeStr = event.endTime ? `${event.time}–${event.endTime}` : event.time;
    return event.timezone ? `${timeStr} ${event.timezone}` : timeStr;
  };

  // Generate .ics file content
  const generateICS = () => {
    const startDate = new Date(event.date + (event.time ? `T${event.time}` : ""));
    const endDate = event.endDate
      ? new Date(event.endDate + (event.endTime ? `T${event.endTime}` : ""))
      : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

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
      `SUMMARY:${event.venue || "Event"}`,
      event.location ? `LOCATION:${event.location}` : "",
      event.address ? `DESCRIPTION:${event.address}` : "",
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .filter(Boolean)
      .join("\r\n");

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
  };

  return (
    <div className={cn("border-border py-2xl my-2xl border-y", className)}>
      <p className="text-foreground/40 mb-md font-mono text-[10px] tracking-widest uppercase">
        Specification // Event Details
      </p>

      <div className="gap-y-lg grid md:grid-cols-12">
        {/* Date */}
        <div className="md:col-span-3">
          <p className="text-foreground/50 mb-xs font-mono text-xs tracking-wider uppercase">
            Date
          </p>
          <p className="text-foreground text-base">{formatDateRange()}</p>
        </div>

        {/* Time */}
        {formatTime() && (
          <div className="md:col-span-3">
            <p className="text-foreground/50 mb-xs font-mono text-xs tracking-wider uppercase">
              Time
            </p>
            <p className="text-foreground text-base">{formatTime()}</p>
          </div>
        )}

        {/* Location */}
        <div className="md:col-span-3">
          <p className="text-foreground/50 mb-xs font-mono text-xs tracking-wider uppercase">
            Location
          </p>
          <p className="text-foreground text-base">{event.venue || event.location}</p>
          {event.address && <p className="text-foreground/60 mt-xs text-sm">{event.address}</p>}
        </div>

        {/* Admission */}
        {event.admission && (
          <div className="md:col-span-3">
            <p className="text-foreground/50 mb-xs font-mono text-xs tracking-wider uppercase">
              Admission
            </p>
            <p className="text-foreground text-base">{event.admission}</p>
          </div>
        )}
      </div>

      {/* Speakers */}
      {event.speakers && event.speakers.length > 0 && (
        <div className="mt-lg">
          <p className="text-foreground/50 mb-md font-mono text-xs tracking-wider uppercase">
            Speakers
          </p>
          <div className="gap-md flex flex-col">
            {event.speakers.map((speaker, idx) => (
              <div key={idx}>
                <p className="text-foreground text-base font-medium">{speaker.name}</p>
                {speaker.role && <p className="text-foreground/60 text-sm">{speaker.role}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="gap-md mt-lg flex flex-wrap items-center">
        <a
          href={generateICS()}
          download="event.ics"
          className="group gap-xs text-foreground/60 hover:text-foreground inline-flex items-center font-mono text-xs tracking-wider uppercase transition-colors"
        >
          Add to Calendar
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </a>

        {event.moreInfoLink && (
          <>
            <span className="text-foreground/30 text-xs">·</span>
            <TextLink
              href={event.moreInfoLink}
              external
              variant="underline"
              className="font-mono text-xs tracking-wider uppercase"
            >
              More Information
            </TextLink>
          </>
        )}

        {event.registrationLink && (
          <>
            <span className="text-foreground/30 text-xs">·</span>
            <TextLink
              href={event.registrationLink}
              external
              variant="underline"
              className="font-mono text-xs tracking-wider uppercase"
            >
              Register
            </TextLink>
          </>
        )}
      </div>
    </div>
  );
}
