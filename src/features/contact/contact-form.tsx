"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { ui } from "@/content/ui";
import { useContact } from "@/features/contact/contact-context";
import { cn } from "@/lib/cn";

const contactFormSchema = z.object({
  name: z.string().trim().min(1, ui.form.name.required),
  email: z.string().trim().min(1, ui.form.email.required).email(ui.form.email.invalid),
  organization: z.string().trim().optional(),
  projectType: z.string().trim().optional(),
  location: z.string().trim().optional(),
  message: z.string().trim().min(10, ui.form.message.required),
  timeline: z.string().trim().optional(),
  // Bot trap — hidden from real users, bots auto-fill it
  honeypot: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  projectTypes?: string[];
}

export function ContactForm({ projectTypes: propTypes }: ContactFormProps = {}) {
  const contactInformation = useContact();
  // Dynamic project types: prefer propTypes (derived dynamically from categories),
  // then contact information context, then default architectural fallback
  const projectTypes =
    propTypes && propTypes.length > 0
      ? propTypes
      : contactInformation.projectTypes && contactInformation.projectTypes.length > 0
        ? contactInformation.projectTypes
        : ["Architecture", "Interior Design", "Other"];
  const defaultType = projectTypes[0] ?? "Architecture";

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>(defaultType);

  // Mount timestamp stored as state (not a ref) — state values are safe to close over
  // in callbacks without triggering react-hooks/refs lint errors.
  // Set to 0 initially (pure), then to the actual epoch ms in useEffect after mount.
  const [mountedAt, setMountedAt] = useState<number>(0);
  useEffect(() => {
    // Deferred one tick per react-hooks/set-state-in-effect rule
    const t = setTimeout(() => setMountedAt(Date.now()), 0);
    return () => clearTimeout(t);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      projectType: defaultType,
    },
  });

  function handleSelectType(type: string) {
    setSelectedType(type);
    setValue("projectType", type, { shouldValidate: true });
  }

  const onSubmit = useCallback(
    async (values: ContactFormValues) => {
      setSubmitError(null);

      // Elapsed ms since form mount — bots submit instantly (< 1500ms)
      const elapsed = mountedAt > 0 ? Date.now() - mountedAt : Date.now();

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, elapsed }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setSubmitError(data?.error ?? ui.form.errorFallback);
        return;
      }

      setSubmitted(true);
    },
    [mountedAt],
  );

  const handleFormSubmit = handleSubmit(onSubmit);

  // ── SUCCESS STATE ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="border-border/20 py-2xl space-y-xl border-t">
        {/* Overline */}
        <p className="text-foreground/40 text-overline font-mono tracking-widest uppercase">
          Specification // Confirmation
        </p>

        {/* Headline */}
        <div className="space-y-sm">
          <h3 className="font-display text-foreground text-3xl font-medium tracking-tight md:text-4xl">
            {ui.form.successTitle.toUpperCase()}.
          </h3>
          <p className="text-foreground/60 max-w-md text-lg leading-relaxed">
            {ui.form.successMessage}
          </p>
        </div>

        {/* Ruled confirmation spec */}
        <div className="border-border/30 divide-border/30 divide-y border-y font-mono text-xs">
          <div className="py-sm gap-sm flex justify-between">
            <span className="text-foreground/40 text-overline tracking-wider uppercase">
              Status
            </span>
            <span className="text-foreground/80">Inquiry received</span>
          </div>
          <div className="py-sm gap-sm flex justify-between">
            <span className="text-foreground/40 text-overline tracking-wider uppercase">
              Response
            </span>
            <span className="text-foreground/80">Within two working days</span>
          </div>
          <div className="py-sm gap-sm flex justify-between">
            <span className="text-foreground/40 text-overline tracking-wider uppercase">
              Next step
            </span>
            <span className="text-foreground/80">Check your inbox for acknowledgement</span>
          </div>
        </div>

        {/* CTA back to services */}
        <div>
          <Link
            href="/services"
            className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group px-md py-sm gap-md inline-flex items-center rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>Explore Our Disciplines</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Form onSubmit={handleFormSubmit} className="space-y-lg">
      {/*
       * ── BOT TRAP (honeypot) ────────────────────────────────────────────────
       * Positioned absolutely offscreen — invisible to real users.
       * Bots auto-fill all fields; if this has a value the API silently rejects.
       * Never use display:none or visibility:hidden — some bots detect those.
       */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...register("honeypot")}
        />
      </div>

      {/* ── PRIMARY CONTACT INFORMATION ── */}
      <div className="space-y-lg pb-lg border-border/20 border-b">
        {/* 01 // NAME */}
        <Input
          label={ui.form.name.label}
          placeholder={ui.form.name.placeholder}
          error={errors.name?.message}
          {...register("name")}
        />

        {/* 02 // EMAIL */}
        <Input
          label={ui.form.email.label}
          type="email"
          placeholder={ui.form.email.placeholder}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      {/* ── PROJECT DETAILS ── */}
      <div className="space-y-lg pb-lg border-border/20 border-b">
        {/* 03 // ORGANIZATION */}
        <Input
          label={ui.form.organization.label}
          placeholder={ui.form.organization.placeholder}
          error={errors.organization?.message}
          {...register("organization")}
        />

        {/* 04 // PROJECT TYPE */}
        <div className="space-y-xs">
          <label
            id="project-type-label"
            className="text-foreground/40 text-overline block font-mono tracking-widest uppercase"
          >
            {ui.form.projectType.label}
          </label>
          <div
            role="radiogroup"
            aria-labelledby="project-type-label"
            className="gap-xs sm:gap-sm pt-xs flex flex-wrap"
          >
            {projectTypes.map((type) => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectType(type)}
                  className={cn(
                    "px-md py-xs text-overline focus-visible:ring-foreground min-h-[38px] rounded-xs border font-mono font-medium tracking-wider uppercase transition-all duration-300 focus-visible:ring-1 focus-visible:outline-none",
                    isSelected
                      ? "border-foreground bg-foreground text-background shadow-xs"
                      : "border-border/50 text-foreground/60 hover:border-foreground/60 hover:text-foreground bg-transparent",
                  )}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* 05 // LOCATION */}
        <Input
          label={ui.form.location.label}
          placeholder={ui.form.location.placeholder}
          error={errors.location?.message}
          {...register("location")}
        />
      </div>

      {/* ── PROJECT DESCRIPTION ── */}
      <div className="space-y-lg">
        {/* 06 // PROJECT BRIEF */}
        <Textarea
          label={ui.form.message.label}
          placeholder={ui.form.message.placeholder}
          error={errors.message?.message}
          rows={5}
          {...register("message")}
        />

        {/* 07 // TIMELINE */}
        <Input
          label={ui.form.timeline.label}
          placeholder={ui.form.timeline.placeholder}
          error={errors.timeline?.message}
          {...register("timeline")}
        />
      </div>

      {/* ── ERROR STATE — ruled specification row, not a centered panel ── */}
      {submitError && (
        <div
          role="alert"
          className="border-accent/40 bg-accent/5 px-md py-sm gap-md flex items-start rounded-xs border"
        >
          <span className="text-accent text-overline shrink-0 pt-0.5 font-mono font-medium tracking-widest uppercase">
            Error
          </span>
          <p className="text-foreground/80 text-sm leading-relaxed">{submitError}</p>
        </div>
      )}

      {/* Response Time Indicator */}
      <div className="border-border/20 pt-md border-t">
        <p className="text-foreground/40 mb-xs text-overline font-mono tracking-widest uppercase">
          {ui.contact.responseTime}
        </p>
        <p className="text-foreground/60 text-sm">{ui.contact.responseTimeMessage}</p>
      </div>

      {/* ── SUBMIT BUTTON — animated loading state ── */}
      <div className="pt-sm">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "group px-md py-sm gap-md inline-flex items-center rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300",
            isSubmitting
              ? "border-foreground/30 text-foreground/40 animate-pulse cursor-not-allowed"
              : "border-border/60 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
          )}
        >
          {isSubmitting ? (
            <>
              <span
                className="border-foreground/40 h-3 w-3 animate-spin rounded-full border border-t-transparent"
                aria-hidden="true"
              />
              <span>Sending Inquiry...</span>
            </>
          ) : (
            <>
              <span>Send Inquiry</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
      </div>
    </Form>
  );
}
