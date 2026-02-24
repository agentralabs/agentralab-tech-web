"use client"

import { FormEvent, useState } from "react"

type FormStatus = "idle" | "submitting" | "success" | "error"

type SubmissionResponse = {
  ok: boolean
  id?: string
  message?: string
}

export function PartnerIntakeForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [message, setMessage] = useState<string>("")
  const [submissionId, setSubmissionId] = useState<string>("")

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")
    setMessage("")
    setSubmissionId("")

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      organizationName: String(formData.get("organizationName") ?? ""),
      website: String(formData.get("website") ?? ""),
      contactName: String(formData.get("contactName") ?? ""),
      contactEmail: String(formData.get("contactEmail") ?? ""),
      useCase: String(formData.get("useCase") ?? ""),
      systems: String(formData.get("systems") ?? ""),
      scope: String(formData.get("scope") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      context: String(formData.get("context") ?? ""),
    }

    try {
      const response = await fetch("/api/partners/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = (await response.json()) as SubmissionResponse

      if (!response.ok || !result.ok) {
        setStatus("error")
        setMessage(result.message ?? "Submission failed. Please try again.")
        return
      }

      form.reset()
      setStatus("success")
      setSubmissionId(result.id ?? "")
      setMessage("Submission received. Our team will review and respond by email.")
    } catch {
      setStatus("error")
      setMessage("Network issue while submitting. Please retry or use email.")
    }
  }

  return (
    <form onSubmit={onSubmit} className="border-2 border-foreground p-5 lg:p-6 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Organization</span>
          <input
            name="organizationName"
            required
            maxLength={160}
            className="border border-foreground/40 bg-background px-3 py-2 text-xs font-mono outline-none focus:border-foreground"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Website</span>
          <input
            name="website"
            type="url"
            placeholder="https://"
            maxLength={200}
            className="border border-foreground/40 bg-background px-3 py-2 text-xs font-mono outline-none focus:border-foreground"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Contact Name</span>
          <input
            name="contactName"
            required
            maxLength={120}
            className="border border-foreground/40 bg-background px-3 py-2 text-xs font-mono outline-none focus:border-foreground"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Contact Email</span>
          <input
            name="contactEmail"
            type="email"
            required
            maxLength={160}
            className="border border-foreground/40 bg-background px-3 py-2 text-xs font-mono outline-none focus:border-foreground"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Use Case</span>
        <textarea
          name="useCase"
          required
          rows={4}
          maxLength={2500}
          className="border border-foreground/40 bg-background px-3 py-2 text-xs font-mono outline-none focus:border-foreground"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Related Systems</span>
        <input
          name="systems"
          placeholder="memory, vision, code intelligence, governance, MCP..."
          maxLength={300}
          className="border border-foreground/40 bg-background px-3 py-2 text-xs font-mono outline-none focus:border-foreground"
        />
      </label>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Scope</span>
          <input
            name="scope"
            required
            maxLength={240}
            className="border border-foreground/40 bg-background px-3 py-2 text-xs font-mono outline-none focus:border-foreground"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Timeline</span>
          <input
            name="timeline"
            maxLength={200}
            className="border border-foreground/40 bg-background px-3 py-2 text-xs font-mono outline-none focus:border-foreground"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">Additional Context</span>
        <textarea
          name="context"
          rows={4}
          maxLength={2500}
          className="border border-foreground/40 bg-background px-3 py-2 text-xs font-mono outline-none focus:border-foreground"
        />
      </label>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-fit border-2 border-foreground px-4 py-2 text-[10px] font-mono tracking-wider uppercase text-foreground hover:bg-foreground hover:text-background transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Submitting..." : "Submit Intake"}
        </button>
        <p className="text-[11px] font-mono text-muted-foreground">
          Prefer direct email?{" "}
          <a href="mailto:contact@agentralabs.tech" className="underline hover:text-foreground">
            contact@agentralabs.tech
          </a>
        </p>
        {message ? (
          <p className={`text-xs font-mono ${status === "error" ? "text-red-600" : "text-green-700"}`}>
            {message}
            {submissionId ? ` Submission ID: ${submissionId}` : ""}
          </p>
        ) : null}
      </div>
    </form>
  )
}

