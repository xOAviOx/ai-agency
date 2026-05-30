'use client';

import { useRef, useState } from 'react';
import { Mic, Loader2, PhoneCall, PhoneOff } from 'lucide-react';
import { startVoiceDemo, type VoiceSession, type VoiceMode } from '@/lib/voice-demo';

type CardState =
  | 'idle'
  | 'connecting'
  | 'live'
  | 'unconfigured'
  | 'mic-denied'
  | 'error';

export function VoiceAgentCard({
  id,
  name,
  use,
}: {
  id: string;
  name: string;
  use: string;
}) {
  const [state, setState] = useState<CardState>('idle');
  const [mode, setMode] = useState<VoiceMode>('listening');
  const sessionRef = useRef<VoiceSession | null>(null);

  async function handleTry() {
    if (state === 'connecting' || state === 'live') return;
    setState('connecting');
    const result = await startVoiceDemo(id, {
      onConnect: () => setState('live'),
      onDisconnect: () => {
        sessionRef.current = null;
        setState('idle');
      },
      onMode: (m) => setMode(m),
      onError: () => setState('error'),
    });

    if (result.ok) {
      sessionRef.current = result.session;
      // onConnect flips state to 'live'; stay on 'connecting' until then.
    } else {
      setState(result.reason);
    }
  }

  async function handleEnd() {
    await sessionRef.current?.end();
    sessionRef.current = null;
    setState('idle');
  }

  const isLive = state === 'live';

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">
      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border text-violet-300 transition-colors ${
          isLive
            ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
            : 'border-violet-500/25 bg-violet-500/5'
        }`}
      >
        <Mic className={`h-5 w-5 ${isLive ? 'animate-pulse' : ''}`} />
      </div>

      <h3 className="text-white text-lg font-medium mb-2 font-display">{name}</h3>
      <p className="text-sm text-white/55 leading-relaxed mb-6">{use}</p>

      <div className="mt-auto">
        {isLive ? (
          <button
            type="button"
            onClick={handleEnd}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-red-200 transition-colors hover:bg-red-500/20 cursor-pointer"
          >
            <PhoneOff className="h-3.5 w-3.5" />
            End call
          </button>
        ) : (
          <button
            type="button"
            onClick={handleTry}
            disabled={state === 'connecting'}
            className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-violet-200 transition-colors hover:bg-violet-500/20 disabled:opacity-60 cursor-pointer"
          >
            {state === 'connecting' ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Connecting…
              </>
            ) : (
              <>
                <PhoneCall className="h-3.5 w-3.5" />
                Try it
              </>
            )}
          </button>
        )}

        {isLive && (
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-emerald-300/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {mode === 'speaking' ? 'Agent speaking…' : 'Listening — start talking'}
          </p>
        )}
        {state === 'unconfigured' && (
          <p className="mt-3 text-xs leading-relaxed text-white/40">
            🔊 Live demo activates once this agent is connected in ElevenLabs
            (paste its agent id in .env.local).
          </p>
        )}
        {state === 'mic-denied' && (
          <p className="mt-3 text-xs leading-relaxed text-amber-300/80">
            Microphone access is needed — allow it in your browser, then tap Try it
            again.
          </p>
        )}
        {state === 'error' && (
          <p className="mt-3 text-xs leading-relaxed text-red-300/80">
            Couldn&apos;t connect to the agent. Please try again in a moment.
          </p>
        )}
      </div>
    </div>
  );
}
