# AI Sprouts website

A standard local Next.js website with six public pages:

- `/`: Home
- `/mission`: Mission
- `/team`: Our Team
- `/ambassador-program`: Ambassador Program application
- `/map`: Interactive chapter map
- `/contact`: Contact Us

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

- `app/page.tsx`: Home page
- `app/mission/page.tsx`: Mission page
- `app/contact/page.tsx`: Contact page
- `app/ambassador-program/page.tsx`: Embedded ambassador application
- `app/map/page.tsx`: World map of current chapter locations
- `components/google-form-embed.tsx`: Embedded Google Forms used by the contact and ambassador pages
- `components/`: Header, footer, logo, shared page elements, and contact form
- `content/site-data.ts`: Central organization, navigation, and mission content
- `app/globals.css`: Responsive visual system

## Form submissions

The contact and ambassador forms are Google Forms embedded directly in the website. They are owned by `aisproutsofficial@gmail.com`, with email notifications enabled for new responses. Ambassador applicants provide a required shareable Google Drive or Dropbox résumé link so the full application can remain embedded in the site.

No email API keys or environment variables are required.
