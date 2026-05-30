'use client';

import { useEffect, useRef, useState } from 'react';

/* Live, scaled-down preview of a deployed site rendered inside the card's
   "screenshot" area. We render the real site in an iframe at a fixed desktop
   width (VIRTUAL_WIDTH) and scale it down to the card width so the whole
   desktop layout is visible — like a thumbnail. pointer-events are disabled so
   it reads as an image; the parent card handles the click-through.

   A gradient placeholder shows while the frame loads (and stays as a graceful
   fallback if a host refuses to be embedded). */

const VIRTUAL_WIDTH = 1280; // desktop viewport width we scale down from
const PREVIEW_HEIGHT = 200; // visible preview height in px

export function WebsitePreview({
  url,
  from,
  to,
  title,
}: {
  url: string;
  from: string;
  to: string;
  title: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [loaded, setLoaded] = useState(false);
  const isLive = url.startsWith('http');

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / VIRTUAL_WIDTH);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl border-b border-white/[0.08]">
      {/* fake browser chrome */}
      <div className="flex items-center gap-1.5 bg-white/[0.05] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        {isLive && (
          <span className="ml-2 truncate font-mono text-[10px] text-white/30">
            {url.replace(/^https?:\/\//, '')}
          </span>
        )}
      </div>

      {/* preview area */}
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={{ height: PREVIEW_HEIGHT }}
      >
        {/* gradient placeholder / fallback (also shown while the frame loads) */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: `linear-gradient(135deg, ${from}, ${to})`,
            opacity: loaded ? 0 : 0.55,
          }}
        />

        {isLive && (
          <iframe
            src={url}
            title={`${title} preview`}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin"
            onLoad={() => setLoaded(true)}
            className="origin-top-left border-0 transition-opacity duration-700"
            style={{
              width: VIRTUAL_WIDTH,
              height: PREVIEW_HEIGHT / scale,
              transform: `scale(${scale})`,
              pointerEvents: 'none',
              opacity: loaded ? 1 : 0,
            }}
          />
        )}
      </div>
    </div>
  );
}
