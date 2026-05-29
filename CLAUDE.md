# NEXUS AI Agency Website — Project Memory

## Project
High-end dark-themed marketing website for an AI automation agency.

## Location
`C:\Users\avish\OneDrive\Desktop\Ai-agency\nexus-ai`

## Tech Stack
- Next.js 16 (App Router) + TypeScript strict
- Tailwind CSS v4 (no config file — uses `@theme inline` in globals.css)
- Framer Motion (scroll animations, stagger, hover)
- GSAP + ScrollTrigger (horizontal parallax in Showcase)
- Lenis smooth scroll (bridged to GSAP ticker in lenis-provider.tsx)
- lucide-react icons
- Fonts: Geist Sans (display), Inter (body), Geist Mono (mono) via next/font

## Dev Command
```
node --max-old-space-size=4096 node_modules/next/dist/bin/next dev
```
> `pnpm dev` fails on Windows because Next.js installs a bash shebang script. Use node directly.

## File Map
```
src/
  app/
    layout.tsx          — Root layout: Lenis provider, font vars, metadata
    globals.css         — CSS tokens, Tailwind v4 @theme, typography utils, marquee animation
    page.tsx            — Composes sections; renders <TravelingCircle/> + <OrbitJourney/> at root (fixed, above sections)
  providers/
    lenis-provider.tsx  — Lenis instance + GSAP ticker bridge
  lib/
    utils.ts            — cn(), degToRad(), polarToCartesian()
  components/
    traveling-circle.tsx— Fixed hero→services circle (HeroCircle), scrollY-driven travel/shrink (z-15). Mobile (`isMobileRef`, <768): docks nowhere (no grid), instead a soft backdrop that sinks/shrinks/fades behind the hero.
    ui/
      concentric-circles.tsx  — Reusable SVG rings with notched segments + tick marks
    sections/
      navigation.tsx    — Sticky nav, scroll-direction hide/show, mobile drawer (z-50)
      hero.tsx          — Scroll-linked circle scale, word-split headline, floating cursors, marquee
      services.tsx      — 2×2 quadrant grid, hover-reveal cards, mouse-driven circle rotation
      case-study.tsx    — Left headline + right testimonial + browser mockup w/ fake dashboard
      showcase.tsx      — GSAP horizontal pin-parallax (desktop, `md:` only); MOBILE = native scroll-snap swipe carousel (no GSAP, no pin → smooth on touch). Section is `md:h-screen` (auto height on mobile); frame/label/backdrop are `hidden md:block`. 8 PROJECTS; root has data-section="showcase"
      agencies.tsx      — Image/copy split, blueprint border frame, circle behind copy; root has data-section="agencies"
      orbit.tsx         — "Why NEXUS" traveling circle. Exports <OrbitJourney/> (fixed circle) + <Orbit/> (300vh stage). Circle HANDS OFF into the CTA. Now runs on MOBILE too (compact wheel — see below).
      cta.tsx           — CTA stage: 200vh w/ sticky-centered copy that fades in INSIDE the travelling circle (no own circle anymore); data-section="cta" + data-cta-stage. Now active on mobile too (no separate static fallback) + trust marquee
      footer.tsx        — Giant wordmark with hover letter-spacing/color animation
```

## Design Tokens
```css
--bg: #0A0A0B
--bg-elevated: #111113
--border: rgba(255,255,255,0.08)
--text-primary: #FFFFFF
--text-secondary: rgba(255,255,255,0.6)
--text-muted: rgba(255,255,255,0.4)
--accent: #7C3AED
--accent-glow: #A855F7
```

## Typography Classes (defined in globals.css)
- `.display-xl` — clamp(3rem, 6vw, 5.5rem), weight 500, tracking -0.02em
- `.display-l` — clamp(2.25rem, 4vw, 3.75rem), weight 500
- `.body-l` — 1.125rem, weight 400, line-height 1.6
- `.mono-caption` — 0.75rem, uppercase, tracking 0.15em, Geist Mono

## "Why NEXUS" Traveling Orbit Circle (orbit.tsx)
A single fixed circle (`<OrbitJourney/>`, rendered at page root, `z-[5]`, `hidden md:flex`) that
travels across sections, driven by global `scrollY` + measured section offsets. `<Orbit/>` itself is
just a 300vh transparent "stage" (`data-orbit-stage`) that supplies scroll distance + the centered
Why NEXUS moment; on mobile the travel scene is skipped for a stacked list.

Current design = **rotary DIAL**: the circle is shifted up (`mt`, default `-240px`) so its bottom arc sits
in the viewport; pill nodes (`OrbitItem`) orbit and the one nearest 6 o'clock (180°) zooms/glows
(`isActive`, chosen by the `spin` solver). `sweep` steps through nodes via `snapValue` (stepped smoothstep).
Center title "Why NEXUS." sits in a block BELOW the dial, shown only when `!showDetail`.

Scroll journey (phases in `updateScroll(sv)`, called from the `scrollY` handler + on measure):
- **A** small travel (Case Study, before parallax): `SMALL_SCALE=0.14`, fades in/out, drifts. `mt=-240`.
- **HIDDEN over Showcase parallax** — opacity forced 0 across `preHide → reappear`.
- **B** small travel through For Agencies. `mt=-240`.
- **C** grow small→full past For Agencies (smoothstep); "Why NEXUS." fades in. `mt=-240`.
- **D — active dial**: stepped `sweep = 180 - snappedIndex*60` brings nodes to 6 o'clock one by one.
- **E — handoff**: pills **slide off to the RIGHT + fade** (`nodeExitX = useTransform(orbitPhase,[0.82,1],[0,900])`),
  the SAME circle **recenters** (`mt -240→0`) and eases to backdrop (`scale 1→0.92`, `opacity .95→.6`),
  and drops by `CTA_RECENTER=152px` (`driftY`) so the CIRCLE—not the flex column—centers.
- **F — CTA hold**: centered dimmed circle (`scale .92`, `opacity .6`, `driftY 152`) behind the CTA copy.
- **G — final exit**: shrink + fade out into the trust marquee.

Handoff requires `data-cta-stage` on the CTA's 200vh stage (measured `ctaTop`/`ctaBottom`). cta.tsx copy
fades in via its OWN `scrollYProgress` and stays interactive (OrbitJourney overlay is `pointer-events-none`).

Implementation notes / gotchas:
- Markers: needs `data-section="showcase"`, `data-section="agencies"`, `data-orbit-stage`, `data-cta-stage`. Re-measures on resize, a 500ms timeout, `document.fonts.ready`, and GSAP `ScrollTrigger` `refresh`.
- `mt`/`mtS` (margin-top spring) recenters the dial; `nodeExitX` drives the pill slide-off (off `orbitPhase`).
- `vectorEffect="non-scaling-stroke"` on all rings → thin strokes stay crisp at 0.14 scale.
- Scroll values are spring-smoothed; continuous "alive" drift via `useTime` (rAF), independent of scroll.
- TUNABLES for the handoff feel: phase boundaries `activeEnd/handoffEnd` (×vh of `orbitTop`), `CTA_RECENTER` (152), backdrop `scale 0.92`/`opacity 0.6`, `nodeExitX` distance (900), spring stiffness on `mtS`. Top-of-file: `DRIFT_REV_MS`, `SMALL_SCALE`.
- Reusable parts: `RingSystem`, `Ring`, `OrbitItem`.

## Build Status
All 10 build steps complete. Polish pass done (reduced-motion CSS, TypeScript type fix).

## Known Issues / Notes
- `ConcentricCircles` rotation prop accepts `number | MotionValue<number>` — Framer Motion handles both in style objects natively
- GSAP ScrollTrigger horizontal parallax only activates on `min-width: 768px` via matchMedia
- Lenis `raf` receives seconds from GSAP ticker, so it's multiplied by 1000 to convert to ms
