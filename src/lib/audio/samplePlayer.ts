import { Instrument } from "@/lib/utils/instrument";
import { INSTRUMENT_SAMPLES } from "./instrumentSampleConfig";

const sampleCache = new Map<Instrument, AudioBuffer>();
const loadingPromises = new Map<Instrument, Promise<AudioBuffer | null>>();

export function applyGainEnvelope(
  ctx: AudioContext,
  gainNode: GainNode,
  duration: number,
  peakGain = 0.3
): void {
  const now = ctx.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(peakGain, now + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
}

export async function loadInstrumentSample(
  ctx: AudioContext,
  instrument: Instrument
): Promise<AudioBuffer | null> {
  const cached = sampleCache.get(instrument);
  if (cached) return cached;

  const inFlight = loadingPromises.get(instrument);
  if (inFlight) return inFlight;

  const promise = (async () => {
    try {
      const { url } = INSTRUMENT_SAMPLES[instrument];
      const response = await fetch(url);
      if (!response.ok) {
        console.warn(`Failed to fetch sample for ${instrument}: ${response.status}`);
        return null;
      }
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      sampleCache.set(instrument, audioBuffer);
      return audioBuffer;
    } catch (error) {
      console.warn(`Failed to load sample for ${instrument}:`, error);
      return null;
    } finally {
      loadingPromises.delete(instrument);
    }
  })();

  loadingPromises.set(instrument, promise);
  return promise;
}

export function playSample(
  ctx: AudioContext,
  buffer: AudioBuffer,
  targetHz: number,
  rootHz: number,
  duration: number
): void {
  const playbackRate = targetHz / rootHz;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = playbackRate;

  const gainNode = ctx.createGain();
  applyGainEnvelope(ctx, gainNode, duration);

  source.connect(gainNode);
  gainNode.connect(ctx.destination);

  const playDuration = Math.min(duration, buffer.duration / playbackRate);
  source.start();
  source.stop(ctx.currentTime + playDuration);

  source.onended = () => {
    source.disconnect();
    gainNode.disconnect();
  };
}

export function clearSampleCache(): void {
  sampleCache.clear();
  loadingPromises.clear();
}
