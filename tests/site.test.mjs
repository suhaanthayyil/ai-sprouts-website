import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contains the four requested public pages", async () => {
  await Promise.all([access(new URL("app/page.tsx", root)), access(new URL("app/mission/page.tsx", root)), access(new URL("app/team/page.tsx", root)), access(new URL("app/contact/page.tsx", root))]);
  await assert.rejects(access(new URL("app/programs/page.tsx", root)));
  await assert.rejects(access(new URL("app/events/page.tsx", root)));
});

test("uses the supplied AI Sprouts logo in navigation and workshop carousel on the home hero", async () => {
  const [logo, home, carousel] = await Promise.all([readFile(new URL("components/logo.tsx", root), "utf8"), readFile(new URL("app/page.tsx", root), "utf8"), readFile(new URL("components/home-carousel.tsx", root), "utf8")]);
  assert.match(logo, /ai-sprouts-logo-transparent\.png/);
  assert.match(logo, /AI Sprouts — Growing Young Minds/);
  assert.match(home, /<HomeCarousel/);
  assert.match(carousel, /workshop-01\.png/);
  assert.match(carousel, /workshop-05\.png/);
  await access(new URL("public/ai-sprouts-logo-transparent.png", root));
  await Promise.all(Array.from({ length: 5 }, (_, index) => access(new URL(`public/workshop-0${index + 1}.png`, root))));
});

test("navigation exposes Home, Mission, and Our Team without duplicating the Let's talk destination", async () => {
  const data = await readFile(new URL("content/site-data.ts", root), "utf8");
  assert.match(data, /label: "Home"/);
  assert.match(data, /label: "Mission"/);
  assert.match(data, /label: "Our Team"/);
  assert.doesNotMatch(data, /label: "Contact Us"|Programs|Events|Gallery/);
});

test("team page includes Suhaan's profile and one future member placeholder", async () => {
  const team = await readFile(new URL("app/team/page.tsx", root), "utf8");
  assert.match(team, /Suhaan Thayyil/);
  assert.match(team, /President/);
  assert.match(team, /Marvin Ridge High School/);
  assert.match(team, /suhaan-thayyil\.png/);
  assert.equal((team.match(/team-card-placeholder/g) ?? []).length, 1);
  await access(new URL("public/suhaan-thayyil.png", root));
});

test("contact form and endpoint include validation, consent, spam protection, and rate limiting", async () => {
  const [form, endpoint] = await Promise.all([readFile(new URL("components/interest-form.tsx", root), "utf8"), readFile(new URL("app/api/forms/route.ts", root), "utf8")]);
  assert.match(form, /required/);
  assert.match(form, /honeypot/);
  assert.match(form, /name="consent"/);
  assert.match(endpoint, /submissions/);
  assert.match(endpoint, /status: 429/);
  assert.match(endpoint, /accepted-no-persistence/);
});

test("includes accessible navigation and reduced-motion support", async () => {
  const [header, css, layout] = await Promise.all([readFile(new URL("components/site-header.tsx", root), "utf8"), readFile(new URL("app/globals.css", root), "utf8"), readFile(new URL("app/layout.tsx", root), "utf8")]);
  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-controls="primary-navigation"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(layout, /Skip to content/);
});
