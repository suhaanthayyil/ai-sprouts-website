import { NextResponse } from "next/server";

const submissions = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max = 2000) {
  return typeof value === "string" ? value.trim().replace(/[<>]/g, "").slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  const now = Date.now();
  const rate = submissions.get(ip);
  if (rate && rate.resetAt > now && rate.count >= 5) return NextResponse.json({ error: "Too many messages. Please wait a few minutes and try again." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await request.json() as Record<string, unknown>; }
  catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  if (clean(body.website)) return NextResponse.json({ ok: true });
  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const inquiryType = clean(body.inquiryType, 120);
  const message = clean(body.message);
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || inquiryType.length < 2 || message.length < 4 || body.consent !== "on") {
    return NextResponse.json({ error: "Please complete every required field and confirm consent." }, { status: 400 });
  }

  submissions.set(ip, rate && rate.resetAt > now ? { ...rate, count: rate.count + 1 } : { count: 1, resetAt: now + 10 * 60 * 1000 });
  return NextResponse.json({ ok: true, delivery: "accepted-no-persistence" });
}
