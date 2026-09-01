"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ErrorState } from "@/components/feedback/ErrorState";
import { SuccessState } from "@/components/feedback/SuccessState";
import { Form } from "@/components/forms/Form";
import { Input } from "@/components/forms/Input";
import { Textarea } from "@/components/forms/Textarea";
import { Button } from "@/components/ui/Button";
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

  if (submitted) {
    return <SuccessState title={ui.form.successTitle} message={ui.form.successMessage} />;
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

      {submitError && <ErrorState title={ui.form.errorTitle} message={submitError} />}

      {/* Response Time Indicator */}
      <div className="border-border/20 pt-md border-t">
        <p className="text-foreground/40 mb-xs font-mono text-[10px] tracking-widest uppercase">
          {ui.contact.responseTime}
        </p>
        <p className="text-foreground/60 text-sm">{ui.contact.responseTimeMessage}</p>
      </div>

      {/* Submit Action */}
      <div className="pt-sm">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="border-border/60 hover:border-foreground hover:bg-foreground hover:text-background group px-md py-sm gap-md inline-flex items-center rounded-xs border font-mono text-xs font-medium tracking-widest uppercase transition-all duration-300"
        >
          <span>{isSubmitting ? "SENDING INQUIRY..." : "SEND INQUIRY"}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Button>
      </div>
    </Form>
  );
}
