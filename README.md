# Frank Realtors — Website

Built with **Next.js 16** (App Router) and **Tailwind CSS 4.3**, in a soft
neumorphic style matching the reference design at raymonjohns.vercel.app.
Headings and the logo wordmark use a cursive display font (Dancing Script);
body copy uses Poppins.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

To build for production:

```bash
npm run build
npm start
```

## Structure

- `app/page.tsx` — Home
- `app/services/page.tsx` — Services overview
- `app/services/[slug]/page.tsx` — One statically-generated page per service
  (Estate Development, Surveying, Land Documentation, Land Settlement, Farm
  Management, Construction, Compound Design)
- `app/land/page.tsx` — All land listings from the flyer, with prices
- `app/contact/page.tsx` — Contact info + form
- `lib/data.ts` — All services, land listings, and contact details in one
  place — edit here to add/remove services or update prices
- `components/` — Header, Footer, ContactForm, ServiceCard, Section

## WhatsApp contact form

`components/ContactForm.tsx` builds a `wa.me` link from the form fields and
opens it in a new tab/app with the message pre-filled. No backend or email
service is required. The number used is set in `lib/data.ts`
(`contact.phoneDigits`).

## Editing content

- **Services**: edit the `services` array in `lib/data.ts`. Each entry
  automatically gets its own page at `/services/[slug]`.
- **Land listings & prices**: edit the `landListings` array in `lib/data.ts`
  (`rawListings`). Each entry automatically gets its own page at
  `/land/[slug]` with a photo gallery, description, and feature list.
- **Contact details**: edit the `contact` object in `lib/data.ts`.

## Logo & favicon

`public/logo.png` is an upscaled version of the uploaded logo (4x
Lanczos resampling + sharpening — there's no true AI super-resolution model
available in this build environment, so treat this as a clean-up rather than
a from-scratch regeneration). `app/favicon.ico`, `public/apple-touch-icon.png`,
and `public/icon-192.png` / `icon-512.png` were cropped from the roof mark and
resized for each required size. If you have a higher-resolution or
vector (SVG) version of the logo, swap it into `public/logo.png` and
regenerate the icon files for a sharper result.

## Land listing photos

Each `/land/[slug]` page shows a 5-photo gallery. All listings currently
share the same 5 real site photos (`public/land/plot-1.png` through
`plot-5.png`), set in `galleryFor()` in `lib/data.ts`. **Swap in different
photos per listing whenever you're ready** — just point each listing's
`images` array at different files in `/public`.

## Font

Body and heading type uses **Nunito**, a rounded sans-serif, loaded via
`next/font/google` in `app/layout.tsx`. Since `--font-display` in
`globals.css` is just aliased to `--font-sans`, this single import swap
updates every heading and paragraph across the site consistently.

Want a different rounded feel? Swap the import for one of these (same
one-line change in `app/layout.tsx`):
- **Quicksand** — very round, more minimal/geometric
- **Baloo 2** — rounder and friendlier, bolder personality
- **Fredoka** — playful, chunky rounded terminals
- **Comfortaa** — rounded, modern, works well for short display text

## Design tokens

Colors, the neumorphic shadow utilities (`.neu-card`, `.neu-raised`,
`.neu-pressed`, `.neu-btn`, `.neu-pill`), and the signature gold arrow bullet
(`.arrow-bullet`, echoing the flyer's arrow markers) live in
`app/globals.css`.
