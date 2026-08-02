# AI Sprouts website

A responsive, multi-route website for AI Sprouts, built with the Next.js App Router, TypeScript, React, Tailwind CSS utilities, and a Cloudflare-compatible Vinext runtime.

## Current architecture

- `app/` — routes, route metadata, sitemap, robots policy, and server-side form endpoint
- `components/` — shared layout, UI, filters, lightbox, and form components
- `content/site-data.ts` — typed, centralized, CMS-ready content layer
- `public/` — social preview and future approved brand/media assets
- `tests/` — production-render and form endpoint tests
- `worker/` — Cloudflare Worker entry point used by Vinext and Sites
- `.openai/hosting.json` — Sites deployment configuration

The project was initialized in an empty workspace, so there was no previous architecture, brand logo, photography, or verified content to preserve. All unverified content is clearly labeled in the data or UI.

## Route map

- `/` — Home
- `/about` — About and mission
- `/programs` — Filterable program catalog
- `/programs/[slug]` — Program detail pages
- `/events` — Searchable/filterable events
- `/events/[slug]` — Reusable day-by-day recap pages
- `/student-projects` — Privacy-safe project examples
- `/gallery` — Filterable, keyboard-accessible lightbox gallery
- `/team` — Team profiles
- `/partners` — Partner pathways
- `/get-involved` — Audience-specific participation paths
- `/contact` — General contact form
- `/contact?type=host` — Host-a-program form
- `/contact?type=volunteer` — Volunteer form
- `/register` — Parent/guardian interest form
- `/privacy` — Privacy policy framework
- `/api/forms` — Validated, rate-limited form endpoint
- `/sitemap.xml` and `/robots.txt` — Search engine support

## Setup

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Validation commands:

```bash
npx tsc --noEmit
npm run lint
npm test
npm run build
```

## Environment variables

No environment variables are required for the current local, non-persistent implementation. The forms validate submissions and show success/error states, but intentionally do not store or forward family information until an approved destination is configured.

For production, add only the variables required by the selected service and keep them server-side. Likely future values include a transactional email/CRM credential and Instagram API credentials. Never prefix secret values with `NEXT_PUBLIC_`.

## Replacing placeholder content

1. Replace organization details, announcements, programs, events, projects, impact values, partners, testimonials, and team profiles in `content/site-data.ts`.
2. Set `verificationStatus` to `verified` only after details have been reviewed.
3. Copy the official logo and approved images into `public/brand/` and `public/media/`.
4. Add the public path to each media record’s `src` property, for example `/media/workshops/fort-mill/day-1/model-testing.jpg`.
5. Set `photoConsent` to `confirmed` only after the organization has documented appropriate permission.
6. Replace the CSS placeholder mark in `components/logo.tsx` with the official asset once it is supplied.
7. Replace placeholder partner/testimonial/team entries rather than publishing them as real endorsements.

The generated `public/og.png` is a bespoke social preview. Replace it if the final logo or brand direction changes.

## Adding programs, events, and recap photos

Programs and events are arrays in `content/site-data.ts`. Program and event detail routes are generated from each item’s unique `slug`.

For an event recap:

1. Add the event metadata to `events`.
2. Add approved image records to `media` with descriptive alt text and consent status.
3. Give each recap day its own `mediaIds` array. Do not reuse an image under the wrong day.
4. Keep student names anonymous unless documented parental permission explicitly supports publication.
5. Confirm the venue, date, partner acknowledgment, and related program before setting the entry to `verified`.

## Connecting the official Instagram API

The gallery page currently uses the safest fallback: curated local placeholder entries. It does not scrape Instagram.

To connect Instagram later:

1. Create and configure a Meta app using the current [official Instagram Platform documentation](https://developers.facebook.com/docs/instagram-platform/).
2. Use the login flow that matches the organization’s eligible professional Instagram account and request only the permissions needed to read the organization’s own media.
3. Store the access token and account/user ID as server-side Sites environment values, never in client code or committed files.
4. Add a server-only Instagram provider that maps approved API responses to the existing card shape: image, caption excerpt, date, post type, and permalink.
5. Cache results, handle token expiry and API errors, and keep the curated `content/site-data.ts` entries as the fallback.
6. Keep external links on the original Instagram permalink with `target="_blank"` and `rel="noopener noreferrer"`.
7. Review Meta’s current display, caching, privacy, and token-lifecycle requirements before launch because platform rules can change.

Suggested future server-side variables:

```text
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_USER_ID=
```

## Form delivery

`app/api/forms/route.ts` currently provides JSON parsing, field normalization, server-side validation, consent checks, a honeypot, and basic per-IP rate limiting. It deliberately does not log or persist submission content.

Before public launch, connect the accepted payload to an approved encrypted CRM, database, or email service, document retention/deletion rules, and update the privacy policy with the actual processors and contact details.

## Remaining publication dependencies

- Official AI Sprouts logo and verified contact/domain details
- Approved, consent-confirmed activity photography
- Verified program dates, capacity, venue, and milestones
- Approved team biographies and portraits
- Real partner names/logos and testimonials with publication permission
- Verified impact metrics
- Production form destination and operational privacy policy
- Official Instagram credentials and approved curated posts

