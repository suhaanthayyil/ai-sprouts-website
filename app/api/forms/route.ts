import { NextResponse } from "next/server";

const submissions = new Map<string, { count: number; resetAt: number }>();
const allowedKinds = new Set(["registration", "contact", "host", "volunteer"]);

function clean(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().replace(/[<>]/g, "").slice(0, max) : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  const rate = submissions.get(ip);
  if (rate && rate.resetAt > now && rate.count >= 5) {
    return NextResponse.json({ error: "Too many submissions. Please wait a few minutes and try again." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json() as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website)) return NextResponse.json({ ok: true });
  const kind = clean(body.kind, 30);
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message);
  if (!allowedKinds.has(kind) || name.length < 2 || !isEmail(email) || body.consent !== "on") {
    return NextResponse.json({ error: "Please complete the required fields and confirm consent." }, { status: 400 });
  }
  if (kind !== "registration" && message.length < 4) {
    return NextResponse.json({ error: "Please add a little more detail to your message." }, { status: 400 });
  }
  if ((kind === "registration" || kind === "volunteer") && body.ageConfirm !== "on") {
    return NextResponse.json({ error: "The age or guardian confirmation is required." }, { status: 400 });
  }

  submissions.set(ip, rate && rate.resetAt > now ? { ...rate, count: rate.count + 1 } : { count: 1, resetAt: now + 10 * 60 * 1000 });
  // Intentionally do not log form content. Connect an approved CRM or transactional email provider here.
  return NextResponse.json({ ok: true, delivery: "accepted-no-persistence" });
}
