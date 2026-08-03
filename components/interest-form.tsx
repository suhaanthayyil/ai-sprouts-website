"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setError("");
    const form = event.currentTarget;

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error || "We couldn’t send your message. Please try again.");
      form.reset();
      setState("success");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We couldn’t send your message. Please try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return <div className="form-success" role="status"><span aria-hidden="true">✓</span><h2>Form validated.</h2><p>This local version accepted the message successfully, but it is not connected to email delivery yet.</p><button type="button" onClick={() => setState("idle")}>Send another message</button></div>;
  }

  return (
    <form className="interest-form" onSubmit={onSubmit}>
      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="form-grid">
        <label>Name<input name="name" autoComplete="name" required minLength={2} /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label className="full">I’m reaching out about<select name="inquiryType" required defaultValue=""><option value="" disabled>Select one</option><option>Learning opportunities</option><option>School or library partnership</option><option>Volunteering</option><option>Sponsorship</option><option>General question</option></select></label>
        <label className="full">Message<textarea name="message" rows={6} required minLength={4} /></label>
      </div>
      <label className="check"><input name="consent" type="checkbox" required /><span>I agree that AI Sprouts may use these details to respond to this message.</span></label>
      {state === "error" && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-primary form-submit" type="submit" disabled={state === "loading"}>{state === "loading" ? "Sending…" : "Send message"}</button>
      <p className="form-privacy">Please do not include medical records, student full names, or other sensitive information.</p>
    </form>
  );
}
