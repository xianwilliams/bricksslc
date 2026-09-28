# BRICKS — a different kind of house

A cinematic Next.js App Router website for BRICKS SLC, using the supplied films and photography and the original logo from bricksslc.com.

## Run locally

Use Node.js 24 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For a production preview:

```sh
npm run build
npm start
```

The production build uses Next.js's supported Webpack option. Turbopack's production CSS worker could not bind its internal port in this environment; development still uses Turbopack.

## What is here

- 20 public routes, retaining the existing club, events, About, art, contact, founder, booking, service, event-detail and legal pages. Dedicated membership and member-directory pages make the main choices easier to find.
- A silent, exactly 30-second / 900-frame home montage, with 17 cuts from both supplied BRICKED UP episodes. A smaller mobile encode loads on phones.
- A gold ticker nested beneath the hero from first paint, a perspective warehouse film and six additional scroll-controlled video scenes. Homepage imagery overlaps chapter boundaries with tighter spacing throughout.
- Original-pixel photo cutouts over clean background plates, varied type entrances, 13 company-branded pink slips (Brett first), six black VIP house-team badges, and both Omar and Mike on Fruitstand’s slip.
- A Higgsfield loop made from the original Outside Marketing event photograph, plus the original BRICKS logo glowing between separate tropical foliage layers on About.
- An About welcome film that starts muted when 95% visible, explicit playback and sound controls, an inspectable art gallery, responsive layouts, keyboard navigation, reduced-motion behavior and no-JavaScript content fallbacks.
- Restored original page copy, bold action buttons, locally hosted IBM Plex Mono supporting text, hero highlight wipes and scroll-driven emphasis. Long source passages are broken into readable paragraphs without rewriting their wording.

## Inquiries

All inquiry paths go to **brett@bricksslc.com**, as requested. Without email credentials, the form validates the details, shows a review, and opens a populated email draft. It explicitly says the message has not been sent. Copying the inquiry is also available.

To enable direct delivery, copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `CONTACT_FROM` to a verified Resend sender. Restart/rebuild the server. Keep the API key server-side. The recipient is fixed in `lib/site.ts`; there is no separate environment recipient that can disagree with the visitor-facing copy.

The contact endpoint validates the payload again, rejects cross-origin requests and oversized/invalid submissions, uses a honeypot and consent field, and only returns success after the provider accepts the email. Its bounded in-memory rate limit is a single-process backstop. A public deployment with multiple instances should use the host's shared rate limiting. No database, analytics, payment collection, fabricated availability or confirmed-booking flow is added.

Direct email delivery needs credentials and a real delivery check before launch. No real email was sent during development or testing.

## Editing the site

- `app/`: route content and page-specific composition.
- `components/`: shared navigation, video, photo layers, members, inquiry form and interactive scenes.
- `lib/site.ts`: public business information, memberships, sourced member names and roles.
- `lib/original-copy.json`: original BRICKS prose and service details. The independent source-copy fixture in `tests/fixtures/` lets browser verification detect missing content.
- `lib/legal.json`: migrated original BRICKS app policies, with provider content stored once.
- `public/brand/`: original logo, original site pattern and supplied site fonts.
- `public/media/`: optimized local website media. Original archives remain untouched in `BRICKS GFX ASSETS/` and are excluded from version control.
- `lib/photo-layers.json`: geometry mapping generated alpha masks onto unchanged original photo pixels.

See [DESIGN-SOURCES.md](./DESIGN-SOURCES.md) for source attribution and creative decisions, and [VERIFICATION.md](./VERIFICATION.md) for the checks and remaining launch items.

## Checks

```sh
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build
```

With the preview running, `npm run verify` performs page, keyboard, media, inquiry and accessibility checks. It uses an installed Chrome through Playwright; set `CHROME_PATH` for another installation and `PREVIEW_URL` for another local port. Results and screenshots are written to `scrollcraft/builds/bricks/qa/`. The script prepares a test inquiry but never submits it or opens an email app.

## Media rebuilds

`python3 scripts/refine-montage.py` rebuilds the final montage and its edit decision list from the two extracted episode files. It requires FFmpeg. `scripts/build-media.py` rebuilds the other films and selected photos; it invokes the same authoritative montage edit. Source inventory is in the ignored `research/` folder.

`scripts/build-scroll-films.py` rebuilds the four short episode excerpts used across six scroll scenes. Their source timecodes are in `scrollcraft/builds/bricks/scroll-films-edl.json`.

`scripts/analyze-masks.py` measures geometric registration and converts generated RGBA masks losslessly to WebP; it does not substitute generated faces for the originals. It requires Pillow, NumPy and OpenCV. The browser applies those masks to the original RGB photographs and removes the corresponding subject from the back plane using the clean plates in `public/media/plates/`. All three assets must decode before the layered version appears; otherwise the intact original remains. All 36 masks and plates are included, so generation is not required to run the site.
