import os
from playwright.sync_api import sync_playwright
OUT = os.path.join(os.path.dirname(__file__), ".mobile-shots")
with sync_playwright() as p:
    b = p.chromium.launch(headless=True)
    pg = b.new_context(viewport={"width":1440,"height":900}).new_page()
    errs=[]
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto("http://localhost:3000", wait_until="networkidle"); pg.wait_for_timeout(1500)
    off = pg.evaluate("""()=>{const q=s=>document.querySelector(s);const d=el=>el?el.getBoundingClientRect().top+window.scrollY:null;return{orbitTop:d(q('[data-orbit-stage]')),showcaseTop:d(q('[data-section=\\"showcase\\"]')),vh:window.innerHeight}}""")
    vh=off["vh"]
    def s(y,n):
        pg.evaluate("(y)=>window.scrollTo(0,y)",y); pg.wait_for_timeout(1300)
        pg.screenshot(path=os.path.join(OUT,n+".png")); print("saved",n)
    s(int(off["showcaseTop"]+vh*0.6),"D1_showcase")
    s(int(off["orbitTop"]+vh*1.0),"D2_dial")
    print("ERRORS:", errs[:10] if errs else "none")
    b.close()
