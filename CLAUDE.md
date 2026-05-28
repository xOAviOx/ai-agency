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
    traveling-circle.tsx— Fixed hero→services circle (HeroCircle), scrollY-driven travel/shrink (z-15)
    ui/
      concentric-circles.tsx  — Reusable SVG rings with notched segments + tick marks
    sections/
      navigation.tsx    — Sticky nav, scroll-direction hide/show, mobile drawer (z-50)
      hero.tsx          — Scroll-linked circle scale, word-split headline, floating cursors, marquee
      services.tsx      — 2×2 quadrant grid, hover-reveal cards, mouse-driven circle rotation
      case-study.tsx    — Left headline + right testimonial + browser mockup w/ fake dashboard
      showcase.tsx      — GSAP horizontal parallax (desktop), vertical stack (mobile); 8 PROJECTS; root has data-section="showcase"
      agencies.tsx      — Image/copy split, blueprint border frame, circle behind copy; root has data-section="agencies"
      orbit.tsx         — "Why NEXUS" traveling circle. Exports <OrbitJourney/> (fixed circle) + <Orbit/> (300vh stage)
      cta.tsx           — Final CTA with giant circle + trust marquee
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

## Build Status
All 10 build steps complete. Polish pass done (reduced-motion CSS, TypeScript type fix).

## Known Issues / Notes
- `ConcentricCircles` rotation prop accepts `number | MotionValue<number>` — Framer Motion handles both in style objects natively
- GSAP ScrollTrigger horizontal parallax only activates on `min-width: 768px` via matchMedia
- Lenis `raf` receives seconds from GSAP ticker, so it's multiplied by 1000 to convert to ms
