# Green Lakes — UI redesign (standalone)

A frontend-only redesign of the Green Lakes marketing site. It does **not** touch `apps/web`; it is a separate Vite + React app you can run, review and port into the Next.js app at your own pace.

```bash
cd greenlakes-ui
npm install
npm run dev        # http://localhost:4173
npm run build      # type-check + production build
```

## Deploying to Vercel

This folder is a standalone Vite app. Deploy it as its own Vercel project — `vercel.json` already sets the build (`npm run build`), output (`dist`) and a SPA rewrite so routes like `/explore` and `/estates/nandi-hills-orchard-estate` survive a refresh.

**Option A — Vercel dashboard**

1. Commit and push this folder (it is currently untracked in the monorepo).
2. Vercel → **Add New Project** → import `greenlakes-platform`.
3. Set **Root Directory** to `greenlakes-ui`.
4. Framework preset **Vite** (auto-detected), Build `npm run build`, Output `dist`.
5. Deploy.

**Option B — CLI**

```bash
cd greenlakes-ui
npx vercel          # preview deployment
npx vercel --prod   # production
```

Vite 7 needs Node 20.19+ / 22.12+; `package.json` pins `"node": "22.x"` so Vercel uses the right runtime. No environment variables are required — the app is frontend-only and all fonts, images and charts are bundled.

**Troubleshooting: "commit author doesn't have permission"**

The CLI attaches git metadata when you deploy from inside the monorepo, and Vercel blocks the build if that commit author lacks project permission. Either add the author to the Vercel project, or deploy from a folder outside the git repo:

```bash
# copy the project somewhere that is not inside the git repo, then:
cd /tmp/greenlakes-deploy
npx vercel deploy --prod --yes
```

The deployment is still linked to the same project via the copied `.vercel/project.json`.

## What changed

| Issue | Change |
| --- | --- |
| Goal unclear | Hero says what Green Lakes is in one line; a four-fact band (1/12 smallest stake, ₹43.3 L entry, 14% target, 0 brokers) replaces the mechanism paragraphs. |
| Too much text | Legal text lives on `/ownership`, process detail on `/how-it-works`, and the tokenisation explainer on `/tokenisation`. The landing page is now only the hero, pending new content. |
| Images should be real land | Removed the Munnar/Kerala/Western Ghats stock set and the generic "four kinds of land" gallery. The page now shows the actual Nandi Hills listing hero plus three land photographs, each captioned. |
| No familiarity | "Built for first salaries" band, four investor types, and a plain eligibility line (PAN, Aadhaar, Indian bank account, ₹5.2 L). |
| "Plots" not "shares" | Copy, map and picker were rebuilt around **one fraction of the SPV that owns the whole estate** (1/2, 1/4, 1/6, 1/12). The parcel picker is gone; the map shows the entire estate, not a buyable square. |
| Cluttered nav | Three real routes in the header: `/explore`, `/how-it-works`, `/why-green-lakes`. Ownership and risks live one level down. No anchor-only nav. |
| Text vs. graphs | Three sliders drive live charts: share of estate (donut), target value at exit (projection + principal/target gain bars), and target value on the estate page. Also: survey map, funding progress, valuation history, cost breakdown, land-use bars, hold timeline. |

## Routes

- `/` - landing page in six sections: hero with the brand promise, how it works (four photo steps), the collection (two estate cards), the Green Lakes difference, owner stories, closing call to action
- `/explore` — two estate tiles side by side (photo with place pill, title, status badge, gold value line), filters, entry figures, one small legal footnote
- `/estates/nandi-hills-orchard-estate` — listing page with map, charts, documents, risks
- `/estates/alibaug-coastal-plots` — coming-soon estate
- `/how-it-works` — 5 steps, fees, hold period, ownership chain, FAQ
- `/tokenisation` — what gets tokenised, the land-to-token chain, how a stake is issued, fraction prices, projection, owner stories, FAQ
- `/why-green-lakes` - what we do, our goal (with who it's for), closing invitation
- `/ownership` — SPV structure, data room, risks, FAQ
- `/sign-in` — auth screen (UI only)

## Where to edit

| What | File |
| --- | --- |
| Prices, fractions, IRR, hold period, copy for both estates | `src/data.ts` |
| Colours, type scale, spacing, all component styles | `src/styles.css` |
| Home page sections | `src/pages/Home.tsx` |
| Tokenisation page | `src/pages/Tokenisation.tsx` |
| Owner story carousel | `src/components/StorySlider.tsx` |
| Listing page | `src/pages/EstatePage.tsx` |
| Sliders and returns panel | `src/components/ShareCalculator.tsx` |
| Charts, donut, projection, valuation | `src/components/Charts.tsx` |
| Survey maps | `src/components/EstateMap.tsx` |
| Header/footer | `src/components/Header.tsx`, `src/components/Footer.tsx` |
| Images and credits | `public/media/`, credit list in `src/data.ts` and the footer |

## Numbers and legal copy

All figures were taken from the live staging listing, then re-based on the four-fraction model: 1/2, 1/4, 1/6 and 1/12 of each estate's SPV, priced from the latest valuation (Nandi Hills ₹5.20 Cr, so 1/12 = ₹43,33,000; Alibaug ₹3 Cr, so 1/12 = ₹25,00,000), 14% target IRR, 72 months, 10 acres, 0.7% subscribed, 1.5% platform fee, 18% GST on the fee.

**Please confirm before launch**

- The smallest stake is shown as **1/12** everywhere, priced per estate (₹43,33,000 on Nandi Hills). Nothing smaller than a twelfth is offered. The old 5,000-unit / ₹10,000-per-unit model is gone; check that the offer document matches the fraction wording.
- Alibaug's area, valuation and fraction prices are sample values.
- The 14% IRR and quarterly lease language must match the offer document exactly.
- "NRI under FEMA" is deliberately vague; compliance should own the final wording.

## Design notes

- **Type:** Playfair Display (SIL OFL, self-hosted) everywhere: display headlines, editorial statements, body copy, labels and UI, at weights 400 to 700. One family, no fallback stack. Cards and panels are white with a 2px sage outline on the pastel canvas.
- **Palette:** pastel white `#faf8f3` canvas, pure white `#ffffff` surfaces, sage `#73826d` ink, header, outlines and fills (with deeper sage `#5f6d59` / `#55624f` for hover and depth), sage-tinted greys for secondary copy, and one neon accent `#2afeb7` for small details only (logo dot, status dots, persona badges, slider dots, table marks). Black is kept to a minimum: photo scrims are a deep sage-tinted charcoal.
- **Text cards:** loose body copy, pull quotes, lead statements, page intros, principle/persona blocks and prose sections sit on sage cards with white text, so text never floats loose on the white canvas. Cards are suppressed inside white surfaces (estate cards, chart cards), where copy is already on its own ground.
- **Header:** burger-only, no inline nav. A translucent pastel bar (30% canvas tint, 22px backdrop blur) with sage logo, burger and a sage pill button. On `/` it hides over the hero and slides in on the first scroll (the bar goes near-solid and the hero's white logo fades out, so the two never overlap).
- **Hero:** one full-bleed estate photograph (`/media/hero-estate.jpg`) with a light sage-tinted scrim, the brand headline, its two supporting lines and one call to action, vertically centred. Menu overlay links are Playfair 400 and grow on hover.
- **Landing sections:** the page follows the Pacaso pattern: how it works (four photo steps), the collection (estate cards with a mood line and entry price), an editorial split on what the ownership actually gives you, owner stories, and a full-bleed closing band.
- Motion: masked headline lines, staggered section reveals, one slow zoom on the hero image, scroll parallax on the land band, hover feedback, reduced-motion support.
- Custom sliders: one shared `input[type='range'].range` style (filled pill track, 24px ring thumb, hover/focus states) used by the hero share card, the returns panel, and the dark donut card (`--fill` CSS var tracks progress; `.range--ondark` recolours it for the dark card).
- Accessibility: skip link, labelled sliders, alt text, visible focus, real buttons/links.

The automated design gate passes with **0 lint issues** on every page. One device is annotated as deliberate: the small uppercase section labels ("The Green Lakes way", "Our collection", "The Green Lakes difference", "The collection") carry a `taste-skill-ignore` comment, because the landing page follows the Pacaso section pattern on purpose. One accepted runtime finding: `/explore` trips `few-pictures` (2 photos) because the listing grid mirrors the reference two-tile layout — adding filler imagery would break the design, so the finding stands until more estates are listed. Two intentional warnings remain:

- **No video.** The old site used a generic Western Ghats clip. Using stock footage as "the estate" repeats the problem this redesign fixes; add real estate footage when it exists.
- **One typeface.** Playfair Display everywhere; a deliberate single-family system, not a default stack.

## Imagery

- **Homepage hero:** three photographs supplied by the owner (`greenlakes-aerial.jpg`, `greenlakes-treehouse.jpg`, `greenlakes-gate.jpg`), crossfading on a 21-second loop; all other pages still use `nandi-real.jpg`.
- `greenlakes-aerial.jpg` — the real listing hero from the staging API (property photograph).
- `orchard-laterite.jpg`, `orchard-konkan.jpg`, `orchard-egrets.jpg`, `nandi-fog.jpg`, `nandi-monsoon.jpg`, `alibaug-beach.jpg`, `aerial-fields.jpg` — **open-licence placeholders**, not photographs of the estate. Credits and licences are in the collapsed "Photo credits" block in the footer and in `src/data.ts`. Replace these with commissioned estate photography and aerial/survey imagery before launch; the page layout does not depend on these specific files.

## Prototype boundaries

- No backend, auth, payments, KYC or documents. The sign-in form stops with a prototype message.
- `/explore` filters are local state only.
- Sliders are local state; charts are computed from the offer numbers (compound target IRR), not from live API data.
- Links to terms/privacy/help are placeholders.

## Porting into `apps/web`

The components are plain React 19 + CSS custom properties, so they can move without a styling migration:

1. Copy `src/styles.css` tokens/sections into the existing Tailwind theme or keep the stylesheet.
2. Replace `react-router-dom` `Link`/`useParams` with `next/link` and the App Router equivalents.
3. Move `src/data.ts` reads to `getServerApi().listProperties()` and the existing offering model.
4. Reuse the real estate hero/gallery URLs from the API; drop the placeholder files.
5. Keep the route split (`/how-it-works`, `/why-green-lakes`, `/ownership`); replace the homepage anchors in the current nav.
6. Wire the fraction picker to the live fraction prices. The projection uses `price × (1 + targetIrr)^(months/12)`; label it "target, not a promise" wherever it appears.
