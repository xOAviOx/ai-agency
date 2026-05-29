import os
from playwright.sync_api import sync_playwright

OUT = os.path.join(os.path.dirname(__file__), ".mobile-shots")
os.makedirs(OUT, exist_ok=True)

def shot(page, name):
    page.screenshot(path=os.path.join(OUT, name + ".png"))
    print("saved", name)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(
        viewport={"width": 390, "height": 844},
        device_scale_factor=2,
        is_mobile=True,
        has_touch=True,
    )
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append("console:" + m.type + ":" + m.text) if m.type == "error" else None)

    page.goto("http://localhost:3000", wait_until="networkidle")
    page.wait_for_timeout(1500)

    off = page.evaluate(
        """() => {
            const q = s => document.querySelector(s);
            const docY = el => el ? el.getBoundingClientRect().top + window.scrollY : null;
            const stage = q('[data-orbit-stage]');
            const cta = q('[data-cta-stage]');
            return {
              vh: window.innerHeight,
              heroH: (q('[data-section=\\"hero\\"]')||{}).offsetHeight,
              showcaseTop: docY(q('[data-section=\\"showcase\\"]')),
              orbitTop: docY(stage),
              orbitH: stage ? stage.offsetHeight : null,
              ctaTop: docY(cta),
              docH: document.documentElement.scrollHeight,
            };
        }"""
    )
    print("offsets", off)

    vh = off["vh"]
    orbitTop = off["orbitTop"]
    ctaTop = off["ctaTop"]

    def scroll_to(y):
        page.evaluate("(y) => window.scrollTo(0, y)", y)
        page.wait_for_timeout(1300)

    # Showcase carousel (header in view)
    scroll_to(int(off["showcaseTop"] - 30)); shot(page, "03_showcase")
    # Orbit dial: grown "Why NEXUS" moment
    scroll_to(int(orbitTop + vh * 0.10)); shot(page, "04_dial_why")
    # active slide 1
    scroll_to(int(orbitTop + vh * 0.55)); shot(page, "05_dial_s1")
    # stepping slide 2
    scroll_to(int(orbitTop + vh * 1.05)); shot(page, "06_dial_s2")
    # slide 3
    scroll_to(int(orbitTop + vh * 1.65)); shot(page, "07_dial_s3")
    # handoff
    scroll_to(int(orbitTop + vh * 2.45)); shot(page, "08_handoff")
    # CTA hold
    scroll_to(int(ctaTop + vh * 0.4)); shot(page, "09_cta")

    print("ERRORS:", errors[:20] if errors else "none")
    browser.close()
