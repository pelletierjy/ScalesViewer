import { applyGainEnvelope } from "./samplePlayer";

/**
 * Karplus-Strong plucked string: noise burst filtered through a delay loop.
 */
export function playPluckSynth(
  ctx: AudioContext,
  frequency: number,
  duration: number
): void {
  const sampleRate = ctx.sampleRate;
  const periodSamples = Math.max(2, Math.round(sampleRate / frequency));
  const totalSamples = Math.min(
    Math.ceil(sampleRate * duration),
    periodSamples * 32
  );

  const buffer = ctx.createBuffer(1, totalSamples, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < periodSamples; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const damping = 0.996;
  for (let i = periodSamples; i < totalSamples; i++) {
    const a = data[i - periodSamples];
    const b = data[i - periodSamples + 1] ?? a;
    data[i] = damping * 0.5 * (a + b);
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gainNode = ctx.createGain();
  applyGainEnvelope(ctx, gainNode, duration, 0.35);

  source.connect(gainNode);
  gainNode.connect(ctx.destination);

  source.start();
  source.stop(ctx.currentTime + duration);

  source.onended = () => {
    source.disconnect();
    gainNode.disconnect();
  };
}
