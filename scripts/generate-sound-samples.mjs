/**
 * Generates short mono WAV samples for public/sounds/ (spec FR-001, FR-002).
 * Run: node scripts/generate-sound-samples.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/sounds");

const SAMPLE_RATE = 22050;

function writeWav(filePath, frequency, durationSec, type = "tone") {
  const numSamples = Math.floor(SAMPLE_RATE * durationSec);
  const data = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-4 * t / durationSec);
    if (type === "noise") {
      data[i] = (Math.random() * 2 - 1) * env * 0.6;
    } else if (type === "kalimba") {
      data[i] = Math.sin(2 * Math.PI * frequency * t) * env * 0.5;
      data[i] += Math.sin(2 * Math.PI * frequency * 2.7 * t) * env * 0.2;
    } else if (type === "harmonica") {
      data[i] =
        (Math.sin(2 * Math.PI * frequency * t) * 0.6 +
          Math.sin(2 * Math.PI * frequency * 2 * t) * 0.25) *
        env;
    } else {
      data[i] = Math.sin(2 * Math.PI * frequency * t) * env * 0.45;
    }
  }

  const pcm = Buffer.alloc(numSamples * 2);
  for (let i = 0; i < numSamples; i++) {
    const s = Math.max(-1, Math.min(1, data[i]));
    pcm.writeInt16LE(Math.round(s * 32767), i * 2);
  }

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(SAMPLE_RATE, 24);
  header.writeUInt32LE(SAMPLE_RATE * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);

  writeFileSync(filePath, Buffer.concat([header, pcm]));
}

mkdirSync(outDir, { recursive: true });

writeWav(join(outDir, "guitar.wav"), 164.81, 0.35, "noise");
writeWav(join(outDir, "piano.wav"), 261.63, 0.45, "tone");
writeWav(join(outDir, "kalimba.wav"), 261.63, 0.35, "kalimba");
writeWav(join(outDir, "harmonica.wav"), 261.63, 0.4, "harmonica");

console.log("Wrote samples to", outDir);
