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
- Fonts (layout.tsx): Unbounded (display), Space Grotesk (body), Space Mono (mono) via next/font; referenced as `var(--font-display)` / `--font-body` / `--font-mono`

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
    page.tsx            — Home: composes sections; renders <TravelingCircle/> + <OrbitJourney/> at root
    about/page.tsx      — /about: hero + stats + Team (id="team")
    process/page.tsx    — /process: 5 steps + Standards/SLA (id="standards")
    portfolio/page.tsx  — /portfolio: Websites gallery + AI Voice Agents ("Try it")
    blog/page.tsx       — /blog: post list (from lib/posts.ts)
    blog/[slug]/page.tsx— blog post (generateStaticParams + generateMetadata)
    {privacy,ai-policy,terms}/page.tsx — legal pages (render <LegalContent doc/>)
    > Every non-home route renders <Navigation/> + content + <Footer/> (nav/footer are NOT in layout).
  providers/
    lenis-provider.tsx  — Lenis instance + GSAP ticker bridge; RESETS scroll on route change (usePathname) — see note below
  lib/
    utils.ts            — cn(), degToRad(), polarToCartesian()
    smooth-scroll.ts    — Lenis singleton bridge: setLenis(), scrollToHash(), scrollToTop()
    booking.ts          — CALENDLY_URL + openCalendly() (lazy popup, new-tab fallback)
    posts.ts            — blog content (PostBlock[]) + getPost(); 4 posts
    legal.ts            — PRIVACY / AI_POLICY / TERMS docs (LegalSection[])
    voice-demo.ts       — startVoiceDemo() STUB (wire Vapi/ElevenLabs/Retell here)
  components/
    traveling-circle.tsx— Fixed hero→services circle (HeroCircle), scrollY-driven travel/shrink (z-15). Mobile (`isMobileRef`, <768): docks nowhere (no grid), instead a soft backdrop that sinks/shrinks/fades behind the hero.
    legal-page.tsx      — <LegalContent doc/>: animated legal layout, sticky TOC + reveal sections
    ui/
      concentric-circles.tsx  — Reusable SVG rings with notched segments + tick marks
      reveal.tsx              — <Reveal delay y> scroll-reveal (fade+slide, whileInView once, reduced-motion safe)
      ambient-circle.tsx      — faint slow-rotating ConcentricCircles backdrop for inner-page heroes
      calendly-button.tsx     — primary "Book a call" button for Server Components
      partner-form.tsx        — "Partner with us" modal → Web3Forms email
      voice-agent-card.tsx    — portfolio "Try it" voice demo card (uses voice-demo.ts)
      website-preview.tsx     — LIVE scaled-down <iframe> preview of a deployed site in browser chrome; ResizeObserver computes scale from clientWidth (guards w>0 so hidden/display:none branches don't make height Infinity); gradient `from`/`to` = loading + embed-blocked fallback. Used by /portfolio Websites + showcase website cards.
    sections/
      navigation.tsx    — Sticky nav, scroll-direction hide/show, mobile drawer (z-50)
      hero.tsx          — Scroll-linked circle scale, word-split headline, floating cursors, marquee
      services.tsx      — 2×2 quadrant grid, hover-reveal cards, mouse-driven circle rotation
      case-study.tsx    — Left headline + right testimonial + browser mockup w/ fake dashboard
      showcase.tsx      — GSAP horizontal pin-parallax (desktop, `md:` only); MOBILE = native scroll-snap swipe carousel (no GSAP, no pin → smooth on touch). Section is `md:h-screen` (auto height on mobile); frame/label/backdrop are `hidden md:block`. PROJECTS = all 12 REAL website cards (`type:'website'`, `url` set → renders `<WebsitePreview>` live iframe + "Visit site" link), same set as /portfolio. (Old fictional case-study cards removed; the `MockupScreen`/browser/phone/tablet branches remain as dead fallbacks for non-`website` types.) Root has data-section="showcase". Pin scroll distance + track `x` are FUNCTION-BASED (`scrollDistance()`) with `invalidateOnRefresh` + a post-layout `ScrollTrigger.refresh()` (400ms timeout + `document.fonts.ready`) so the parallax travels the FULL track (reaches the last card) before unpinning — measured travel ≈ trackScrollWidth − innerWidth (~4.5k px at 1440w). NOTE: both desktop track + mobile carousel render each card, so a `type:'website'` preview exists twice in the DOM (one branch is `display:none`; WebsitePreview guards `clientWidth>0`).
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
A single fixed circle (`<OrbitJourney/>`, rendered at page root, `z-[5]`, now `flex` at ALL widths) that
travels across sections, driven by global `scrollY` + measured section offsets. `<Orbit/>` itself is
just a 300vh transparent "stage" (`data-orbit-stage`) that supplies scroll distance + the centered
Why NEXUS moment. The desktop 300vh stage + 200vh CTA stage now render on mobile too (the old stacked-list
fallback was removed) — reusing the proven phase math keeps it robust across sizes.

**Mobile (compact wheel)** — keyed off `m.current.isMobile` (vw<768), measured in `measure()`:
- `dialMt` (the upward push) is responsive: `-(rad + vh*0.13)` on mobile vs `-240` desktop, so the upper
  pills clear off-screen and only the lower arc + 6-o'clock focus pill shows (mirrors desktop framing).
- `titleBlockH` 200 (vs 280) and `ctaRecenter = (titleBlockH+24)/2` are derived together so the circle
  (not the column) still centers in the CTA handoff.
- Pre-travel phases A/B are suppressed (opacity 0); the dial just grows in over "Why NEXUS".
- The centered "Why NEXUS." title is hidden on mobile (it would overlap the rising slide copy).
- Idle `drift` AND per-pill `float` are disabled on mobile → deterministic slide↔pill sync (slide 1 ↔
  first pill) + no per-frame churn when idle. Pills drop `backdrop-blur` on mobile (`md:backdrop-blur-md`).

Current design = **rotary DIAL**: the circle is shifted up (`mt`/`dialMt`, desktop `-240px`) so its bottom arc sits
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

## Multi-Page, Button Wiring & Integrations (added 2026-05-30)

### Routes
Home stays single-scroll. New App Router routes: `/about` (+`#team`), `/process` (+`#standards`),
`/portfolio`, `/blog`, `/blog/[slug]`, `/privacy`, `/ai-policy`, `/terms`. Inner pages are animated
with `<Reveal>` + `<AmbientCircle>` + card hover-lift, matching the home aesthetic.

### Content sources (edit these — NO CMS)
- `lib/posts.ts` — blog posts; add an object = new post (newest first). 4 posts: ROI, voice agents, agents-vs-automation, growth.
- `lib/legal.ts` — PRIVACY / AI_POLICY / TERMS (UK/GDPR templates, NOT legal advice; governing law defaults to England & Wales).

### Button wiring (all CTAs functional)
- Nav `NAV_LINKS` now `{label,target}`: **Work→/portfolio**, Services→#services, About→/about, Blog→/blog.
  Hash targets smooth-scroll when on "/", else `router.push("/#…")`. Logo→scrollToTop (or "/"). "For agencies"→#agencies.
- **"Book a call" / "Start a project" everywhere → `openCalendly()`** (nav desktop+mobile, hero, cta, footer "Useful links", about/blog/process/portfolio buttons via `CalendlyButton`).
- Showcase "View all →" cards (desktop + mobile) → `/portfolio`.
- "Why NEXUS" orbit slides: "Meet the makers"→`/about#team`, "Our process"→`/process`, "Our architecture SLA"→`/process` (was `#standards`; user wanted top-of-page).
- Footer legal links → `/privacy` `/ai-policy` `/terms`. `LinkColumn` accepts an `actions` map (used to route "Book a call"→openCalendly).

### Integrations
- **Calendly** (`lib/booking.ts`): `CALENDLY_URL = https://calendly.com/avishuklacode/new-meeting-1`. `openCalendly()` lazy-loads widget.js/css on first click → popup, falls back to new tab. Calendly auto-emails host on booking = the "notify". `CalendlyButton` for Server Components.
- **Partner form** (`ui/partner-form.tsx`): modal from Agencies "Partner with us" (open-state in agencies.tsx). POSTs to **Web3Forms** (`WEB3FORMS_ACCESS_KEY=5f06f556-b045-4fa4-89aa-824a2e64e3a6`, or `NEXT_PUBLIC_WEB3FORMS_KEY`). Emails the address registered with that key. Honeypot + loading/success/error states.
- **Voice agent demo** (`lib/voice-demo.ts`): WIRED to **ElevenLabs Conversational AI** (`@elevenlabs/client` v1.9.0). `startVoiceDemo(id, handlers)` requests mic → `Conversation.startSession({ agentId, connectionType:'webrtc', ...callbacks })` → returns `{ok, session:{end()}}` (or `{ok:false, reason:'unconfigured'|'mic-denied'|'error'}`). Browser mic call (WebRTC) — **no phone number needed**. Card ids map to **PUBLIC** agent ids via env (`NEXT_PUBLIC_EL_AGENT_RECEPTION`/`_LEAD`/`_SUPPORT` in `.env.local` — empty ⇒ "unconfigured" coming-soon msg). `voice-agent-card.tsx` states: idle→connecting→live (speaking/listening indicator + **End call**) / mic-denied / error. SDK is dynamically imported on click (kept out of SSR bundle). Indian **phone numbers (+91)** for real client lines = separate later step (Exotel/Plivo/Ozonetel or Twilio regulatory bundle), NOT required for the demo.

### Lenis route-change fix (IMPORTANT gotcha)
Lenis owns the scroll position, so Next's automatic scroll-to-top on navigation does NOT apply — you'd
land on the previous page's scroll pixel (i.e. the footer of a short page). `lenis-provider.tsx` now uses
`usePathname()` + a `lenisRef`: on route change it `lenis.scrollTo(0,{immediate:true})`, or if the URL has
a hash, `requestAnimationFrame` → `lenis.scrollTo(el,{offset:-88})`. **In-page anchors must use
`scrollToHash` (smooth-scroll.ts), not raw `<a href="#">`**, for the same reason. Use `scroll-mt-28` on
hash-target sections so the fixed 80px header doesn't cover them.

### Pending content TODOs (placeholders in code)
- About: real team (names/roles/photos) + real stat numbers.
- Process: real steps + SLA numbers (uptime %, delivery days).
- Portfolio: DONE — 12 real websites (Dental/Fitness/Legal) with LIVE scaled-down `<iframe>` previews (`ui/website-preview.tsx`). Voice platform = ElevenLabs (wired); REMAINING: create the 3 public agents in the ElevenLabs dashboard + paste their ids into `.env.local`.
- Legal: confirm legal entity name, contact email, governing law.

## Build Status
All 10 build steps complete. Polish pass done (reduced-motion CSS, TypeScript type fix).
Expanded into a multi-page site (about/process/portfolio/blog/legal) with every CTA wired (2026-05-30). `tsc --noEmit` clean.

## Known Issues / Notes
- `ConcentricCircles` rotation prop accepts `number | MotionValue<number>` — Framer Motion handles both in style objects natively
- GSAP ScrollTrigger horizontal pin-parallax only activates on `min-width: 768px` via matchMedia. Below that, Showcase uses a native scroll-snap swipe carousel instead (intentional — pin+scrub fights touch momentum scroll and is the main mobile jank source). `.no-scrollbar` util in globals.css hides its scrollbar.
- Lenis `raf` receives seconds from GSAP ticker, so it's multiplied by 1000 to convert to ms
- Mobile perf cuts (phones): orbit pills drop `backdrop-blur` (`md:backdrop-blur-md`); dial idle `drift`+`float` disabled; pre-travel phases suppressed. Verify mobile via Playwright at 390×844 (`is_mobile`); note `window.innerHeight` can read a touch higher than CSS `100vh` in emulation — trust the eye over computed scroll offsets.
