import { randomUUID } from "node:crypto"
import { appendFile, mkdir } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const partnerIntakeSchema = z.object({
  organizationName: z.string().trim().min(2).max(160),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  contactName: z.string().trim().min(2).max(120),
  contactEmail: z.string().trim().email().max(160),
  useCase: z.string().trim().min(12).max(2500),
  systems: z.string().trim().max(300).optional().or(z.literal("")),
  scope: z.string().trim().min(3).max(240),
  timeline: z.string().trim().max(200).optional().or(z.literal("")),
  context: z.string().trim().max(2500).optional().or(z.literal("")),
})

type PartnerIntake = z.infer<typeof partnerIntakeSchema>

function getIntakeStoragePath() {
  return process.env.AGENTRA_PARTNER_INTAKE_PATH || "/tmp/agentra-partner-intake.jsonl"
}

async function storeLocally(record: Record<string, unknown>) {
  const storagePath = getIntakeStoragePath()
  await mkdir(path.dirname(storagePath), { recursive: true })
  await appendFile(storagePath, `${JSON.stringify(record)}\n`, "utf8")
}

async function forwardToWebhook(record: Record<string, unknown>) {
  const webhook = process.env.PARTNER_INTAKE_WEBHOOK_URL
  if (!webhook) return

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(record),
  })

  if (!response.ok) {
    throw new Error(`Webhook forward failed with status ${response.status}`)
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PartnerIntake
    const parsed = partnerIntakeSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid intake payload." },
        { status: 400 },
      )
    }

    const submission = {
      id: randomUUID(),
      submittedAt: new Date().toISOString(),
      source: "partners-intake-web",
      ...parsed.data,
    }

    await storeLocally(submission)
    await forwardToWebhook(submission)

    return NextResponse.json({
      ok: true,
      id: submission.id,
      message: "Submission received.",
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? `Submission failed: ${error.message}`
        : "Submission failed."

    return NextResponse.json({ ok: false, message }, { status: 500 })
  }
}

