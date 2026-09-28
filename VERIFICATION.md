# Verification — September 25, 2026

The site is built and running locally for human review at **http://127.0.0.1:3000**. It has not been publicly deployed or committed.

## Automated checks

| Check | Result |
|---|---|
| TypeScript | Passed; strict project check and production build type checking |
| ESLint | Passed, no warnings or errors |
| Prettier | Passed for application, components, data, tests, browser verifier and configuration |
| Inquiry tests | 8 passed, covering invalid/conditional input, consent, honeypot, encoding, approved recipient, unavailable delivery, provider failures and repeat limits |
| Production build | Passed using `next build --webpack`; all 20 public routes generated or served successfully |
| Dependency advisory scan | npm audit: 0 vulnerabilities |
| Browser route checks | 40 checks: every public route at 1440×1000 and 390×844, no missing initial images, horizontal overflow or text overflow |
| Original copy | 45 source passages/details present across 16 routes; remaining legal routes retain their separately migrated text |
| Internal navigation | Every collected internal link resolves; unknown page returns HTTP 404 |
| Accessibility automation | axe WCAG 2 A/AA and 2.1 AA checks: 0 violations on home, About, members, contact and privacy |
| Console | No uncaught page errors during the production browser run |
| Montage | FFprobe confirms exactly 30.000 seconds, 900 frames; 17 source cuts, both episodes, no audio |

The browser run also checks the 6.2-second warehouse film at five scroll positions, short scroll videos across five routes, four foreground transforms at multiple scroll positions, the Higgsfield event loop, the revised member-card structure and a deliberately failed background-plate request. The homepage has two short films, bringing the smaller placements to six. The earlier dialog inspection results remain in `scrollcraft/builds/bricks/qa/final-pass.json`.

Results and screenshots are in `scrollcraft/builds/bricks/qa/verification.json` and the surrounding QA directory. Research/QA images are intentionally excluded from version control.

## Browser and visual review

Headless Chrome was used to inspect rendered desktop, phone and compact 360×640 layouts. The homepage, club layouts, event collage, art collection, contact form, plants, warehouse sequence and member slips were visually inspected. The desktop and phone compositions use different type sizes, image positions and card arrangements.

The browser checks exercised:

- Native menu opening, Escape closing and return of keyboard focus.
- Ticker pause; film dialog playback and stop on close.
- Five warehouse scroll positions; the video playhead advances with the page and the frame opens in perspective.
- Short scroll videos on Home, Business Club, Car Club, Content Strategy and Events advance their playheads with the page while remaining paused as ordinary videos. Both homepage placements were visually inspected. The silent event-photo loop starts in view, loops, and pauses offscreen.
- The original photograph disappears only after all three layer assets decode. Backgrounds use clean plates under inverse subject masks; foreground transforms change with scroll. A blocked plate request retains the complete original without displaying the cutout.
- The member directory contains 13 original-logo pink slips and six black VIP passes. Fruitstand has two separate portraits, labeled Omar and Mike. Both desktop and phone versions were inspected.
- Membership preview switching on hover; the same links respond to keyboard focus.
- About foliage separating on scroll; welcome film autoplay while fully in frame, mute controls and pause offscreen.
- Art inspection, keyboard next/previous support and Escape close.
- Membership inquiry deep links, conditional revenue fields, event date/guest fields, review, editing without losing data, and correctly encoded draft addressed to Brett. No draft was sent.
- Reduced motion: ambient and warehouse videos are not downloaded automatically. No-JavaScript page content and direct email fallback remain available.

There are **41 layered figures out of 43 photo figures (95%)** across the route inventory, including the six VIP portraits, plus **14 layered portrait surfaces on the 13 pink slips**. The two full-art surfaces use whole-image motion. These reuse 36 registered layer assets, each with a clean plate. Decorative logos, masks, video posters and repeated dialog inspection images are excluded from the photograph count.

Revision visual captures are in `scrollcraft/builds/bricks/qa/revision-final/`. All 34 unique registered photo assets encountered in that route sweep loaded their layers successfully. Later edge-softening and mobile focal-position checks are recorded in `scrollcraft/builds/bricks/qa/revision-polish/`.

## Independent simplicity critique

A fresh agent, with no memory of building the site, reviewed the implementation under the engineering skill's working standard. It judged the overall component and route boundaries proportional to the requested scope. Its small findings were applied: superseded narrow-phone CSS was removed, the legal provider table now has one source, unused photo options were removed, the recipient override was eliminated, and the format/verification scripts were completed. No substantive critique finding was rejected.

A fresh revision review also checked the photo composition and changed layouts. Its cleanup findings were applied: 17 obsolete CSS selectors were removed, unregistered photos no longer receive empty background tweens, obsolete member-count expectations were updated, and redundant SVG crop rules were removed. It found the separate foreground edge and background removal masks justified; no additional abstraction was needed.

The copy and typography bundle received its own fresh simplicity review. An unused copy field was removed. The reviewer also identified the source car page's conflicting 50-spot heading and twelve-spot paragraph; both original statements are preserved, with a clarification in the availability FAQ. The shared prose/highlight component, simplified ticker and consolidated culture styles were considered proportionate to the change.

## Copy and typography revision

The original-copy fixture checks 45 source passages and service details across 16 corresponding routes. Existing legal text remains migrated separately. Supporting copy uses self-hosted IBM Plex Mono in actual 400, 600 and 700 weights. Primary headlines and gold action buttons retain BRICKS' heavy display type.

Visual captures in `scrollcraft/builds/bricks/qa/type-copy/` cover the restored editorial copy at desktop and phone widths. `qa/type-animation/` adds 12 intermediate/resting hero wipe states and six final layout views, including the Contact hero, homepage manifesto, member button and Car Club paragraphs. Gold wipes resolve to fully readable titles. Selected quotes and phrases highlight progressively on scroll, and the ticker stays in document flow directly below the hero from first paint.

The final production verifier passed shared wipe markup on every public hero, the IBM font and bold weight, ticker placement, and scroll-highlight progress from 0% to 100%. The desktop member button is 70px high with 48px clear space before the film. All 40 route/viewport checks and 21 interaction groups passed, with no uncaught browser errors and no axe findings on the five audited routes. See `research/type-copy-production.log` for the run output.

## Limits and launch items

- Direct server-to-inbox delivery needs `RESEND_API_KEY`, a verified `CONTACT_FROM`, and a real delivery check. Until then, the working form prepares an email draft for **brett@bricksslc.com** and clearly asks the visitor to send it from their email app. The provider interaction was mocked in tests.
- The separate Instagram video archive mentioned in the request was not among the supplied ZIP contents, and public profile media was unavailable through the available access. Event sections use supplied footage and photos; there is no live Instagram integration.
- Physical iOS/Safari/Android device playback, slow cellular performance and screen-reader speech output were not tested. Chrome viewport emulation and automated accessibility checks do not replace those checks.
- Source booking dates/capacity were not invented. BRICKS confirms current availability and pricing directly. Existing app legal copy is migrated, not represented as a new legal review.
- The default Turbopack production build hit an environment-level internal-port permission error. The supported Webpack build passed and is the configured build command. No changes to system permissions were made.

## Suggested review path

1. Open the homepage; watch the title wipe and montage loop. The ticker starts directly below the video. Scroll through the restored manifesto, warehouse reveal, membership options and content-system quote.
2. Open **The people** and scroll Brett's slip, the company logos, Fruitstand’s two portraits and the six black VIP passes.
3. Open **About us** from the menu; scroll the plants, then use the welcome video's sound control.
4. Visit Outside Marketing’s **Make it a moment** panel for the new photo loop; visit Car Club, Business Club, Content Strategy and Events for the short scroll films.
5. Open a club's **Get in** link; review a draft and confirm the correct membership interest is carried into the form.
6. Repeat the key pages at phone width. A real phone/Safari pass and an authorized inbox delivery test are the remaining launch checks.
