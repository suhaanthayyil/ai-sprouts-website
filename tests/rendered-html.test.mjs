import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);

async function createWorker() {
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function request(path = "/", init) {
  const worker = await createWorker();
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html", ...init?.headers }, ...init }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the handcrafted home page and accessible navigation", async () => {
  const response = await request();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>AI Sprouts \| Growing tomorrow’s creators with AI<\/title>/i);
  assert.match(html, /Growing tomorrow’s/);
  assert.match(html, /Skip to content/);
  assert.match(html, /aria-controls="primary-navigation"/);
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("renders program and event filtering controls from central data", async () => {
  const [programResponse, eventResponse] = await Promise.all([request("/programs"), request("/events")]);
  const [programHtml, eventHtml] = await Promise.all([programResponse.text(), eventResponse.text()]);
  assert.match(programHtml, /Program filters/);
  assert.match(programHtml, /AI Explorers/);
  assert.match(programHtml, /Creative AI Studio/);
  assert.match(eventHtml, /Search by name, place, or theme/);
  assert.match(eventHtml, /Community AI Studio/);
  assert.match(eventHtml, /Fort Mill Library AI Lab/);
});

test("renders detail pages and keeps event-day media grouped", async () => {
  const [programResponse, recapResponse] = await Promise.all([
    request("/programs/ai-explorers"),
    request("/events/fort-mill-library-ai-lab"),
  ]);
  const [programHtml, recapHtml] = await Promise.all([programResponse.text(), recapResponse.text()]);
  assert.match(programHtml, /What students build/);
  assert.match(programHtml, /Safety &amp; supervision/);
  assert.match(recapHtml, /Day 1/);
  assert.match(recapHtml, /Day 2/);
  assert.match(recapHtml, /Day 1 welcome circle/);
  assert.match(recapHtml, /Day 2 project share/);
});

test("renders gallery consent semantics and safe external links", async () => {
  const response = await request("/gallery");
  const html = await response.text();
  assert.match(html, /photo consent/i);
  assert.match(html, /role="dialog"|Open Activity photo needed/);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noopener noreferrer"/);
});

test("server-validates form submissions and accepts a valid privacy-safe message", async () => {
  const invalid = await request("/api/forms", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ kind: "contact", name: "A", email: "bad" }),
  });
  assert.equal(invalid.status, 400);

  const valid = await request("/api/forms", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json", "cf-connecting-ip": "test-valid" },
    body: JSON.stringify({ kind: "contact", name: "Parent Person", email: "parent@example.com", message: "Please share future workshop details.", consent: "on" }),
  });
  assert.equal(valid.status, 200);
  assert.deepEqual(await valid.json(), { ok: true, delivery: "accepted-no-persistence" });
});

test("all primary routes return successful HTML", async () => {
  const paths = ["/about", "/programs", "/events", "/student-projects", "/gallery", "/team", "/partners", "/get-involved", "/contact", "/register", "/privacy"];
  for (const path of paths) {
    const response = await request(path);
    assert.equal(response.status, 200, `${path} should render`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html/i);
  }
});
