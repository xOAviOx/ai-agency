'use client';

import { useState } from 'react';
import { Mic, Loader2, PhoneCall } from 'lucide-react';
import { startVoiceDemo } from '@/lib/voice-demo';

type CardState = 'idle' | 'connecting' | 'live' | 'unconfigured';

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

  async function handleTry() {
    setState('connecting');
    const started = await startVoiceDemo(id);
    setState(started ? 'live' : 'unconfigured');
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/5 text-violet-300">
        <Mic className="h-5 w-5" />
      </div>

      <h3 className="text-white text-lg font-medium mb-2 font-display">{name}</h3>
      <p className="text-sm text-white/55 leading-relaxed mb-6">{use}</p>

      <div className="mt-auto">
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

        {state === 'unconfigured' && (
          <p className="mt-3 text-xs leading-relaxed text-white/40">
            🔊 Live demo connects here once your voice platform (Vapi / ElevenLabs /
            Retell) is added.
          </p>
        )}
        {state === 'live' && (
          <p className="mt-3 text-xs leading-relaxed text-emerald-300/80">
            You&apos;re connected — start talking.
          </p>
        )}
      </div>
    </div>
  );
}
