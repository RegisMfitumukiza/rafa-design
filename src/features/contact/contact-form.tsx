"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
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
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const contactInformation = useContact();
  // Dynamic project types from content layer (CMS-ready)
  const projectTypes = contactInformation.projectTypes;
  const defaultType = projectTypes[0] ?? "Architecture";

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>(defaultType);

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

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setSubmitError(data?.error ?? ui.form.errorFallback);
      return;
    }

    setSubmitted(true);
  }

  // ── SUCCESS STATE ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="border-border/20 py-2xl space-y-xl border-t">
        {/* Overline */}
        <p className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
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
            <span className="text-foreground/40 text-[10px] tracking-wider uppercase">Status</span>
            <span className="text-foreground/80">Inquiry received</span>
          </div>
          <div className="py-sm gap-sm flex justify-between">
            <span className="text-foreground/40 text-[10px] tracking-wider uppercase">
              Response
            </span>
            <span className="text-foreground/80">Within two working days</span>
          </div>
          <div className="py-sm gap-sm flex justify-between">
            <span className="text-foreground/40 text-[10px] tracking-wider uppercase">
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
    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
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
          <label className="text-foreground/40 block font-mono text-[10px] tracking-widest uppercase">
            {ui.form.projectType.label}
          </label>
          <div className="gap-xs pt-xs flex flex-wrap">
            {projectTypes.map((type) => {
              const isSelected = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSelectType(type)}
                  className={cn(
                    "px-md py-xs rounded-xs border font-mono text-[10px] font-medium tracking-wider uppercase transition-all duration-300",
                    isSelected
                      ? "border-foreground bg-foreground text-background"
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
          <span className="text-accent shrink-0 pt-0.5 font-mono text-[10px] font-medium tracking-widest uppercase">
            Error
          </span>
          <p className="text-foreground/80 text-sm leading-relaxed">{submitError}</p>
        </div>
      )}

      {/* Response Time Indicator */}
      <div className="border-border/20 pt-md border-t">
        <p className="text-foreground/40 mb-xs font-mono text-[10px] tracking-widest uppercase">
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
