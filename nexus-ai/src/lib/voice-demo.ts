/* ElevenLabs Conversational AI — live in-browser voice demo.

   Each portfolio voice-agent card maps to a PUBLIC ElevenLabs agent id. Public
   agents need no backend and no secret key in the browser — connecting with the
   agent id is enough. Create the agents in the ElevenLabs dashboard, set their
   language to Hindi / English, mark them PUBLIC, then paste the ids into
   .env.local (see .env.local.example). No code change needed to swap agents.

   The call is a browser mic session (WebRTC) — no phone number required.
   Returns a session handle so the UI can end the call. */

export type VoiceMode = 'speaking' | 'listening';

export type VoiceSession = { end: () => Promise<void> };

export type StartResult =
  | { ok: true; session: VoiceSession }
  | { ok: false; reason: 'unconfigured' | 'mic-denied' | 'error'; message?: string };

export type VoiceHandlers = {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMode?: (mode: VoiceMode) => void;
  onError?: (message: string) => void;
};

/* Card id (portfolio VOICE_AGENTS) → public ElevenLabs agent id.
   Read from env so agents can be swapped without touching code. */
const AGENT_IDS: Record<string, string | undefined> = {
  reception: process.env.NEXT_PUBLIC_EL_AGENT_RECEPTION,
  'lead-qualifier': process.env.NEXT_PUBLIC_EL_AGENT_LEAD,
  'support-line': process.env.NEXT_PUBLIC_EL_AGENT_SUPPORT,
};

export async function startVoiceDemo(
  agentKey: string,
  handlers: VoiceHandlers = {},
): Promise<StartResult> {
  const agentId = AGENT_IDS[agentKey];
  if (!agentId) return { ok: false, reason: 'unconfigured' };

  // Request the mic up front so we can surface a clear "allow mic" message.
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch {
    return { ok: false, reason: 'mic-denied' };
  }

  try {
    const { Conversation } = await import('@elevenlabs/client');

    let errored = false;
    let removeRejectionGuard: (() => void) | undefined;

    const conversation = await Conversation.startSession({
      agentId,
      connectionType: 'webrtc',
      onConnect: () => handlers.onConnect?.(),
      onDisconnect: () => {
        removeRejectionGuard?.();
        // If we already reported an agent failure, don't override the error
        // state by resetting the card back to idle.
        if (!errored) handlers.onDisconnect?.();
      },
      onError: (message) => handlers.onError?.(message),
      onModeChange: ({ mode }) => handlers.onMode?.(mode),
    });

    /* The ElevenLabs SDK (v1.9.0) throws when the server emits a malformed
       "error" event — it reads `event.error_event.error_type`, which is
       undefined when an agent fails server-side ("the AI agent appears to be
       having technical issues"). That surfaces as an unhandled rejection and,
       in dev, a full-screen error overlay. Catch that one specific case so a
       broken/misconfigured agent degrades to a clean error state instead. */
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e?.reason;
      const msg =
        reason instanceof Error ? reason.message : String(reason ?? '');
      if (msg.includes('error_type')) {
        e.preventDefault();
        errored = true;
        removeRejectionGuard?.();
        handlers.onError?.('The agent is temporarily unavailable.');
        void conversation.endSession().catch(() => {});
      }
    };
    window.addEventListener('unhandledrejection', onRejection);
    removeRejectionGuard = () =>
      window.removeEventListener('unhandledrejection', onRejection);

    return {
      ok: true,
      session: {
        end: async () => {
          removeRejectionGuard?.();
          await conversation.endSession();
        },
      },
    };
  } catch (e) {
    return {
      ok: false,
      reason: 'error',
      message: e instanceof Error ? e.message : String(e),
    };
  }
}
