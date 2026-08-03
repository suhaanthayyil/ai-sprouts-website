# AI Sprouts website

A standard local Next.js website with three public pages:

- `/` — Home
- `/mission` — Mission
- `/contact` — Contact Us

The site uses the supplied, background-removed AI Sprouts artwork at `public/ai-sprouts-logo-transparent.png` in the navigation, home hero, favicon, and footer.

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

For a local production run:

```bash
npm run build
npm start
```

## Validation

```bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

## Architecture

- `app/page.tsx` — Home page
- `app/mission/page.tsx` — Mission page
- `app/contact/page.tsx` — Contact page
- `app/api/forms/route.ts` — Contact form validation and rate limiting
- `components/` — Header, footer, logo, shared page elements, and contact form
- `content/site-data.ts` — Central organization, navigation, and mission content
- `app/globals.css` — Responsive visual system

## Contact form

The contact form validates submissions, includes a honeypot, consent check, accessible states, and basic per-IP rate limiting. It intentionally does not persist or email messages yet. Connect an approved email or CRM provider before public use.

No environment variables are required for the current local version.
