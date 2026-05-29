/* Placeholder for the live voice-agent demo. Wire your platform here once
   chosen — e.g. Vapi (@vapi-ai/web), ElevenLabs Conversational AI, or Retell.

   Return true once a real call/session actually starts, false if not yet
   configured (the UI shows a "coming soon" note in that case). */
export async function startVoiceDemo(agentId: string): Promise<boolean> {
  // TODO: replace with your provider's web SDK call, e.g.
  //   const vapi = new Vapi(PUBLIC_KEY); vapi.start(agentId); return true;
  void agentId;
  return false;
}
