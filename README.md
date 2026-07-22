# Demergers: The Value Unlock

A premium, dark, cinematic scrollytelling site about **corporate demergers** for
**First Principles Research**, built so every chapter doubles as a live
**presentation deck**. Same content, two rendering modes, zero duplicated copy.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first `@theme` in `globals.css`)
- `motion` (motion/react), `gsap` + `@gsap/react`, `lenis`, `lucide-react`
- `clsx` + `tailwind-merge`

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## The dual-mode mechanic

Every chapter is one tall scroll runway that renders the same scenes two ways:

- **Scroll mode (default):** a sticky pinned viewport cross-fades scenes as the
  runway scrolls, with a right-side progress-dot rail.
- **Presentation mode:** press **P** (or the ON toggle, or `?presentation=true`)
  to lock scroll and render the identical scenes as discrete full-screen frames.

Controls while presenting:

- Forward: `ArrowRight`, `ArrowDown`, `Space`, `Enter`, left-click
- Back: `ArrowLeft`, `ArrowUp`, `Backspace`, right-click, `Shift`+click
- `Esc` exits, `P` toggles. A 500 ms lock prevents skipping frames.
- Interactive controls (buttons, links, accordions) stay clickable inside a frame.

Both modes are powered by the shared hook and chrome so every chapter behaves
identically:

- `src/components/presentation/use-presentation.ts` - the controller
- `src/components/presentation/presentation-chrome.tsx` - on-screen furniture
- `src/components/presentation/deck.tsx` - the dual-mode render split

The **home page** (`src/app/page.tsx`) is a scrollytelling narrative with its own
`PresenterMode` speaker console (`src/components/presenter-mode.tsx`): press **P**
for chapter quick-jump, speaker notes, a timer, and decorative live metrics.

## Structure

```
src/app/
  layout.tsx                  Lenis + BackgroundEngine + Navbar shell
  globals.css                 @theme design tokens + utilities
  page.tsx                    Home narrative + PresenterMode
  case-studies/page.tsx       Overview grid
  chapters/<slug>/page.tsx    Ten dual-mode chapter decks
  chapters/[slug]/page.tsx    Fallback for unknown slugs
src/components/
  navbar, brand-mark, lenis-provider, background-engine, presenter-mode
  presentation/               use-presentation, presentation-chrome, deck
  scene/                      kit (primitives), archetypes (interactive), chapter-nav
src/lib/
  site.ts                     Chapter registry (single source of truth)
  case-studies.ts             Case-study data
  speaker-notes.ts            Presenter console notes
  lenis-ref.ts, utils.ts
```

## Editing content

- **Chapters:** edit the registry in `src/lib/site.ts`, then the matching page
  under `src/app/chapters/<slug>/`. Each page defines a `scenes` array whose
  `render(active)` functions draw in both modes.
- **Case studies:** `src/lib/case-studies.ts` feeds both the chapter deck and the
  `/case-studies` overview.
- **Speaker notes:** `src/lib/speaker-notes.ts`. Prefix a line with `HOOK:`,
  `METRIC:`, or `TRANSITION:` to auto-style it.

## Imagery

Ambiance is rendered with canvas particles, orbital rings, and CSS gradients, so
the site ships with no raster dependencies. To add cinematic art, drop images
into per-chapter folders under `public/` and render them with `next/image`
(`fill` + `object-cover`) behind a dark gradient overlay.

## Style rules enforced

- No em-dashes anywhere in user-facing copy.
- Three font families max (a sans and a mono; system stack).
- All animation respects `prefers-reduced-motion`.
- Figures throughout are illustrative and directional. This is not investment
  advice.
