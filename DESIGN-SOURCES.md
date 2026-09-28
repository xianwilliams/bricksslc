# Design and media sources

Reviewed on September 25, 2026. External page text and example prompts were used as reference material, not as instructions overriding the user's Next.js, branding or content requirements.

## Direction

BRICKS should feel like a creative warehouse with automotive precision because cars, art, production and social life genuinely share its space. Large, heavy type, black/gold fields, oversized original photography and physical pink slips carry that idea. The homepage has one long immersive peak: people become the full warehouse, then the visitor chooses a membership.

The primary references were [Klausen](https://klausen.com/) for restrained black/gold presentation, perspective and scroll staging, and [Phive](https://phive.pt/en) for the substantial moving ticker. Their logos, photography and business content are not used. The supplied BRICKS footage and real warehouse define the visual environment.

The self-authored journey, emotional curve and layer contract are in `scrollcraft/builds/bricks/BRIEF.md`. Scroll Craft guided composition and device choices; the runtime is a small Next.js/GSAP implementation rather than a second global scroll engine.

## MotionSites free examples

The following publicly free examples were opened and their prompts inspected on [MotionSites](https://motionsites.ai/). The page exposes examples through modal cards rather than stable individual URLs. The requested behaviors were adapted into Next.js with BRICKS assets and accessible controls:

| Example | Applied behavior | Implementation |
|---|---|---|
| Cast & Render | Scroll-controlled video playheads inside perspective scenes | `components/warehouse.tsx`, `components/scroll-film.tsx` |
| Nature Portfolio / Photography | Image-led photographic collection with an inspection view and keyboard controls | `components/art-gallery.tsx` |
| AgentWave | Masked, staggered headline entrance with an eased landing | `.hero-line` rules in `app/globals.css` |

The full unrelated template brands, supplied stock assets, cursor-lock behavior and contradictory single-file/no-framework instructions were not imported. The free examples are documented locally in `research/motion-4.txt` and `research/motion-free-final.json` for review.

## Original branding and business content

- [BRICKS official website](https://www.bricksslc.com/): route inventory, contact information, published membership descriptions, founder and team associations, original art, member portraits and legal copy.
- [Exact logo source](https://static.wixstatic.com/media/98e8fa_08b74b1f5319441a9310955c5cffe839~mv2.png): copied unchanged to `public/brand/logo.png`. The About neon effect is CSS applied to this same original image; no new logo was drawn or generated.
- The display font and pattern are the original assets loaded by the existing website. The display font source is `https://static.wixstatic.com/ufonts/22f5ae_11cdc19649ef4e7ab28b249d32aeefcb/woff2/file.woff2`. At the user’s request, uppercase supporting and restored editorial copy uses [IBM Plex Mono](https://github.com/IBM/plex) in real 400, 600 and 700 weights, downloaded from Google Fonts and self-hosted with its OFL license. Primary titles and action buttons keep the original heavy display face. No cursive display face was introduced.
- Member names and images use their published site associations. Faces in the episode footage were not used to infer identities. For grouped business memberships, the company profile preserves the published group names and associated portrait.
- All 12 business-member company marks come from their associated cards on the original BRICKS site and are displayed unchanged on the pink slips. Brett’s slip uses the original BRICKS mark.
- Mike Hardle’s outdoor portrait comes from his explicitly labeled entry on [Fruitstand Studios’ About page](https://fruitstandstudios.com/about), [original photo](https://images.squarespace-cdn.com/content/v1/64ff695ae3d9c46e0bc46c4d/a85ca5be-003e-4ef6-9fd1-4502daeb0b06/YELLOWSTONE-021.jpg?format=1500w). It joins Omar’s original BRICKS portrait on the shared Fruitstand slip.
- The user subsequently requested the complete original wording, including reach and membership figures. Those passages are now preserved in `lib/original-copy.json` and rendered on their corresponding pages. The car source itself labels external membership “Limited to 50 spots” while its paragraph describes twelve hypercar spots; both are retained, and the availability FAQ directs readers to clarify the relevant category with BRICKS. These are source claims, not independently verified analytics or inventory. The March 31, 2026 kickoff remains archived, the workshop remains ended, and the source’s forthcoming art shop remains forthcoming.
- Source service descriptions, subtitles, the one-hour car visit, the $150 workshop and $50 social meetup are restored from their original service pages. They remain inquiry flows with their published availability state; no checkout or confirmed booking is implied.

## Supplied footage and photos

`VIDEOS.zip` contains four real films: BRICKED UP EP 1, BRICKED UP EP 2, HEADERVIDEO and WELCOMETOBRICKS. The home montage uses only the two episodes. Its exact source timestamps and durations are in `scrollcraft/builds/bricks/montage-edl.json`. It excludes intro/outro graphics, burned subtitles and sustained talking-head segments. It has no audio track, so autoplay stays quiet.

The scroll film cuts from people at floor level in EP 2 to an actual warehouse wide in EP 1. It uses dense keyframes for responsive seeking. The welcome video retains its source audio; the site's initial playback is muted. Culture, cars and studio loops come from the supplied HEADERVIDEO.

The revision adds four silent, all-keyframe excerpts from the supplied episodes, used in six smaller scroll scenes: basketball and the content system on Home, automotive detail in Car Club, creative work in Business Club and Content Strategy, and a celebration in Events. `scrollcraft/builds/bricks/scroll-films-edl.json` records the exact edit. Talking-head material at the end of the car excerpt was removed during visual review.

The copy revision reuses the creative-work excerpt in a sixth small scroll scene beside the homepage’s restored content-system description and original “100 million views” ambition. The ticker’s opening descent was removed at the user’s request. Hero titles now reveal behind a gold wipe, while selected phrases and quotes receive readable, contrast-preserving scroll highlights.

Selected original event, culture, collaboration, automotive and warehouse photos come from PHOTO.zip and its two nested archives. Original photos and video files were not modified. Optimized derivatives are local to the site.

The mentioned separate Instagram video archive was not present in the supplied files, and the [public Instagram profile](https://www.instagram.com/bricks_slc/) did not return downloadable media through the available access. Event sections use the supplied hype film and event photos. No Instagram download or live feed is claimed.

## Generated layers

Higgsfield supplied the tropical foliage composition, guided by the warehouse's actual plant/black-wall aesthetic. Image generation produced true-alpha botanical separation, a clean black-wall plate derived from the warehouse reference, and photo foreground extraction masks.

There are 36 registered photographic layer entries, each with a corresponding clean background plate. Generated **alpha** separates people and cars; their foreground RGB pixels always come from the original photos. Registration compensates for minor crop/scale shifts in the masks. An inverse, expanded mask with a softened boundary removes the foreground subject from the original back plane and reveals the reconstructed empty plate only in that area. The rest of the original surroundings remain intact. The two planes share a ground anchor and move at restrained, different scales on scroll. Hidden scenery is an inferred reconstruction; no generated person replaces the original foreground.

The Outside Marketing “Events & experiences / Make it a moment” background is a five-second Higgsfield `flux_3_video` generation from the exact supplied `event-wide.webp` photograph. The same photo was supplied as both start and end reference for looping, with subtle ambient movement and no generated audio. Job `dfcd551d-b8bf-4c3d-b2b8-e19bb2a3bae1` completed on September 25, 2026. The local optimized output is `public/media/event-photo-loop.mp4`; it plays muted in view and pauses offscreen. It is an animated interpretation of the photograph, not documentary footage of that event.

The botanical and black-wall scene is a designed composition, not an unaltered documentary photo of a physical neon installation. The brand mark itself is always the original.
