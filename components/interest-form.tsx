"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type FormKind = "registration" | "contact" | "host" | "volunteer";

const config = {
  registration: {
    submit: "Send interest form",
    success: "Thanks — your family’s interest has been received. The AI Sprouts team can follow up with next steps.",
  },
  contact: {
    submit: "Send message",
    success: "Thanks — your message has been received.",
  },
  host: {
    submit: "Request a host conversation",
    success: "Thanks — your host-program request has been received.",
  },
  volunteer: {
    submit: "Share volunteer interest",
    success: "Thanks — your volunteer interest has been received.",
  },
};

export function InterestForm({ kind }: { kind: FormKind }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/forms", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ kind, ...data }) });
      const payload = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok) throw new Error(payload.error || "We couldn’t send the form. Please try again.");
      form.reset();
      setState("success");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We couldn’t send the form. Please try again.");
      setState("error");
    }
  }

  if (state === "success") return <div className="form-success" role="status"><span aria-hidden="true">✓</span><h2>Interest planted.</h2><p>{config[kind].success}</p><button type="button" onClick={() => setState("idle")}>Send another response</button></div>;

  return (
    <form className="interest-form" onSubmit={onSubmit} noValidate={false}>
      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="form-grid">
        <label>{kind === "registration" ? "Parent or guardian name" : kind === "host" ? "Contact person" : "Name"}<input name="name" autoComplete="name" required minLength={2} /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        {kind === "registration" && <label>Parent phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" /></label>}
        {kind === "registration" && <label>Student age or grade<select name="studentAge" required defaultValue=""><option value="" disabled>Select one</option><option>Ages 7–9</option><option>Ages 9–12</option><option>Ages 12–15</option><option>Ages 15–17</option></select></label>}
        {kind === "registration" && <label>Program interest<select name="program" required defaultValue=""><option value="" disabled>Select a program</option><option>AI Explorers</option><option>Creative AI Studio</option><option>Responsible AI Lab</option><option>Community Helper Camp</option><option>Not sure yet</option></select></label>}
        {kind === "registration" && <label>Preferred location<input name="location" placeholder="City or community" required /></label>}
        {kind === "registration" && <label className="full">Accessibility needs <span>(optional)</span><textarea name="accessibility" rows={3} placeholder="Share only what would help us plan an inclusive experience." /></label>}
        {kind === "host" && <label>Organization name<input name="organization" required /></label>}
        {kind === "host" && <label>Organization type<select name="organizationType" required defaultValue=""><option value="" disabled>Select one</option><option>School</option><option>Library</option><option>Nonprofit</option><option>Community group</option><option>Other</option></select></label>}
        {kind === "host" && <label>Location<input name="location" required /></label>}
        {kind === "host" && <label>Estimated student count<input name="studentCount" inputMode="numeric" required /></label>}
        {kind === "host" && <label>Age range<input name="ageRange" required /></label>}
        {kind === "host" && <label>Preferred dates<input name="preferredDates" placeholder="A window is perfect" required /></label>}
        {kind === "volunteer" && <label className="full">General experience<textarea name="experience" rows={4} required /></label>}
        {kind === "volunteer" && <label>Areas of interest<input name="interests" placeholder="Coding, teaching, events…" required /></label>}
        {kind === "volunteer" && <label>Availability<input name="availability" required /></label>}
        {kind === "contact" && <label className="full">Inquiry type<select name="inquiryType" required defaultValue=""><option value="" disabled>Select one</option><option>General question</option><option>Host a program</option><option>Volunteer</option><option>Sponsor or partner</option><option>Media</option></select></label>}
        <label className="full">{kind === "contact" ? "Message" : kind === "registration" ? "Questions or comments (optional)" : "Additional details"}<textarea name="message" rows={5} required={kind !== "registration"} /></label>
      </div>
      {(kind === "registration" || kind === "volunteer") && <label className="check"><input name="ageConfirm" type="checkbox" required /><span>{kind === "registration" ? "I am the student’s parent or guardian, or I am authorized to submit this interest form on their behalf." : "I confirm that I am at least 18 years old."}</span></label>}
      <label className="check"><input name="consent" type="checkbox" required /><span>I agree that AI Sprouts may use these details to respond to this inquiry. See the <Link href="/privacy">privacy policy</Link>.</span></label>
      {state === "error" && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-primary form-submit" type="submit" disabled={state === "loading"}>{state === "loading" ? "Sending…" : config[kind].submit}</button>
      <p className="form-privacy">For privacy, do not include medical records, student full names, or other sensitive information.</p>
    </form>
  );
}
