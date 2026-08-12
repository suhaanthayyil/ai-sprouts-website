import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("contains the requested public pages", async () => {
  await Promise.all([access(new URL("app/page.tsx", root)), access(new URL("app/mission/page.tsx", root)), access(new URL("app/team/page.tsx", root)), access(new URL("app/contact/page.tsx", root)), access(new URL("app/ambassador-program/page.tsx", root)), access(new URL("app/chapters/page.tsx", root)), access(new URL("app/map/page.tsx", root))]);
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
  assert.match(data, /label: "Ambassador Program"/);
  assert.match(data, /label: "Chapters"/);
  assert.match(data, /href: "\/chapters"/);
  assert.doesNotMatch(data, /label: "Map"/);
  assert.doesNotMatch(data, /label: "Contact Us"|Programs|Events|Gallery/);
});

test("chapter map includes every current location with accessible interactions", async () => {
  const map = await readFile(new URL("components/chapter-map.tsx", root), "utf8");
  for (const location of ["Coimbatore", "Charlotte", "Waxhaw", "Mint Hill", "Frisco", "New Albany"]) assert.match(map, new RegExp(location));
  assert.match(map, /world-atlas\/countries-110m\.json/);
  assert.match(map, /onMouseEnter/);
  assert.match(map, /onFocus/);
  assert.match(map, /onClick/);
  assert.match(map, /role="button"/);
  assert.match(map, /tabIndex={0}/);
  assert.match(map, /activeChapterCountry\?\.chapters \?\? 0/);
  assert.doesNotMatch(map, /Selected country/);
  assert.match(map, /aria-live="polite"/);
  assert.match(map, /chapters: 3/);
});

test("ambassador application stays in the site through an embedded Google Form", async () => {
  const [page, embed] = await Promise.all([readFile(new URL("app/ambassador-program/page.tsx", root), "utf8"), readFile(new URL("components/google-form-embed.tsx", root), "utf8")]);
  assert.match(page, /ambassadorFormId/);
  assert.match(page, /GoogleFormEmbed/);
  assert.match(page, /upload your resume directly from your computer/i);
  assert.match(page, /Google requires applicants to sign in/i);
  assert.match(embed, /embedded=true/);
  assert.match(embed, /<iframe/);
});

test("team page includes Suhaan and Kairav's profiles", async () => {
  const team = await readFile(new URL("app/team/page.tsx", root), "utf8");
  assert.match(team, /Suhaan Thayyil/);
  assert.match(team, /President/);
  assert.match(team, /Marvin Ridge High School/);
  assert.match(team, /suhaan-thayyil\.png/);
  assert.match(team, /Kairav Karunakaran/);
  assert.match(team, /Senior Vice President/);
  assert.match(team, /potential to transform how we learn, create, and solve problems/);
  assert.equal((team.match(/team-card-placeholder/g) ?? []).length, 1);
  await access(new URL("public/suhaan-thayyil.png", root));
});

test("contact page uses its own embedded Google Form", async () => {
  const [page, data] = await Promise.all([readFile(new URL("app/contact/page.tsx", root), "utf8"), readFile(new URL("content/site-data.ts", root), "utf8")]);
  assert.match(page, /contactFormId/);
  assert.match(page, /GoogleFormEmbed/);
  assert.match(page, /1FAIpQLSfASL_O/);
  assert.match(page, /Get in touch/);
  assert.match(page, /send us a message below/i);
  assert.match(page, /Follow our journey/);
  assert.match(page, /@aisproutsofficial/);
  assert.match(data, /instagram: "https:\/\/www\.instagram\.com\/aisproutsofficial\/"/);
  assert.doesNotMatch(page, /Contact us/);
});

test("includes accessible navigation and reduced-motion support", async () => {
  const [header, css, layout] = await Promise.all([readFile(new URL("components/site-header.tsx", root), "utf8"), readFile(new URL("app/globals.css", root), "utf8"), readFile(new URL("app/layout.tsx", root), "utf8")]);
  assert.match(header, /aria-expanded/);
  assert.match(header, /aria-controls="primary-navigation"/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(layout, /Skip to content/);
});
